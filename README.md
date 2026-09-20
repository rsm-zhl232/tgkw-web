# tgkw-web — Tiangong Kaiwu website (framework template)

Static site. No build step, no dependencies. Open `index.html` in a browser,
or serve the folder: `python3 -m http.server 8080`.

```
index.html      Home
dfc.html        DFC platform (software)
services.html   Design services — the revenue engine
projects.html   Project index (filterable, data-driven)
project.html    Project detail template — reads ?id= from data.js
tai.html        Tiangong TAI (links out to tgtai.com)
academy.html    Tiangong Academy / education
about.html      Company + group structure
contact.html    Contact + enquiry form (front-end only)

assets/css/main.css   Design system. Tokens at the top — change the brand
                      colour, type scale and spacing there and the whole
                      site follows.
assets/js/data.js     >>> CONTENT LIVES HERE <<< projects, categories, clients
assets/js/site.js     Header, footer, nav, language, motion, rendering
assets/img/           Logos and images. hero-axon.svg is the animated home-page
                      model — motion is CSS inside the file itself.
assets/img/projects/  Project photos, named <project id>-01.jpg, -02.jpg …
tools/gen-hero-axon.py       Regenerates hero-axon.svg (optional).
tools/scrape-tgkw-cases.py   Pulls project facts + photos from tgkw.com.
tools/tgkw-cases.json        What it last pulled, incl. all 61 live cases.
```

## Project photos

Photos live in `assets/img/projects/` and are named after the project's `id`
in `data.js`:

```
assets/img/projects/tencent-hq-01.jpg   ← first photo
assets/img/projects/tencent-hq-02.jpg
…
```

Each project in `data.js` points at them:

```js
thumb: "assets/img/projects/tencent-hq-02.jpg",   // the card image
gallery: [                                        // the detail-page strip
  "assets/img/projects/tencent-hq-01.jpg",
  "assets/img/projects/tencent-hq-02.jpg"
]
```

So you can:

- **swap a photo** — save your own file over the existing one, same filename.
  Nothing in `data.js` changes.
- **change the card image** — point `thumb` at a different file in the list.
- **reorder or remove** — edit the `gallery` list.
- **add photos** — drop `tencent-hq-07.jpg` in the folder and add the line.

### Refreshing from tgkw.com

`tools/scrape-tgkw-cases.py` reads our own case library at
`tgkw.com/project/cases` and writes the photos into `assets/img/projects/`
named after the project id. It never touches `data.js`, so your wording is
safe.

```sh
python3 tools/scrape-tgkw-cases.py                  # list cases, no downloads
python3 tools/scrape-tgkw-cases.py --images         # download the photos
python3 tools/scrape-tgkw-cases.py --images --only tencent-hq
python3 tools/scrape-tgkw-cases.py --snippet        # print a data.js block
```

To wire up another case, add a line to `PROJECTS` at the top of the script
(`"my-project-id": "tgkw-slug"`), run it with `--images --snippet`, and paste
the printed block into `TG.projects`. Run it with no arguments to see every
slug available — `tools/tgkw-cases.json` lists all 61.

## TAI before / after

`tai.html` has an interactive strip: each card shows the input a design team
gave TAI, and clicking it wipes in what TAI sent back. Cards come from
`TG.taiPairs` at the bottom of `assets/js/data.js`; the images are

```
assets/img/tai/pairs/<slug>-before.jpg   ← the input
assets/img/tai/pairs/<slug>-after.jpg    ← what TAI produced
```

where `<slug>` is the entry's `slug`. So to swap an example, save your two
files over those names — nothing in `data.js` changes. To add one, drop in a
new `<slug>-before.jpg` / `-after.jpg` pair and copy a block in `TG.taiPairs`.

Two rules for the images:

- **Same aspect ratio for both halves**, or the picture jumps on the flip.
  The card box is 16:10 and the images are `object-fit: contain`, so plans and
  diagrams keep their legends and scale bars instead of being cropped.
- **Keep them under ~350 KB.** Originals live in `assets/img/tai/` at full
  size; the web copies are resized to 1600px wide, quality 80.

## Brochures (download / preview)

`<div data-doc="edu"></div>` on any page renders a brochure card: the cover
opens an in-page viewer over the page images, and the second button hands over
the PDF. `academy.html` carries the education brochure.

```
assets/docs/tgkw-education-brochure.pdf   the file people download
assets/img/docs/edu-01.jpg … edu-12.jpg   what the viewer shows, one per spread
```

Entries live in `TG.docs` at the bottom of `assets/js/data.js` — `pages` must
match the number of images on disk. To add another brochure, export its pages
as `<id>-01.jpg …`, add a block to `TG.docs`, and drop `data-doc="<id>"` on the
page that should carry it.

The source PDFs are far too heavy for the web (the education one was 22 MB).
Re-export before publishing — page images at ~1500px wide, quality 80, and the
PDF re-encoded to under ~6 MB:

```python
import pymupdf, io
from PIL import Image
d = pymupdf.open("original.pdf"); out = pymupdf.open()
for pg in d:
    pix = pg.get_pixmap(dpi=150)
    im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    im.thumbnail((2200, 2200), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, "JPEG", quality=78, optimize=True)
    r = pymupdf.Rect(0, 0, pg.rect.width, pg.rect.height)
    out.new_page(width=r.width, height=r.height).insert_image(r, stream=buf.getvalue())
out.save("assets/docs/xxx.pdf", deflate=True, garbage=4)
```

## Where the numbers come from

The figures on the site are from the company decks, not invented:

- 85% fewer changes, 40–60% shorter programme, 10–15% lower cost, 75% less
  rework — Shenzhen Municipal Bureau of Public Works and THAD, Tsinghua
  University. The attribution line under the stat band must stay with them.
- 238 people, 27 project squads, 13 patents, 23 software copyrights,
  1000+ benchmark projects, >¥100m invested — company profile deck.
- Project figures (Hainan ¥200m, Yuexiwan 1,740 conflicts, Dongguan Museum
  874 issues, KFC and Huazhu cycle times) — the DFC project applications deck.

Update these here and on `index.html`, `about.html` when the decks are revised.

## Adding a project

Open `assets/js/data.js`, copy one block in `TG.projects`, change the values:

```js
{
  id: "my-project",          // also the URL: project.html?id=my-project
  cat: "hospitality",        // must match an id in TG.categories
  featured: true,            // true = also shown on the home page (first 6)
  thumb: "assets/img/projects/my-project.jpg",   // "" draws a placeholder
  title:  { en: "…", zh: "…" },
  client: { en: "…", zh: "…" },
  year: "2024",
  scope:  { en: "…", zh: "…" },
  summary:{ en: "…", zh: "…" }
}
```

Nothing else to touch — the index page, the filters, the home page grid and
the related-projects strip all update.

## Bilingual text

Every visible string carries both languages side by side:

```html
<span data-lang="en">Design services</span><span data-lang="zh">设计服务</span>
```

CSS hides whichever one is not active. The EN/中文 switch in the header sets
`<html data-lang="…">` and remembers the choice. Default is English unless the
browser is Chinese. No dictionary file to maintain — write both languages next
to each other.

In `data.js` the same idea is expressed as `{ en: "…", zh: "…" }`.

## Navigation and footer

Edit `TG.nav` and `TG.footer` at the top of `assets/js/site.js`. Both are
rendered on every page from that one place.

## Images

Placeholders are drawn in CSS (a blueprint grid with the slot name), so the
layout is correct before you have photography. Replace them by:

- **Projects** — set `thumb` in `data.js`.
- **Page sections** — replace
  `<div class="frame"><span class="ph-mark">IMAGE / 01</span></div>` with
  `<div class="frame"><img src="assets/img/…" alt="…"></div>`.
  Same for `.frow__media`.

Suggested sizes: project thumbs 1200×900, section images 1920×1080, client
logos SVG or transparent PNG at 32px tall.

## Still to wire up

- Contact form posts nowhere — connect it to a backend or a form service.
- Prices on `dfc.html` are `$—` placeholders; set international list prices.
- Phone number on `contact.html` is blank.
- `hello@tgkw.com` is a suggested address, not a live one.
