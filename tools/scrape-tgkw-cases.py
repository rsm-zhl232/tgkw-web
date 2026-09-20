#!/usr/bin/env python3
"""
Scrapes project cases from the live tgkw.com case library and lands them in
this site: real project facts into tools/tgkw-cases.json, real photos into
assets/img/projects/.

    python3 tools/scrape-tgkw-cases.py              # catalogue only, no downloads
    python3 tools/scrape-tgkw-cases.py --images     # + download photos for PROJECTS below
    python3 tools/scrape-tgkw-cases.py --images --only tencent-hq,zte-supercampus
    python3 tools/scrape-tgkw-cases.py --snippet    # print a data.js-ready block

Source of truth for the site is still assets/js/data.js — this script never
writes it. It downloads images and prints/records content for you to paste,
so your own wording is never overwritten.

FILE NAMING — every photo is <project-id>-NN.jpg, where <project-id> is the
`id` field in data.js. To swap a photo, just drop your own file over the top
of it with the same name; nothing else needs to change.

Stdlib only, no dependencies.
"""

import argparse
import json
import os
import re
import ssl
import subprocess
import sys
import time
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, "assets", "img", "projects")
JSON_OUT = os.path.join(ROOT, "tools", "tgkw-cases.json")

BASE = "https://www.tgkw.com/project/cases/"
INDEX = BASE + "index.html"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " \
     "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"

# The CDN resizes and re-encodes on the fly, so we pull web-ready JPEGs
# instead of the 1-2 MB source PNGs. Raise w_ / q_ if you want more detail.
IMG_TRANSFORM = "?x-image-process=image/resize,w_1400/format,jpg/quality,q_80"

MAX_IMAGES = 6          # photos kept per project
DELAY = 0.4             # seconds between requests — be polite to the server

# ---------------------------------------------------------------------------
# Which project in assets/js/data.js maps to which case on tgkw.com.
# Add a line here, run with --images, and the photos land named after the id.
# Run without arguments to print the full list of available slugs.
# ---------------------------------------------------------------------------
PROJECTS = {
    "tencent-hq":         "tengxun",
    "zte-supercampus":    "zxtx",
    "poly-grand-theatre": "djy",
    "dongguan-museum":    "museum",
    "puh3-medical-centre": "bjthreeyy",
    "maoming-olympic":    "maoming_olympic_sports_center",
    "heytea-spaces":      "liketea",
    "yum-china":          "kfc",
    "changsha-nuoya-hotel": "scny",
}


def get(url, binary=False):
    """Fetch a URL, verifying TLS.

    Falls back to curl when Python's CA bundle rejects the chain — on machines
    behind a TLS-inspecting proxy (or with a stale certifi) urllib fails while
    curl succeeds, because curl trusts the system keychain. Verification stays
    on in both paths.
    """
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            raw = r.read()
    except urllib.error.URLError as e:
        if not isinstance(getattr(e, "reason", None), ssl.SSLCertVerificationError):
            raise
        out = subprocess.run(
            ["curl", "-sSL", "-m", "40", "-A", UA, url],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if out.returncode != 0:
            raise urllib.error.URLError(
                f"curl fallback failed: {out.stderr.decode('utf-8', 'replace').strip()}")
        raw = out.stdout
    return raw if binary else raw.decode("utf-8", "replace")


def clean(s):
    """Text without markup, nbsp, or the zero-width junk pasted into the CMS.

    Several case pages carry U+200C inside the field labels ("项目地址\u200c"),
    which silently breaks dictionary lookups if it is left in.
    """
    s = re.sub(r"<[^>]+>", "", s)
    s = s.replace("\xa0", " ").replace("&nbsp;", " ")
    s = re.sub(r"[\u200b-\u200f\u2028\u2029\ufeff]", "", s)
    return re.sub(r"\s+", " ", s).strip()


def catalogue():
    """Every case on tgkw.com as {slug, name, category}.

    The nav nests real projects inside <ul class="m-summary-list indent">;
    the category heading above them links to its first child, so a slug can
    appear twice. The nested anchor is the one that carries the project name.
    """
    html = get(INDEX)
    out, seen = [], set()
    for block in re.findall(
            r'<a[^>]*href="([^"]*?)list\.html"[^>]*>([^<]*)</a>'
            r'<ul class="m-summary-list indent">(.*?)</ul>', html, re.S):
        category = clean(block[1])
        for href, name in re.findall(
                r'<a[^>]*href="([^"]*?)list\.html"[^>]*>([^<]*)</a>', block[2]):
            slug = href.replace("\\", "/").strip("/")
            if slug and slug not in seen:
                seen.add(slug)
                out.append({"slug": slug, "name": clean(name), "category": category})
    return out


def scrape(slug):
    """Facts + photo URLs for one case page."""
    html = get(f"{BASE}{slug}/list.html")
    body = re.search(r'id="markdown-body"[^>]*>(.*?)</div>', html, re.S)
    body = body.group(1) if body else html

    name = re.search(r"<h1>.*?</a>(.*?)</h1>", body, re.S)
    # the <h3> repeats the text in its id attribute, so anchor on the tag close
    use = re.search(r">\s*业态类型\s*--\s*([^<]+)</h3>", body)

    fields = {}
    for label, value in re.findall(r"<p>([^<]{2,12})\s*<strong>(.*?)</strong>", body, re.S):
        fields[clean(label)] = clean(value)

    images = []
    for src in re.findall(r'<img[^>]+src="([^"]+)"', body):
        if src.startswith("http") and src not in images:
            images.append(src)

    return {
        "slug": slug,
        "name": clean(name.group(1)) if name else fields.get("项目名称", slug),
        "use_type": clean(use.group(1)) if use else "",
        "address": fields.get("项目地址", ""),
        "floor_area": fields.get("建筑面积", ""),
        "developer": fields.get("建设单位", ""),
        "fields": fields,
        "images": images,
        "source": f"{BASE}{slug}/list.html",
    }


def convert_locally(url, dest):
    """Last resort: fetch the source image and downscale it here.

    The CDN refuses to transform anything over 25 MB and hands back a JSON
    error instead of an image; a few case photos are 25-40 MB PNGs. macOS
    ships sips, so shell out to that (ImageMagick if sips is missing).
    """
    raw = get(url, binary=True)
    tmp = dest + os.path.splitext(url.split("?")[0])[1] or ".png"
    with open(tmp, "wb") as f:
        f.write(raw)
    for cmd in (["sips", "-s", "format", "jpeg", "-s", "formatOptions", "80",
                 "-Z", "1400", tmp, "--out", dest],
                ["magick", tmp, "-resize", "1400x1400>", "-quality", "80", dest]):
        try:
            r = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
        except FileNotFoundError:
            continue
        if r.returncode == 0:
            os.remove(tmp)
            return True
    print(f"    !! no local image converter (sips/magick); kept {os.path.basename(tmp)}")
    return False


def images_on_disk(pid):
    """Photos already sitting in assets/img/projects for this project id."""
    if not os.path.isdir(IMG_DIR):
        return []
    names = sorted(n for n in os.listdir(IMG_DIR)
                   if re.fullmatch(re.escape(pid) + r"-\d+\.(jpg|jpeg|png|webp)", n))
    return [os.path.relpath(os.path.join(IMG_DIR, n), ROOT) for n in names]


def download_images(pid, urls):
    """Save up to MAX_IMAGES photos as assets/img/projects/<pid>-NN.jpg."""
    os.makedirs(IMG_DIR, exist_ok=True)
    saved = []
    for i, url in enumerate(urls[:MAX_IMAGES], 1):
        dest = os.path.join(IMG_DIR, f"{pid}-{i:02d}.jpg")
        rel = os.path.relpath(dest, ROOT)
        try:
            data = get(url + IMG_TRANSFORM, binary=True)
        except urllib.error.URLError as e:
            print(f"    !! {rel} failed: {e}")
            continue

        if data[:2] == b"\xff\xd8":                     # a real JPEG
            with open(dest, "wb") as f:
                f.write(data)
        else:                                           # CDN error, e.g. >25 MB
            print(f"    .. {rel}: CDN would not resize it, converting locally")
            if not convert_locally(url, dest):
                continue

        print(f"    {rel}  ({os.path.getsize(dest) // 1024} KB)")
        saved.append(rel)
        time.sleep(DELAY)
    return saved


def js_snippet(pid, case, photos):
    """A data.js-shaped block — paste it in and edit the wording freely."""
    area = case["floor_area"].replace(" ", "")
    bits = [b for b in (case["address"], f"建筑面积 {area}" if area else "",
                        case["developer"]) if b]
    return (
        f'  {{\n'
        f'    id: "{pid}",\n'
        f'    thumb: "{photos[0] if photos else ""}",\n'
        f'    gallery: [{", ".join(chr(34) + p + chr(34) for p in photos)}],\n'
        f'    title:  {{ en: "", zh: "{case["name"]}" }},\n'
        f'    client: {{ en: "", zh: "{case["developer"]}" }},\n'
        f'    summary:{{ en: "", zh: "{" · ".join(bits)}。" }}\n'
        f'    // source: {case["source"]}\n'
        f'  }},'
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--images", action="store_true", help="download the photos")
    ap.add_argument("--snippet", action="store_true", help="print data.js blocks")
    ap.add_argument("--only", default="", help="comma-separated project ids")
    args = ap.parse_args()

    only = [x.strip() for x in args.only.split(",") if x.strip()]
    targets = {k: v for k, v in PROJECTS.items() if not only or k in only}
    if only:
        for pid in only:
            if pid not in PROJECTS:
                print(f"unknown project id: {pid}", file=sys.stderr)
                return 1

    print("Reading the tgkw.com case catalogue…")
    cases = catalogue()
    print(f"  {len(cases)} cases on the live site\n")

    result = {"catalogue": cases, "scraped": {}}
    if os.path.exists(JSON_OUT):              # keep projects this run skipped
        try:
            with open(JSON_OUT, encoding="utf-8") as f:
                result["scraped"] = json.load(f).get("scraped", {})
        except (ValueError, OSError):
            pass
    snippets = []

    for pid, slug in targets.items():
        print(f"{pid}  <-  {slug}")
        try:
            case = scrape(slug)
        except urllib.error.URLError as e:
            print(f"  !! {slug} failed: {e}\n")
            continue
        print(f"  {case['name']} · {case['use_type']} · {case['floor_area']} "
              f"· {case['developer']} · {len(case['images'])} photos")
        if args.images:
            download_images(pid, case["images"])
        photos = images_on_disk(pid)          # disk is the truth, not this run
        case["local_images"] = photos
        result["scraped"][pid] = case
        snippets.append(js_snippet(pid, case, photos))
        print()
        time.sleep(DELAY)

    with open(JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"wrote {os.path.relpath(JSON_OUT, ROOT)}")

    if args.snippet:
        print("\n" + "=" * 70)
        print("Paste into TG.projects in assets/js/data.js, then edit freely:")
        print("=" * 70)
        print("\n".join(snippets))

    if not args.images:
        print("\n(no photos downloaded — re-run with --images)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
