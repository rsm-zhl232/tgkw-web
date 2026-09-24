# tgkw-web — 天宫开物官网 · Tiangong Kaiwu website

线上预览 · Live: **https://rsm-zhl232.github.io/tgkw-web/**

纯静态站，没有构建步骤，没有依赖。直接用浏览器打开 `index.html`，或在目录下起一个服务：

Static site. No build step, no dependencies. Open `index.html` in a browser,
or serve the folder:

```sh
python3 -m http.server 8080          # 然后访问 http://localhost:8080
python3 -m http.server 8080 --bind 0.0.0.0   # 手机同一 Wi-Fi 下也能看
```

推送到 `main` 后 GitHub Pages 自动重新构建，约一分钟后线上更新，不需要额外操作。

Pushing to `main` rebuilds GitHub Pages automatically; the live site updates
about a minute later. Nothing else to run.

---

## 目录结构 · Layout

```
index.html      首页                      Home
products.html   产品体系（六产品闭环图）      Product system (six-product loop)
dfc.html        DFC 平台（软件）           DFC platform (software)
services.html   设计服务                   Design services — the revenue engine
projects.html   项目索引（可筛选，数据驱动） Project index (filterable, data-driven)
project.html    项目详情模板，读 ?id=       Project detail template — reads ?id= from data.js
tai.html        天宫 TAI                   Tiangong TAI (links out to tgtai.com)
academy.html    产教融合 / 教育             Tiangong Academy / education
about.html      公司与集团架构              Company + group structure
contact.html    联系与咨询表单（仅前端）     Contact + enquiry form (front-end only)

assets/css/main.css   设计系统。顶部是 tokens——改那里的品牌色、字阶和间距，全站跟着变。
                      Design system. Tokens at the top — change the brand colour,
                      type scale and spacing there and the whole site follows.
assets/js/data.js     >>> 内容都在这里 <<< 项目、分类、客户、TAI 对比图、宣传册
                      >>> CONTENT LIVES HERE <<< projects, categories, clients,
                      TAI pairs, brochures
assets/js/site.js     页头、页脚、导航、语言、动效、渲染逻辑
                      Header, footer, nav, language, motion, rendering
assets/img/           Logo 与图片。tgkw-logo.svg 是公司标志（矢量，页头页脚与 favicon 共用，
                      源文件在 _source/brand/）；favicon-180/512.png 是不支持 SVG favicon
                      的浏览器兜底；hero-axon.svg 是首页那个会动的模型，动效是文件内部的 CSS。
                      Logos and images. tgkw-logo.svg is the company mark (vector; header,
                      footer and favicon all use it — source file in _source/brand/).
                      favicon-180/512.png are fallbacks for browsers without SVG favicon
                      support. hero-axon.svg is the animated home-page model — its motion
                      is CSS inside the file itself.
assets/img/projects/  项目照片，按 <project id>-01.jpg、-02.jpg … 命名
                      Project photos, named <project id>-01.jpg, -02.jpg …
assets/img/tai/pairs/ TAI 前后对比图（网页实际加载的优化版）
                      TAI before/after images the site actually loads
assets/img/docs/      宣传册内页图，预览器用
                      Brochure page images, for the viewer
assets/docs/          可下载的宣传册 PDF     Downloadable brochure PDFs
tools/gen-hero-axon.py       重新生成 hero-axon.svg（可选）
                             Regenerates hero-axon.svg (optional).
tools/scrape-tgkw-cases.py   从 tgkw.com 抓项目资料和照片
                             Pulls project facts + photos from tgkw.com.
tools/tgkw-cases.json        上次抓取的结果，含全部 61 个在线案例
                             What it last pulled, incl. all 61 live cases.

_source/              原始素材，不上传（见下一节）
                      Raw material, not pushed (see next section)
```

---

## 原始素材 · `_source/` (not pushed)

**规则只有一条：`_source/` 里的不上传，其余全部上传。** 新素材直接放进去，不用改 `.gitignore`。

**One rule: nothing in `_source/` is pushed; everything else is.** Drop new
material in there and `.gitignore` never needs editing.

```
_source/
├── decks/            PPT 与宣传册原件 · decks and original brochures     419 MB
│   ├── 天宫开物企业介绍.pptx                      274 MB  ← 超过 GitHub 100 MB 硬限
│   ├── 天宫开物：建筑数字化转型与产教融合汇报方案.pptx  94 MB
│   ├── 20260707-DFC数字建造的项目应用.pdf           25 MB
│   ├── 0902-天宫开物产教融合宣传册.pdf              22 MB
│   └── TAI+DFC工作流｜数字化设计系统(1).pdf          3.7 MB
├── brand/            logo 源文件 · logo source files (.ai)
├── tai-originals/    TAI 前后对比原图 40 张 · 40 full-size before/after images   52 MB
└── misc/             其他（网页截图、旧模板图片）· screenshots, retired template images
```

这些是写网站用的原料，不是网站本身——网站运行不加载其中任何一个。
**它们只存在于本地，克隆仓库拿不到**，请在公司网盘保留一份。
网站上的数字出自哪份资料，见下面「数字出处」一节。

These are the raw material the site was built from, not the site — nothing on
it loads them. **They exist only locally; a clone of this repo will not have
them**, so keep a copy on the company drive. For which figure came from which
deck, see "数字出处 · Where the numbers come from" below.

---

## 项目照片 · Project photos

照片放在 `assets/img/projects/`，按 `data.js` 里项目的 `id` 命名：

Photos live in `assets/img/projects/` and are named after the project's `id`
in `data.js`:

```
assets/img/projects/tencent-hq-01.jpg   ← 第一张 / first photo
assets/img/projects/tencent-hq-02.jpg
…
```

`data.js` 里每个项目指向它们 · Each project in `data.js` points at them:

```js
thumb: "assets/img/projects/tencent-hq-02.jpg",   // 卡片图 / the card image
gallery: [                                        // 详情页图组 / the detail-page strip
  "assets/img/projects/tencent-hq-01.jpg",
  "assets/img/projects/tencent-hq-02.jpg"
]
```

所以你可以 · So you can:

- **换一张照片** — 用同名文件覆盖即可，`data.js` 不用动。
  **swap a photo** — save your own file over the existing one, same filename.
- **换封面图** — 把 `thumb` 指向列表里另一个文件。
  **change the card image** — point `thumb` at a different file in the list.
- **调顺序或删掉** — 编辑 `gallery` 列表。
  **reorder or remove** — edit the `gallery` list.
- **加照片** — 把 `tencent-hq-07.jpg` 丢进目录，再加一行。
  **add photos** — drop `tencent-hq-07.jpg` in the folder and add the line.

### 从 tgkw.com 更新 · Refreshing from tgkw.com

`tools/scrape-tgkw-cases.py` 读取我们自己的案例库 `tgkw.com/project/cases`，
把照片按项目 id 写进 `assets/img/projects/`。它不碰 `data.js`，所以你写的文案是安全的。

`tools/scrape-tgkw-cases.py` reads our own case library at
`tgkw.com/project/cases` and writes the photos into `assets/img/projects/`
named after the project id. It never touches `data.js`, so your wording is safe.

```sh
python3 tools/scrape-tgkw-cases.py                  # 只列案例，不下载 / list cases, no downloads
python3 tools/scrape-tgkw-cases.py --images         # 下载照片 / download the photos
python3 tools/scrape-tgkw-cases.py --images --only tencent-hq
python3 tools/scrape-tgkw-cases.py --snippet        # 打印一段 data.js / print a data.js block
```

要接入新案例：在脚本顶部的 `PROJECTS` 加一行（`"my-project-id": "tgkw-slug"`），
带 `--images --snippet` 运行，把打印出来的块粘进 `TG.projects`。
不带参数运行可以看到全部可用的 slug，`tools/tgkw-cases.json` 里列了全部 61 个。

To wire up another case, add a line to `PROJECTS` at the top of the script
(`"my-project-id": "tgkw-slug"`), run it with `--images --snippet`, and paste
the printed block into `TG.projects`. Run it with no arguments to see every
slug available — `tools/tgkw-cases.json` lists all 61.

---

## TAI 前后对比 · TAI before / after

`tai.html` 上有一组互动卡片：每张显示设计团队给 TAI 的输入，点一下就擦入 TAI 交回的结果。
卡片来自 `assets/js/data.js` 底部的 `TG.taiPairs`，图片是：

`tai.html` has an interactive strip: each card shows the input a design team
gave TAI, and clicking it wipes in what TAI sent back. Cards come from
`TG.taiPairs` at the bottom of `assets/js/data.js`; the images are:

```
assets/img/tai/pairs/<slug>-before.jpg   ← 输入 / the input
assets/img/tai/pairs/<slug>-after.jpg    ← TAI 的产出 / what TAI produced
```

`<slug>` 就是条目里的 `slug`。换例子只要用同名覆盖那两个文件，`data.js` 不用动。
加一组就放一对新的 `<slug>-before.jpg` / `-after.jpg`，再复制一个 `TG.taiPairs` 块。

where `<slug>` is the entry's `slug`. To swap an example, save your two files
over those names — nothing in `data.js` changes. To add one, drop in a new
`<slug>-before.jpg` / `-after.jpg` pair and copy a block in `TG.taiPairs`.

图片有两条规矩 · Two rules for the images:

- **前后画幅比例必须一致**，否则切换时画面会跳。卡片是 16:10，图片用 `object-fit: contain`，
  所以平面图和分析图的图例、比例尺不会被裁掉。
  **Same aspect ratio for both halves**, or the picture jumps on the flip. The
  card box is 16:10 and the images are `object-fit: contain`, so plans and
  diagrams keep their legends and scale bars instead of being cropped.
- **单张控制在 350 KB 以内。** 原图在 `_source/tai-originals/`（不上传），网页版是缩到 1600px 宽、质量 80。
  **Keep them under ~350 KB.** Originals are in `_source/tai-originals/` (not
  pushed); the web copies are resized to 1600px wide, quality 80.

---

## 宣传册下载与预览 · Brochures (download / preview)

在任意页面放 `<div data-doc="edu"></div>` 就会渲染出一张宣传册卡片：
封面打开站内预览器逐页翻，旁边的按钮直接给出 PDF。`academy.html` 挂的是产教融合宣传册。

`<div data-doc="edu"></div>` on any page renders a brochure card: the cover
opens an in-page viewer over the page images, and the second button hands over
the PDF. `academy.html` carries the education brochure.

```
assets/docs/tgkw-education-brochure.pdf   下载的文件 / the file people download
assets/img/docs/edu-01.jpg … edu-12.jpg   预览器显示的内页，一页一张跨页
                                          what the viewer shows, one per spread
```

条目写在 `assets/js/data.js` 底部的 `TG.docs`——`pages` 必须和磁盘上的图片数量一致。
要加一本：导出内页图为 `<id>-01.jpg …`，在 `TG.docs` 加一块，再在目标页面放 `data-doc="<id>"`。

Entries live in `TG.docs` at the bottom of `assets/js/data.js` — `pages` must
match the number of images on disk. To add another brochure, export its pages
as `<id>-01.jpg …`, add a block to `TG.docs`, and drop `data-doc="<id>"` on the
page that should carry it.

原版 PDF 对网页来说太重了（产教融合那份原本 22 MB）。发布前先重新导出——
内页图约 1500px 宽、质量 80，PDF 重新编码到 6 MB 以内：

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

---

## 产品体系与闭环图 · Product system

`products.html` 的环形闭环由 `assets/js/data.js` 底部的 `TG.productLine` 渲染。
**数组顺序就是圆周顺序**——第 0 项在正上方，其余顺时针排列，改顺序即改图。
内容逐字录自产教融合宣传册「05 产品体系」（P11–P12），改产品代号前请先核对原册。
注意是 **QDC**（天宫计元，成本管控），不是 DQC。

The ring on `products.html` is rendered from `TG.productLine` at the bottom of
`assets/js/data.js`. **Array order is ring order** — index 0 sits at the top and
the rest run clockwise, so reordering the array reorders the diagram. The text
is transcribed from 「05 产品体系」 in the education brochure (P11–P12); check it
before renaming a product code. Note the code is **QDC**, not DQC.

`live: true` 画成实心蓝底（已上线：DFC、TAI、ADC），`live: false` 画成描边加
「研发中」标记（在研：QDC、PDC、ODC）。窄于 860px 时环形图隐藏，改用竖排卡片——
那个宽度下标签会互相碰撞，几何关系也不再传达信息。

`live: true` draws solid (shipping: DFC, TAI, ADC); `live: false` draws outlined
with an "in development" marker (QDC, PDC, ODC). Below 860px the ring is replaced
by a stacked list — at that width the labels collide and the geometry stops
carrying meaning.

## 数字出处 · Where the numbers come from

站上的数字都出自公司资料，不是编的：

The figures on the site are from the company decks, not invented:

- **变更减少 85%、周期缩短 40–60%、成本降低 10–15%、返工下降 75%** —— 深圳市建筑工务署 ·
  清华大学建筑设计研究院《工业化建造模式与传统建造模式数字化比较研究》课题。
  数据带下面那行出处必须跟着这组数字一起出现，不能删。
  85% fewer changes, 40–60% shorter programme, 10–15% lower cost, 75% less
  rework — Shenzhen Municipal Bureau of Public Works and THAD, Tsinghua
  University. The attribution line under the stat band must stay with them.
- **300 人的实施落地团队** —— 2026-09-18 会议纪要明确口径，**取代**《企业介绍》PPT 里的
  「集团 238 人／研发 72／项目部 152／27 个项目组」。那组旧数字已从全站移除，不要改回去。
  300-strong delivery team — set by the 2026-09-18 meeting minutes, **superseding**
  the "238 across the group / 72 in software / 152 in delivery / 27 squads" split
  in the company profile deck. That older breakdown has been removed site-wide;
  do not reinstate it.
- **13 项发明专利、23 项软著、1000+ 标杆案例、投入过亿** —— 企业介绍 PPT。
  13 patents, 23 software copyrights, 1000+ benchmark projects,
  >¥100m invested — company profile deck.
- **项目数字**（海南节省 2 亿、玥玺湾 1740 条冲突、东莞博物馆 874 条、肯德基与华住的周期）
  —— DFC 数字建造的项目应用 PPT。
  Project figures (Hainan ¥200m, Yuexiwan 1,740 conflicts, Dongguan Museum
  874 issues, KFC and Huazhu cycle times) — the DFC project applications deck.

### 口径冲突的裁决 · Resolved conflicts

多份资料数字不一致时的取舍，2026-09-23 确认：

Where the decks disagree, these are the decisions made on 2026-09-23:

| 项目 | 采用 | 其他资料的说法 |
|---|---|---|
| 第三款产品代号 | **ADC 天宫·金翼** | 生态平台文档写 DCS 分布式管理平台 |
| 国家发明专利 | **13 项** | 企业介绍 PPT 与生态平台文档写 11 项 |
| 在申专利 | **100 余项** | 生态平台文档写 50+ |
| 标杆项目案例 | **1000+** | 生态平台文档写 300+ 项目实例 |
| 海南双中心节省占比 | **16.7%** | 项目应用 PPT 写 5.7% |

原则是取数值较大／较新的一方。海南那条要特别注意：16.7% 对应的是文物
艺术品交易中心单体的投资额，不是双中心合计的 35 亿元——2÷35≈5.7%，所以
改用 16.7% 时必须同时拿掉「总投资 35 亿元」，否则页面上的算术自相矛盾。
现在首页只写百分比，不写投资基数。

The rule is to take the larger or more recent figure. Note the Hainan one:
16.7% is against the art trading centre alone, not the ¥3.5bn for both
centres — ¥200m ÷ ¥3.5bn is 5.7%. So the "¥3.5bn" anchor had to come out
with the switch to 16.7%, or the arithmetic on the page contradicts itself.
The home page now states the percentage without an investment base.

生态平台文档还提供了网站尚未采用的数据：100+ 软件研发人员、2 万注册用户 /
2000 日活、DFC 覆盖 14 个专业（网站现写「六大专业」，偏窄）、北医三院缩短
工期 25%／节约造价 8%、TAI+DFC 联动使项目周期平均缩短 70%。研发总投入该
文档写 1.5 亿元，网站仍写「超过 1 亿元」，未改。

The ecosystem deck also carries figures the site does not yet use: 100+ R&D
staff, 20,000 registered users / 2,000 daily active, DFC covering 14
disciplines (the site still says six, which understates it), PUH3 at 25%
shorter programme and 8% lower cost, TAI+DFC cutting project cycles by 70%.
That deck puts total R&D investment at ¥150m; the site still says "over
¥100m" and was left unchanged.

资料改版时，这里和 `index.html`、`about.html` 都要同步更新。

Update these here and on `index.html`, `about.html` when the decks are revised.

---

## 新增一个项目 · Adding a project

打开 `assets/js/data.js`，复制 `TG.projects` 里的一块，改掉值：

Open `assets/js/data.js`, copy one block in `TG.projects`, change the values:

```js
{
  id: "my-project",          // 也是 URL：project.html?id=my-project
                             // also the URL: project.html?id=my-project
  cat: "hospitality",        // 必须对应 TG.categories 里的一个 id
                             // must match an id in TG.categories
  featured: true,            // true = 首页也展示（前 6 个）
                             // true = also shown on the home page (first 6)
  thumb: "assets/img/projects/my-project.jpg",   // 留空 "" 会画占位图
                                                 // "" draws a placeholder
  title:  { en: "…", zh: "…" },
  client: { en: "…", zh: "…" },
  year: "2024",
  scope:  { en: "…", zh: "…" },
  summary:{ en: "…", zh: "…" }
}
```

其他都不用动——索引页、筛选器、首页网格和相关项目一条龙自动更新。

Nothing else to touch — the index page, the filters, the home page grid and
the related-projects strip all update.

---

## 双语文案 · Bilingual text

每一处可见文字都把两种语言并排写在一起：

Every visible string carries both languages side by side:

```html
<span data-lang="en">Design services</span><span data-lang="zh">设计服务</span>
```

CSS 会隐藏掉当前未启用的那一种。**语言按这个优先级自动决定**：
URL 的 `?lang=zh` / `?lang=en` → 访客上次手动选择（存在 localStorage）→
浏览器/设备系统语言（`zh` 开头即中文，含 zh-CN / zh-TW / zh-HK）→ 英文兜底。
没有词典文件要维护——两种语言就挨着写。

判定逻辑存在**两处**，必须同步修改：`assets/js/site.js` 里的 `TG.pickLang()` /
`TG.applyLang()`，以及每个 HTML `<head>` 里的那段内联脚本。内联那份负责在首屏
绘制之前定好语言——`site.js` 在 `</body>` 末尾加载，没有它中文访客会先闪一下英文。

`applyLang` 同时设置 `data-lang`（驱动 CSS 显隐）和 `lang` 属性（`zh-CN` / `en`，
供屏幕阅读器、搜索引擎和浏览器的翻译提示读取），两者必须一起变。

CSS hides whichever one is not active. The EN/中文 switch in the header sets
`<html data-lang="…">` and remembers the choice. Default is English unless the
browser is Chinese. No dictionary file to maintain — write both languages next
to each other.

`data.js` 里同样的思路写成 `{ en: "…", zh: "…" }`。

In `data.js` the same idea is expressed as `{ en: "…", zh: "…" }`.

---

## 导航与页脚 · Navigation and footer

编辑 `assets/js/site.js` 顶部的 `TG.nav` 和 `TG.footer`。两者在每个页面上都从这一处渲染。

Edit `TG.nav` and `TG.footer` at the top of `assets/js/site.js`. Both are
rendered on every page from that one place.

---

## 图片 · Images

占位图是用 CSS 画的（蓝图网格加槽位名），所以还没有照片时版式就已经是对的。替换方式：

Placeholders are drawn in CSS (a blueprint grid with the slot name), so the
layout is correct before you have photography. Replace them by:

- **项目** — 在 `data.js` 里设置 `thumb`。
  **Projects** — set `thumb` in `data.js`.
- **页面区块** — 把 `<div class="frame"><span class="ph-mark">IMAGE / 01</span></div>`
  换成 `<div class="frame"><img src="assets/img/…" alt="…"></div>`，`.frow__media` 同理。
  **Page sections** — replace
  `<div class="frame"><span class="ph-mark">IMAGE / 01</span></div>` with
  `<div class="frame"><img src="assets/img/…" alt="…"></div>`.
  Same for `.frow__media`.

建议尺寸：项目缩略图 1200×900，区块大图 1920×1080，客户 logo 用 SVG 或透明 PNG、32px 高。

Suggested sizes: project thumbs 1200×900, section images 1920×1080, client
logos SVG or transparent PNG at 32px tall.

---

## 还没接上的 · Still to wire up

- 联系表单没有提交地址——需要接后端或表单服务。
  Contact form posts nowhere — connect it to a backend or a form service.
- 国际标价未定。`dfc.html` 现在挂的是国内人民币个人套装价格（￥199/月、￥2,380/年），
  海外市场如需另一套标价，需补充。
  International list pricing is not set. `dfc.html` currently shows the domestic
  RMB individual-package prices; an overseas price list still needs to be added.
- `contact.html` 的电话号码是空的。
  Phone number on `contact.html` is blank.
- `contact@tgkw.com` 是建议地址，不是真实邮箱。
  `contact@tgkw.com` is a suggested address, not a live one.
- GitHub Pages 在国内访问不稳。正式对外应走国内托管（腾讯云 COS / 阿里云 OSS + CDN，
  绑 tgkw.com 子域名，已有粤ICP备2022081818号）。
  GitHub Pages is unreliable from mainland China. For client-facing use, host
  on a Chinese provider (Tencent COS / Aliyun OSS + CDN) under a tgkw.com
  subdomain — the ICP licence is already in place.
