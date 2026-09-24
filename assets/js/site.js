/* ==========================================================================
   SITE SHELL — header, footer, language, motion, project rendering.
   Navigation and footer links live in TG.nav / TG.footer below: edit once,
   every page updates.
   ========================================================================== */

window.TG = window.TG || {};

TG.nav = [
  { href: "products.html", en: "Products", zh: "产品体系" },
  { href: "dfc.html", en: "DFC Platform", zh: "DFC 平台" },
  { href: "services.html", en: "Services", zh: "设计服务" },
  { href: "projects.html", en: "Projects", zh: "项目案例" },
  { href: "tai.html", en: "TAI", zh: "天宫 TAI" },
  { href: "academy.html", en: "Academy", zh: "天宫教育" },
  { href: "about.html", en: "About", zh: "关于我们" },
];

TG.footer = [
  {
    h: { en: "Platform", zh: "产品" },
    links: [
      { href: "products.html", en: "Product system", zh: "产品体系" },
      { href: "dfc.html", en: "DFC overview", zh: "DFC 概览" },
      { href: "dfc.html#modules", en: "Modules", zh: "功能模块" },
      { href: "dfc.html#editions", en: "Editions & pricing", zh: "版本与价格" },
      {
        href: "https://www.tgkw.com/versionview.html",
        en: "Download",
        zh: "软件下载",
        ext: true,
      },
    ],
  },
  {
    h: { en: "Services", zh: "服务" },
    links: [
      { href: "services.html#nested", en: "Nested design", zh: "嵌套设计" },
      { href: "services.html#forward", en: "Forward design", zh: "正向设计" },
      { href: "services.html#site", en: "On-site detailing", zh: "现场深化" },
      { href: "projects.html", en: "Project index", zh: "项目索引" },
    ],
  },
  {
    h: { en: "Learn", zh: "学习" },
    links: [
      { href: "academy.html", en: "Tiangong Academy", zh: "天宫课堂" },
      {
        href: "academy.html#universities",
        en: "University partners",
        zh: "校企合作",
      },
      {
        href: "https://www.tgkw.com/help/CJWT/index.html",
        en: "Documentation",
        zh: "帮助文档",
        ext: true,
      },
    ],
  },
  {
    h: { en: "Company", zh: "公司" },
    links: [
      { href: "about.html", en: "About us", zh: "关于我们" },
      { href: "contact.html", en: "Contact", zh: "联系我们" },
      {
        href: "https://www.tgkw.com",
        en: "Old site (tgkw.com)",
        zh: "进入旧官网",
        ext: true,
      },
      {
        href: "https://tgtai.com",
        en: "tgtai.com",
        zh: "tgtai.com",
        ext: true,
      },
    ],
  },
];

/* ---- Language -----------------------------------------------------------
   Order of precedence: ?lang= in the URL, then whatever the visitor last
   chose, then the browser/OS language, then English.

   Each page also runs this in an inline <head> script so the choice is made
   before first paint — this file loads at the end of <body>, and without that
   head script a Chinese visitor sees a flash of English first. The two must
   stay in step; change one, change the other.
   ------------------------------------------------------------------------ */
TG.pickLang = function () {
  var saved = null;
  try {
    saved = localStorage.getItem("tg-lang");
  } catch (e) {}
  var q = new URLSearchParams(location.search).get("lang");
  var nav = (navigator.language || "en").toLowerCase();
  return q === "zh" || q === "en"
    ? q
    : saved || (nav.indexOf("zh") === 0 ? "zh" : "en");
};

/* data-lang drives the CSS that shows one language and hides the other;
   the lang attribute is what screen readers, search engines and the
   browser's own translate prompt read, so both have to move together. */
TG.applyLang = function (lang) {
  var d = document.documentElement;
  d.setAttribute("data-lang", lang);
  d.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
};

TG.applyLang(TG.pickLang());

TG.setLang = function (lang) {
  TG.applyLang(lang);
  try {
    localStorage.setItem("tg-lang", lang);
  } catch (e) {}
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.setAttribute("aria-pressed", String(b.dataset.setLang === lang));
  });
  document.dispatchEvent(new CustomEvent("tg:lang", { detail: lang }));
};
TG.lang = function () {
  return document.documentElement.getAttribute("data-lang") || "en";
};

/* Pick the right string from a { en, zh } pair. */
TG.t = function (pair) {
  if (pair == null) return "";
  return typeof pair === "string" ? pair : pair[TG.lang()] || pair.en || "";
};
/* Render both languages inline so switching needs no re-render. */
TG.bi = function (pair) {
  if (pair == null) return "";
  if (typeof pair === "string") return TG.esc(pair);
  return (
    '<span data-lang="en">' +
    TG.esc(pair.en || "") +
    "</span>" +
    '<span data-lang="zh">' +
    TG.esc(pair.zh || pair.en || "") +
    "</span>"
  );
};
TG.esc = function (s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c];
  });
};

/* ---- Header / footer ---------------------------------------------------- */
function currentPage() {
  var p = location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
}

function renderHeader() {
  var host = document.querySelector("[data-hdr]");
  if (!host) return;
  var here = currentPage();
  var links = TG.nav
    .map(function (n) {
      var on = n.href.split("#")[0] === here ? ' aria-current="page"' : "";
      return '<a href="' + n.href + '"' + on + ">" + TG.bi(n) + "</a>";
    })
    .join("");

  host.className = "hdr";
  host.innerHTML =
    '<div class="wrap hdr__in">' +
    '<a class="brand" href="index.html">' +
    '<img src="assets/img/tgkw-logo.svg" alt="Tiangong Kaiwu" width="28" height="26">' +
    '<span class="brand__txt">' +
      '<span data-lang="en">TIANGONG KAIWU</span><span data-lang="zh">天宫开物</span>' +
      '<small><span data-lang="en">Digital Construction</span><span data-lang="zh">数字建造</span></small>' +
    '</span>' +
    "</a>" +
    '<button class="burger" aria-expanded="false" aria-controls="tg-nav" aria-label="Menu"><span></span></button>' +
    '<nav class="nav" id="tg-nav">' +
    links +
    "</nav>" +
    '<div class="hdr__act">' +
    /* The old tgkw.com still holds the help docs, tutorials and the
       resource library; this is the way back to them. Hidden below 700px,
       where the footer carries the same link. */
    '<a class="hdr__old" href="https://www.tgkw.com" target="_blank" rel="noopener">' +
      '<span data-lang="en">Old site</span><span data-lang="zh">旧版官网</span>' +
      '<span class="arw">&#8599;</span></a>' +
    '<div class="lang" role="group" aria-label="Language">' +
    '<button data-set-lang="en" aria-pressed="false">EN</button>' +
    '<button data-set-lang="zh" aria-pressed="false">中文</button>' +
    "</div>" +
    '<a class="btn btn--sm btn--ghost" href="contact.html">' +
    '<span data-lang="en">Talk to us</span><span data-lang="zh">联系我们</span></a>' +
    "</div>" +
    "</div>";

  host.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      TG.setLang(b.dataset.setLang);
    });
  });
  TG.setLang(TG.lang());

  var burger = host.querySelector(".burger");
  var nav = host.querySelector(".nav");
  burger.addEventListener("click", function () {
    var open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  var onScroll = function () {
    host.classList.toggle("is-stuck", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function renderFooter() {
  var host = document.querySelector("[data-ftr]");
  if (!host) return;
  var cols = TG.footer
    .map(function (c) {
      var items = c.links
        .map(function (l) {
          var ext = l.ext ? ' target="_blank" rel="noopener"' : "";
          return (
            '<li><a href="' + l.href + '"' + ext + ">" + TG.bi(l) + "</a></li>"
          );
        })
        .join("");
      return "<div><h4>" + TG.bi(c.h) + "</h4><ul>" + items + "</ul></div>";
    })
    .join("");

  host.className = "ftr";
  host.innerHTML =
    '<div class="wrap">' +
    '<div class="ftr__top">' +
    "<div>" +
    '<a class="brand" href="index.html" style="margin-bottom:20px">' +
    '<img src="assets/img/tgkw-logo.svg" alt="Tiangong Kaiwu" width="28" height="26">' +
    '<span class="brand__txt">' +
      '<span data-lang="en">TIANGONG KAIWU</span><span data-lang="zh">天宫开物</span>' +
      '<small><span data-lang="en">Digital Construction</span><span data-lang="zh">数字建造</span></small>' +
    '</span></a>' +
    '<p class="small" style="max-width:34ch">' +
    '<span data-lang="en">Digital construction software and design delivery, from Shenzhen to projects worldwide.</span>' +
    '<span data-lang="zh">数字建造软件与设计交付服务，从深圳走向全球项目。</span></p>' +
    '<p class="mono" style="color:var(--faint);margin-top:18px">' +
    'tgkw.com &nbsp;·&nbsp; <a href="https://tgtai.com" target="_blank" rel="noopener">tgtai.com</a></p>' +
    '<div class="qr">' +
      '<figure><img src="assets/img/social/wechat-qr.png" alt="" loading="lazy" decoding="async">' +
        '<figcaption><span data-lang="en">WeChat</span><span data-lang="zh">公众号</span><br>天宫DFC</figcaption></figure>' +
      /* Douyin's code is its own circular format, which a generic scanner will
         not read — the link is the reliable way in on desktop. WeChat's code
         decodes to a weixin.qq.com URL that only opens inside WeChat, so that
         one is deliberately left unlinked. */
      '<figure><a href="https://v.douyin.com/OcYdpY-vf7U/" target="_blank" rel="noopener">' +
        '<img src="assets/img/social/douyin-qr.png" alt="" loading="lazy" decoding="async"></a>' +
        '<figcaption><span data-lang="en">Douyin</span><span data-lang="zh">抖音号</span><br>DFCBIM</figcaption></figure>' +
    '</div>' +
    "</div>" +
    '<div class="ftr__cols">' +
    cols +
    "</div>" +
    "</div>" +
    '<div class="ftr__btm">' +
    "<span>© " +
    new Date().getFullYear() +
    ' <span data-lang="en">Tiangong Kaiwu (Shenzhen) Technology Co., Ltd.</span>' +
    '<span data-lang="zh">天宫开物（深圳）科技有限公司</span></span>' +
    '<span><a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">粤ICP备2022081818号</a></span>' +
    "</div>" +
    "</div>";
}

/* ---- Reveal on scroll --------------------------------------------------- */
function initReveal() {
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) {
      el.classList.add("is-in");
    });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        var d = Number(e.target.dataset.delay || 0) + i * 45;
        setTimeout(function () {
          e.target.classList.add("is-in");
        }, d);
        io.unobserve(e.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  els.forEach(function (el) {
    io.observe(el);
  });
}

/* ---- Hero model parallax ------------------------------------------------ */
/* The model's own motion lives inside hero-axon.svg; this only drifts the
   whole assembly with the pointer and with scroll, for a sense of depth. */
function initHeroModel() {
  var el = document.querySelector("[data-hero-model]");
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  if (window.matchMedia("(hover:none)").matches) return;

  var hero = el.closest(".hero") || document.body;
  var mx = 0,
    my = 0,
    sy = 0,
    queued = false;

  function paint() {
    queued = false;
    el.style.setProperty("--px", (mx * 26).toFixed(1) + "px");
    el.style.setProperty("--py", (my * 18 + sy).toFixed(1) + "px");
  }
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(paint);
  }

  hero.addEventListener(
    "pointermove",
    function (e) {
      var r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      schedule();
    },
    { passive: true },
  );

  hero.addEventListener("pointerleave", function () {
    mx = 0;
    my = 0;
    schedule();
  });

  window.addEventListener(
    "scroll",
    function () {
      sy = Math.min(window.scrollY, 900) * 0.06;
      schedule();
    },
    { passive: true },
  );
}

/* ---- Projects ----------------------------------------------------------- */
TG.catName = function (id) {
  var c = (TG.categories || []).find(function (x) {
    return x.id === id;
  });
  return c ? TG.bi(c) : "";
};

TG.tile = function (p) {
  var ph = p.thumb
    ? '<img src="' +
      p.thumb +
      '" alt="' +
      TG.esc(TG.t(p.title)) +
      '" loading="lazy">'
    : '<span class="ph-mark">' + TG.esc(p.id) + "</span>";
  return (
    '<a class="tile reveal" href="project.html?id=' +
    encodeURIComponent(p.id) +
    '">' +
    '<div class="tile__ph">' +
    ph +
    "</div>" +
    '<div class="tile__b">' +
    '<div class="tile__cat">' +
    TG.catName(p.cat) +
    "</div>" +
    '<div class="tile__t">' +
    TG.bi(p.title) +
    "</div>" +
    '<div class="tile__m">' +
    TG.bi(p.client) +
    (p.year ? " · " + p.year : "") +
    "</div>" +
    "</div>" +
    "</a>"
  );
};

/* ---- Project gallery ----------------------------------------------------
   Main image plus a strip of thumbnails; clicking a thumbnail swaps the main
   image, and the main image links to the full file so it opens on its own.
   `gallery` in data.js drives it; a project with only `thumb` still works.
------------------------------------------------------------------------- */
TG.galleryHTML = function (p) {
  var shots = (p.gallery && p.gallery.length ? p.gallery : [p.thumb]).filter(
    Boolean,
  );
  if (!shots.length) return '<span class="ph-mark">' + TG.esc(p.id) + "</span>";

  var lead = shots.indexOf(p.thumb);
  if (lead < 0) lead = 0;
  var name = TG.esc(TG.t(p.title));

  var strip =
    shots.length < 2
      ? ""
      : '<ul class="gallery__strip">' +
        shots
          .map(function (src, i) {
            return (
              '<li><button type="button" data-shot="' +
              src +
              '"' +
              (i === lead ? ' aria-current="true"' : "") +
              ' aria-label="' +
              name +
              " — " +
              (i + 1) +
              '">' +
              '<img src="' +
              src +
              '" alt="" loading="lazy"></button></li>'
            );
          })
          .join("") +
        "</ul>";

  return (
    '<a class="frame gallery__main" href="' +
    shots[lead] +
    '" target="_blank" rel="noopener">' +
    '<img src="' +
    shots[lead] +
    '" alt="' +
    name +
    '">' +
    "</a>" +
    strip
  );
};

TG.bindGallery = function (host) {
  var main = host.querySelector(".gallery__main");
  if (!main) return;
  host.addEventListener("click", function (e) {
    var b = e.target.closest("[data-shot]");
    if (!b) return;
    main.href = b.dataset.shot;
    main.querySelector("img").src = b.dataset.shot;
    host.querySelectorAll("[data-shot]").forEach(function (x) {
      if (x === b) {
        x.setAttribute("aria-current", "true");
      } else {
        x.removeAttribute("aria-current");
      }
    });
  });
};

function renderProjectGrids() {
  var feat = document.querySelector("[data-projects-featured]");
  if (feat) {
    var n = Number(feat.dataset.projectsFeatured) || 6;
    feat.innerHTML = (TG.projects || [])
      .filter(function (p) {
        return p.featured;
      })
      .slice(0, n)
      .map(TG.tile)
      .join("");
  }

  var grid = document.querySelector("[data-projects-grid]");
  if (!grid) return;
  var bar = document.querySelector("[data-filters]");
  var active = "all";

  function paint() {
    var list = (TG.projects || []).filter(function (p) {
      return active === "all" || p.cat === active;
    });
    grid.innerHTML = list.length
      ? list.map(TG.tile).join("")
      : '<p class="body"><span data-lang="en">No projects in this category yet.</span>' +
        '<span data-lang="zh">该分类暂无项目。</span></p>';
    initReveal();
  }

  if (bar) {
    var used = {};
    (TG.projects || []).forEach(function (p) {
      used[p.cat] = true;
    });
    bar.innerHTML =
      '<button class="chip" data-cat="all" aria-pressed="true">' +
      '<span data-lang="en">All</span><span data-lang="zh">全部</span></button>' +
      (TG.categories || [])
        .filter(function (c) {
          return used[c.id];
        })
        .map(function (c) {
          return (
            '<button class="chip" data-cat="' +
            c.id +
            '" aria-pressed="false">' +
            TG.bi(c) +
            "</button>"
          );
        })
        .join("");
    bar.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      active = b.dataset.cat;
      bar.querySelectorAll(".chip").forEach(function (x) {
        x.setAttribute("aria-pressed", String(x === b));
      });
      paint();
    });
  }
  paint();
}

function renderProjectDetail() {
  var host = document.querySelector("[data-project-detail]");
  if (!host) return;
  var id = new URLSearchParams(location.search).get("id");
  var p =
    (TG.projects || []).find(function (x) {
      return x.id === id;
    }) || TG.projects[0];
  if (!p) return;
  document.title = TG.t(p.title) + " — Tiangong Kaiwu";

  host.querySelectorAll("[data-field]").forEach(function (el) {
    var key = el.dataset.field;
    if (key === "cat") {
      el.innerHTML = TG.catName(p.cat);
      return;
    }
    var v = p[key];
    /* Plain strings (year, area) render as-is. Anything empty — a missing key,
       "", or a { en: "", zh: "" } pair — shows a dash, so the meta row never
       reads "undefined" or leaves a blank cell for a project that lacks it. */
    if (typeof v === "string" || v == null) {
      el.textContent = v || "—";
      return;
    }
    if (!TG.t(v) && !v.en && !v.zh) {
      el.textContent = "—";
      return;
    }
    el.innerHTML = TG.bi(v);
  });

  /* Write-up section: only shown once data.js actually has the copy, so an
     unwritten project shows facts and photos instead of placeholder text. */
  var writeup = host.querySelector("[data-project-writeup]");
  var prose = host.querySelector("[data-project-prose]");
  var results = host.querySelector("[data-project-results]");
  if (prose && p.detail) prose.innerHTML = TG.bi(p.detail);
  if (results && p.results && p.results.length) {
    results.innerHTML = p.results
      .map(function (r) {
        return "<li>" + TG.bi(r) + "</li>";
      })
      .join("");
    results.hidden = false;
  }
  if (writeup && (p.detail || (p.results && p.results.length)))
    writeup.hidden = false;

  var media = host.querySelector("[data-project-media]");
  if (media) {
    media.innerHTML = TG.galleryHTML(p);
    TG.bindGallery(media);
  }

  var more = host.querySelector("[data-project-more]");
  if (more) {
    more.innerHTML = (TG.projects || [])
      .filter(function (x) {
        return x.id !== p.id && x.cat === p.cat;
      })
      .slice(0, 3)
      .map(TG.tile)
      .join("");
    if (!more.innerHTML) {
      more.innerHTML = (TG.projects || [])
        .filter(function (x) {
          return x.id !== p.id;
        })
        .slice(0, 3)
        .map(TG.tile)
        .join("");
    }
  }
}

/* ---- TAI before / after ------------------------------------------------- */
/* Each card holds both images stacked. Clicking wipes the "after" across the
   "before" while a scan line runs with it, so the visitor sees the change
   happen rather than a hard cut. Cards are <button>s, so Enter/Space work and
   aria-pressed announces the state. Content lives in TG.taiPairs in data.js. */
var BA_DIR = "assets/img/tai/pairs/";

function baCard(p, i) {
  var n = String(i + 1).padStart(2, "0");
  return (
    '<button type="button" class="ba reveal" data-ba aria-pressed="false"' +
    ' data-delay="' +
    (i % 3) * 60 +
    '">' +
    '<span class="ba__stage">' +
    '<img class="ba__shot" src="' +
    BA_DIR +
    p.slug +
    '-before.jpg" alt="" loading="lazy" decoding="async">' +
    '<img class="ba__shot ba__shot--after" src="' +
    BA_DIR +
    p.slug +
    '-after.jpg" alt="" loading="lazy" decoding="async">' +
    '<span class="ba__scan" aria-hidden="true"></span>' +
    '<span class="ba__chip"><i class="ba__dot"></i>' +
    '<em class="ba__chip-b">' +
    TG.bi(p["in"]) +
    "</em>" +
    '<em class="ba__chip-a">' +
    TG.bi(p.out) +
    "</em></span>" +
    '<span class="ba__cue">' +
    '<span class="ba__cue-b"><span data-lang="en">Tap to generate</span><span data-lang="zh">点击生成</span> &#8594;</span>' +
    '<span class="ba__cue-a"><span data-lang="en">Tap to reset</span><span data-lang="zh">点击还原</span> &#8617;</span>' +
    "</span>" +
    "</span>" +
    '<span class="ba__meta">' +
    '<span class="ba__ix">' +
    n +
    "</span>" +
    '<span class="ba__cat">' +
    TG.bi(p.cat) +
    "</span>" +
    '<span class="ba__t">' +
    TG.bi(p["in"]) +
    " <i>&#8594;</i> " +
    TG.bi(p.out) +
    "</span>" +
    '<span class="ba__d">' +
    TG.bi(p.note) +
    "</span>" +
    "</span>" +
    "</button>"
  );
}

function renderTaiPairs() {
  var host = document.querySelector("[data-ba-grid]");
  if (!host) return;
  var pairs = TG.taiPairs || [];
  host.innerHTML = pairs.map(baCard).join("");

  var cards = Array.prototype.slice.call(host.querySelectorAll("[data-ba]"));
  var all = document.querySelector("[data-ba-all]");

  function flip(card, on) {
    if (card.classList.contains("is-after") === on) return;
    card.classList.toggle("is-after", on);
    card.setAttribute("aria-pressed", String(on));
    /* The scan line is only visible while the wipe is travelling. */
    card.classList.add("is-scanning");
    clearTimeout(card._baT);
    card._baT = setTimeout(function () {
      card.classList.remove("is-scanning");
    }, 780);
    syncAll();
  }

  function syncAll() {
    if (!all) return;
    var done = cards.filter(function (c) {
      return c.classList.contains("is-after");
    }).length;
    all.classList.toggle("is-all", done === cards.length);
    var c = all.querySelector("[data-ba-count]");
    if (c) c.textContent = done + " / " + cards.length;
  }

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      flip(card, !card.classList.contains("is-after"));
    });
  });

  if (all) {
    all.addEventListener("click", function () {
      var on = !all.classList.contains("is-all");
      cards.forEach(function (card, i) {
        setTimeout(function () {
          flip(card, on);
        }, i * 70);
      });
    });
    syncAll();
  }
}

/* ---- Downloadable documents --------------------------------------------- */
/* <div data-doc="edu"></div> renders the brochure card; the cover and the
   preview button open a viewer over the page images, so it reads on a phone
   where a 5 MB PDF would not. Download always hands over the real PDF.
   Content lives in TG.docs in data.js. */
var DOC_IMG = "assets/img/docs/";

function docPage(id, n) {
  return DOC_IMG + id + "-" + String(n).padStart(2, "0") + ".jpg";
}

function renderDocs() {
  var hosts = document.querySelectorAll("[data-doc]");
  if (!hosts.length) return;

  hosts.forEach(function (host) {
    var id = host.dataset.doc;
    var d = (TG.docs || {})[id];
    if (!d) return;
    host.innerHTML =
      '<article class="doc">' +
      '<button type="button" class="doc__cover reveal" data-doc-open="' +
      id +
      '">' +
      '<img src="' +
      docPage(id, 1) +
      '" alt="" loading="lazy" decoding="async">' +
      '<span class="doc__open">' +
      '<span data-lang="en">Preview</span><span data-lang="zh">在线预览</span>' +
      "</span>" +
      "</button>" +
      '<div class="reveal" data-delay="80">' +
      '<p class="doc__meta">' +
      TG.bi(d.kind) +
      " &nbsp;·&nbsp; <b>" +
      TG.esc(d.size) +
      "</b></p>" +
      '<h3 class="doc__t">' +
      TG.bi(d.title) +
      "</h3>" +
      '<p class="doc__d">' +
      TG.bi(d.note) +
      "</p>" +
      '<div class="btn-row">' +
      '<button type="button" class="btn btn--primary" data-doc-open="' +
      id +
      '">' +
      '<span data-lang="en">Read it here</span><span data-lang="zh">在线预览</span>' +
      ' <span class="arw">&#8594;</span></button>' +
      '<a class="btn btn--ghost" href="' +
      d.file +
      '" download>' +
      '<span data-lang="en">Download PDF</span><span data-lang="zh">下载 PDF</span></a>' +
      "</div>" +
      "</div>" +
      "</article>";
  });

  buildDocViewer();
}

function buildDocViewer() {
  if (document.querySelector("[data-docv]")) return;

  var v = document.createElement("div");
  v.className = "docv";
  v.setAttribute("data-docv", "");
  v.setAttribute("role", "dialog");
  v.setAttribute("aria-modal", "true");
  v.innerHTML =
    '<div class="docv__bar">' +
    '<span class="docv__t" data-docv-title></span>' +
    '<span class="docv__act">' +
    '<a class="btn btn--ghost btn--sm" data-docv-dl download>' +
    '<span data-lang="en">Download PDF</span><span data-lang="zh">下载 PDF</span></a>' +
    '<button type="button" class="docv__x" data-docv-close aria-label="Close">&#10005;</button>' +
    "</span>" +
    "</div>" +
    '<div class="docv__stage">' +
    '<button type="button" class="docv__nav docv__nav--prev" data-docv-prev aria-label="Previous">&#8249;</button>' +
    '<img data-docv-img alt="">' +
    '<button type="button" class="docv__nav docv__nav--next" data-docv-next aria-label="Next">&#8250;</button>' +
    "</div>" +
    '<div class="docv__foot" data-docv-foot></div>';
  document.body.appendChild(v);

  var img = v.querySelector("[data-docv-img]");
  var foot = v.querySelector("[data-docv-foot]");
  var prev = v.querySelector("[data-docv-prev]");
  var next = v.querySelector("[data-docv-next]");
  var cur = { id: null, n: 1, total: 1 };

  function show(n) {
    cur.n = Math.min(Math.max(n, 1), cur.total);
    img.src = docPage(cur.id, cur.n);
    img.alt =
      TG.t((TG.docs[cur.id] || {}).title || {}) +
      " — " +
      cur.n +
      "/" +
      cur.total;
    prev.disabled = cur.n === 1;
    next.disabled = cur.n === cur.total;
    foot.querySelectorAll(".docv__dot").forEach(function (d, i) {
      d.setAttribute("aria-current", String(i + 1 === cur.n));
    });
    var n = foot.querySelector(".docv__n");
    if (n) n.textContent = cur.n + " / " + cur.total;
    /* Pull the next page in early so a click does not wait on the network. */
    if (cur.n < cur.total) new Image().src = docPage(cur.id, cur.n + 1);
  }

  function open(id) {
    var d = (TG.docs || {})[id];
    if (!d) return;
    cur.id = id;
    cur.total = d.pages;
    v.querySelector("[data-docv-title]").innerHTML = TG.bi(d.title);
    v.querySelector("[data-docv-dl]").href = d.file;
    foot.innerHTML = "";
    for (var i = 1; i <= d.pages; i++) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "docv__dot";
      b.setAttribute("aria-label", String(i));
      b.addEventListener(
        "click",
        (function (k) {
          return function () {
            show(k);
          };
        })(i),
      );
      foot.appendChild(b);
    }
    var lbl = document.createElement("span");
    lbl.className = "docv__n";
    foot.appendChild(lbl);
    v.setAttribute("open", "");
    document.body.classList.add("is-locked");
    show(1);
    v.querySelector("[data-docv-close]").focus();
  }

  function close() {
    v.removeAttribute("open");
    document.body.classList.remove("is-locked");
  }

  prev.addEventListener("click", function () {
    show(cur.n - 1);
  });
  next.addEventListener("click", function () {
    show(cur.n + 1);
  });
  v.querySelector("[data-docv-close]").addEventListener("click", close);
  v.addEventListener("click", function (e) {
    if (e.target === v) close();
  });
  document.addEventListener("keydown", function (e) {
    if (!v.hasAttribute("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(cur.n - 1);
    if (e.key === "ArrowRight") show(cur.n + 1);
  });
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-doc-open]") : null;
    if (t) {
      e.preventDefault();
      open(t.dataset.docOpen);
    }
  });
}

/* ---- Product loop -------------------------------------------------------- */
/* Draws TG.productLine as a closed ring: item 0 sits at the top and the rest
   run clockwise, so the array order IS the diagram order. The ring only
   animates once, when it first scrolls into view — replaying it on every
   scroll past would be noise. Below 860px the CSS hides the ring and shows
   the stacked list this also renders. */
function renderProductLoop() {
  var host = document.querySelector("[data-loop]");
  if (!host) return;
  var items = TG.productLine || [];
  if (!items.length) return;

  var R = 37;            /* node centres, % of the box from the middle */
  var nodes = items.map(function (p, i) {
    var a = (i / items.length) * 2 * Math.PI - Math.PI / 2;
    var x = (50 + R * Math.cos(a)).toFixed(2);
    var y = (50 + R * Math.sin(a)).toFixed(2);
    var tag = p.href ? "a" : "span";
    var attr = p.href ? ' href="' + p.href + '"' : "";
    return (
      "<" + tag + attr + ' class="loop__node' + (p.live ? " loop__node--live" : "") +
        '" style="--x:' + x + '%;--y:' + y + '%;--i:' + i + '">' +
        '<b class="loop__code">' + TG.esc(p.code) + "</b>" +
        '<span class="loop__role">' + TG.bi(p.role) + "</span>" +
        (p.live ? "" :
          '<span class="loop__wip"><span data-lang="en">In development</span>' +
          '<span data-lang="zh">研发中</span></span>') +
      "</" + tag + ">"
    );
  }).join("");

  /* r=40 in a 0..100 viewBox leaves room for the 1.5px stroke to sit inside. */
  var r = 40, circ = (2 * Math.PI * r).toFixed(2);
  host.innerHTML =
    '<div class="loop" data-loop-fig>' +
      '<svg class="loop__ring" viewBox="0 0 100 100" aria-hidden="true" ' +
        'style="--circ:' + circ + '">' +
        '<circle class="loop__track" cx="50" cy="50" r="' + r + '"></circle>' +
        /* rotated so the stroke starts drawing from the top, not from 3 o'clock */
        '<circle class="loop__draw" cx="50" cy="50" r="' + r + '" ' +
          'transform="rotate(-90 50 50)"></circle>' +
      "</svg>" +
      '<div class="loop__orbit" aria-hidden="true"><i></i></div>' +
      '<div class="loop__core">' +
        '<b><span data-lang="en">Design and cost, unified</span><span data-lang="zh">设计成本一体化</span></b>' +
        '<b><span data-lang="en">Whole-project management</span><span data-lang="zh">全域项目管理</span></b>' +
        '<span><span data-lang="en">Closed loop</span><span data-lang="zh">全流程闭环</span></span>' +
      "</div>" +
      nodes +
    "</div>" +
    '<ul class="loop-list">' + items.map(function (p) {
      return '<li class="card' + (p.live ? "" : "") + '">' +
        '<div class="card__ix">' + TG.esc(p.code) +
          (p.live ? "" : ' · <span data-lang="en">In development</span><span data-lang="zh">研发中</span>') +
        "</div>" +
        '<h3 class="card__t">' + TG.bi(p.role) + "</h3>" +
        '<p class="card__d">' + TG.bi(p.note) + "</p>" +
      "</li>";
    }).join("") + "</ul>";

  var fig = host.querySelector("[data-loop-fig]");
  if (!("IntersectionObserver" in window)) { fig.classList.add("is-in"); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);          /* play once, not on every pass */
    });
  }, { threshold: 0.35 });
  io.observe(fig);
}

/* ---- Product matrix ------------------------------------------------------ */
function renderProductMatrix() {
  var host = document.querySelector("[data-product-matrix]");
  if (!host) return;
  var items = TG.productLine || [];
  function row(p) {
    return '<div class="frow reveal" style="padding-block:clamp(26px,3vw,40px)">' +
      "<div>" +
        '<p class="mono accent">' + TG.esc(p.code) + "</p>" +
        '<h3 class="h3 mt-s">' + TG.bi(p.zh ? { en: p.code + " " + p.zh, zh: p.code + " " + p.zh } : p.role) +
          (p.live ? "" :
            ' <span class="loop__wip" style="vertical-align:middle">' +
            '<span data-lang="en">In development</span><span data-lang="zh">研发中</span></span>') +
        "</h3>" +
        '<p class="small" style="margin-top:6px;color:var(--faint)">' + TG.bi(p.kind) + "</p>" +
      "</div>" +
      '<p class="body">' + TG.bi(p.note) +
        (p.href ? ' <a class="link" href="' + p.href + '">' +
          '<span data-lang="en">More</span><span data-lang="zh">了解详情</span></a>' : "") +
      "</p>" +
    "</div>";
  }
  var live = items.filter(function (p) { return p.live; });
  var wip  = items.filter(function (p) { return !p.live; });
  host.innerHTML =
    '<p class="eyebrow reveal"><span class="num">02</span>' +
      '<span data-lang="en">Shipping today</span><span data-lang="zh">核心产品矩阵</span></p>' +
    live.map(row).join("") +
    '<p class="eyebrow reveal" style="margin-top:clamp(48px,6vw,80px)"><span class="num">03</span>' +
      '<span data-lang="en">In development</span><span data-lang="zh">未来产品布局</span></p>' +
    wip.map(row).join("");
}

/* ---- Client wall -------------------------------------------------------- */
function renderClients() {
  var host = document.querySelector("[data-clients]");
  if (!host) return;
  host.innerHTML = (TG.clients || [])
    .map(function (c) {
      return (
        "<li>" +
        (c.img
          ? '<img src="' +
            c.img +
            '" alt="' +
            TG.esc(c.en) +
            '" loading="lazy">'
          : TG.bi(c)) +
        "</li>"
      );
    })
    .join("");
}

/* ---- Boot --------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  renderHeader();
  renderFooter();
  renderClients();
  renderProjectGrids();
  renderProjectDetail();
  renderTaiPairs();
  renderDocs();
  renderProductLoop();
  renderProductMatrix();
  initReveal();
  initHeroModel();
});
