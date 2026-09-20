/* ==========================================================================
   CONTENT DATA — this is the only file you need to edit to add projects.
   Every text field takes { en, zh }.

   PHOTOS
   thumb:   the one image used on project cards. Any file you like.
   gallery: every image shown on the project detail page, in order.
            Files are named <project id>-01.jpg, -02.jpg … in
            assets/img/projects/, so to swap a photo just save your own file
            over the top of it with the same name — nothing here changes.
            To reorder, change the order of this list. To drop one, delete the
            line. To use a different lead image, point `thumb` at another file.
   Leave thumb "" and a blueprint placeholder is drawn automatically.

   WHERE THIS CONTENT CAME FROM
   title / client / location / area / gallery were scraped from our own case
   library at tgkw.com/project/cases (see `source` on each project) by
   tools/scrape-tgkw-cases.py. Re-run it to refresh.
   `year` and `scope` are NOT on those pages — they carry over from the
   template and still need checking.

   OPTIONAL WRITE-UP — add these to any project and the "What we did" section
   appears on its detail page. Leave them out and the page shows just the
   facts and the photos (no placeholder text):
       detail:  { en: "…", zh: "…" },
       results: [{ en: "…", zh: "…" }, { en: "…", zh: "…" }]
   ========================================================================== */

window.TG = window.TG || {};

/* Project categories — the `id` is what a project's `cat` refers to. */
TG.categories = [
  { id: "civic",       en: "Civic & Cultural",   zh: "政府公建" },
  { id: "residential", en: "Residential",        zh: "住宅" },
  { id: "office",      en: "Workplace",          zh: "办公" },
  { id: "retail",      en: "Retail & Commercial",zh: "商业" },
  { id: "hospitality", en: "Hospitality",        zh: "酒店" },
  { id: "healthcare",  en: "Healthcare",         zh: "医院" },
  { id: "sports",      en: "Sports & Venues",    zh: "体育场馆" },
  { id: "education",   en: "Education",          zh: "学校" },
  { id: "industrial",  en: "Industrial",         zh: "工业建筑" }
];

/* ---- Projects -----------------------------------------------------------
   Copy one block, change the values. `featured: true` surfaces it on the
   home page (first 6 featured items are used).
------------------------------------------------------------------------- */
TG.projects = [
  {
    id: "tencent-hq",
    cat: "office",
    featured: true,
    source: "https://www.tgkw.com/project/cases/tengxun/list.html",
    thumb: "assets/img/projects/tencent-hq-02.jpg",
    gallery: [
      "assets/img/projects/tencent-hq-01.jpg",
      "assets/img/projects/tencent-hq-02.jpg",
      "assets/img/projects/tencent-hq-03.jpg",
      "assets/img/projects/tencent-hq-04.jpg",
      "assets/img/projects/tencent-hq-05.jpg",
      "assets/img/projects/tencent-hq-06.jpg"
    ],
    title:   { en: "Tencent Shenzhen Headquarters", zh: "腾讯深圳总部项目" },
    client:  { en: "Tencent Technology (Shenzhen)", zh: "腾讯科技（深圳）有限公司" },
    location:{ en: "Shenzhen", zh: "深圳市" },
    area:    "56,000 ㎡",
    year: "2023",
    scope:  { en: "Interior BIM · Coordination · Shop drawings", zh: "装饰BIM · 协同 · 施工图" },
    summary:{ en: "Workplace fit-out for Tencent in Shenzhen, 56,000 ㎡ gross floor area, modelled and documented in one DFC model.",
              zh: "腾讯深圳总部办公空间，建筑面积 56,000 ㎡，在同一个 DFC 模型中完成建模与出图。" }
  },
  {
    id: "zte-supercampus",
    cat: "office",
    featured: true,
    source: "https://www.tgkw.com/project/cases/zxtx/list.html",
    thumb: "assets/img/projects/zte-supercampus-01.jpg",
    gallery: [
      "assets/img/projects/zte-supercampus-01.jpg",
      "assets/img/projects/zte-supercampus-02.jpg",
      "assets/img/projects/zte-supercampus-03.jpg",
      "assets/img/projects/zte-supercampus-04.jpg",
      "assets/img/projects/zte-supercampus-05.jpg",
      "assets/img/projects/zte-supercampus-06.jpg"
    ],
    title:   { en: "ZTE Super Headquarters Campus", zh: "中兴通讯超级总部基地" },
    client:  { en: "ZTE Corporation", zh: "中兴通讯股份有限公司" },
    location:{ en: "Nanshan, Shenzhen", zh: "深圳市南山区" },
    area:    "62,966 ㎡",
    year: "2023",
    scope:  { en: "MEP BIM · Clash resolution", zh: "机电BIM · 碰撞检测" },
    summary:{ en: "62,966 ㎡ headquarters campus for ZTE in Nanshan, Shenzhen — MEP coordinated against architecture and structure before site.",
              zh: "中兴通讯超级总部基地，位于深圳市南山区，建筑面积 62,966 ㎡，机电与土建在施工前完成协同校核。" }
  },
  {
    id: "poly-grand-theatre",
    cat: "civic",
    featured: true,
    source: "https://www.tgkw.com/project/cases/djy/list.html",
    thumb: "assets/img/projects/poly-grand-theatre-01.jpg",
    gallery: [
      "assets/img/projects/poly-grand-theatre-01.jpg",
      "assets/img/projects/poly-grand-theatre-02.jpg",
      "assets/img/projects/poly-grand-theatre-03.jpg",
      "assets/img/projects/poly-grand-theatre-04.jpg",
      "assets/img/projects/poly-grand-theatre-05.jpg",
      "assets/img/projects/poly-grand-theatre-06.jpg"
    ],
    title:   { en: "Poly Culture & Art City Grand Theatre, Jiangxi", zh: "江西保利文化艺术城大剧院项目" },
    client:  { en: "Nanchang Baohe Properties", zh: "南昌保和置业有限公司" },
    location:{ en: "Nanchang, Jiangxi", zh: "江西省南昌市" },
    area:    "45,000 ㎡",
    year: "2024",
    scope:  { en: "Full-process BIM", zh: "全过程BIM" },
    summary:{ en: "45,000 ㎡ grand theatre in Nanchang — a faceted envelope and a performance hall carried from design through to construction documentation.",
              zh: "南昌 45,000 ㎡ 大剧院项目，异形表皮与观演空间从设计一路贯通至施工图交付。" }
  },
  {
    id: "dongguan-museum",
    cat: "civic",
    featured: true,
    source: "https://www.tgkw.com/project/cases/museum/list.html",
    thumb: "assets/img/projects/dongguan-museum-01.jpg",
    gallery: [
      "assets/img/projects/dongguan-museum-01.jpg",
      "assets/img/projects/dongguan-museum-02.jpg",
      "assets/img/projects/dongguan-museum-03.jpg",
      "assets/img/projects/dongguan-museum-04.jpg",
      "assets/img/projects/dongguan-museum-05.jpg",
      "assets/img/projects/dongguan-museum-06.jpg"
    ],
    title:   { en: "Dongguan Museum — New Building", zh: "东莞市博物馆新馆建设项目" },
    client:  { en: "Poly Developments (Greater Bay Area)", zh: "保利发展湾区公司" },
    location:{ en: "Dongguan, Guangdong", zh: "广东省东莞市" },
    area:    "39,904.64 ㎡",
    year: "2024",
    scope:  { en: "Design + BIM delivery", zh: "设计 + BIM 交付" },
    summary:{ en: "New 39,905 ㎡ museum building in Dongguan — public halls, exhibition spaces and back-of-house delivered on one model.",
              zh: "东莞市博物馆新馆，建筑面积 39,904.64 ㎡，公共大厅、展陈空间与后勤区域基于同一模型交付。" }
  },
  {
    id: "puh3-medical-centre",
    cat: "healthcare",
    featured: true,
    source: "https://www.tgkw.com/project/cases/bjthreeyy/list.html",
    thumb: "assets/img/projects/puh3-medical-centre-01.jpg",
    gallery: [
      "assets/img/projects/puh3-medical-centre-01.jpg",
      "assets/img/projects/puh3-medical-centre-02.jpg",
      "assets/img/projects/puh3-medical-centre-03.jpg",
      "assets/img/projects/puh3-medical-centre-04.jpg",
      "assets/img/projects/puh3-medical-centre-05.jpg",
      "assets/img/projects/puh3-medical-centre-06.jpg"
    ],
    title:   { en: "Peking University Third Hospital — National Regional Medical Centre", zh: "北京大学第三医院国家区域医疗中心项目" },
    client:  { en: "Peking University Third Hospital", zh: "北京大学第三医院" },
    location:{ en: "Zhangjiakou, Hebei", zh: "河北省张家口市" },
    area:    "137,446.44 ㎡",
    year: "2023",
    scope:  { en: "MEP + interior BIM", zh: "机电 + 装饰BIM" },
    summary:{ en: "137,446 ㎡ national regional medical centre in Zhangjiakou — the largest model in this set, with MEP and interior coordinated together.",
              zh: "张家口国家区域医疗中心，建筑面积 137,446.44 ㎡，本组项目中体量最大，机电与装饰同步协同。" }
  },
  {
    id: "maoming-olympic",
    cat: "sports",
    featured: true,
    source: "https://www.tgkw.com/project/cases/maoming_olympic_sports_center/list.html",
    thumb: "assets/img/projects/maoming-olympic-02.jpg",
    gallery: [
      "assets/img/projects/maoming-olympic-01.jpg",
      "assets/img/projects/maoming-olympic-02.jpg",
      "assets/img/projects/maoming-olympic-03.jpg",
      "assets/img/projects/maoming-olympic-04.jpg",
      "assets/img/projects/maoming-olympic-05.jpg",
      "assets/img/projects/maoming-olympic-06.jpg"
    ],
    title:   { en: "Maoming Olympic Sports Centre", zh: "茂名市奥林匹克体育中心项目" },
    client:  { en: "Poly South China", zh: "华南保利集团" },
    location:{ en: "Maoming, Guangdong", zh: "广东茂名" },
    area:    "193,393 ㎡",
    year: "2022",
    scope:  { en: "Structural + MEP BIM", zh: "结构 + 机电BIM" },
    summary:{ en: "193,393 ㎡ Olympic sports centre — long-span roof steelwork and stadium services modelled for fabrication and installation.",
              zh: "茂名奥林匹克体育中心，建筑面积 193,393 ㎡，大跨度屋面钢结构与场馆机电按加工与安装深度建模。" }
  },
  {
    id: "heytea-spaces",
    cat: "retail",
    featured: false,
    source: "https://www.tgkw.com/project/cases/liketea/list.html",
    thumb: "assets/img/projects/heytea-spaces-01.jpg",
    gallery: [
      "assets/img/projects/heytea-spaces-01.jpg"
    ],
    title:   { en: "HEYTEA — Store Space Design", zh: "喜茶空间设计项目" },
    client:  { en: "HEYTEA (Shenzhen Meixixi F&B)", zh: "喜茶（深圳美西西餐饮管理有限公司）" },
    location:{ en: "", zh: "" },
    area:    "",
    year: "2023",
    scope:  { en: "Rollout design · Standard family library", zh: "标准化设计 · 族库" },
    summary:{ en: "Store space design for HEYTEA — a standard component library so each new store is drawn from the same parts.",
              zh: "喜茶门店空间设计，建立标准化族库，使每家新店都从同一套构件出图。" }
  },
  {
    id: "yum-china",
    cat: "retail",
    featured: false,
    source: "https://www.tgkw.com/project/cases/kfc/list.html",
    thumb: "assets/img/projects/yum-china-01.jpg",
    gallery: [
      "assets/img/projects/yum-china-01.jpg",
      "assets/img/projects/yum-china-02.jpg",
      "assets/img/projects/yum-china-03.jpg",
      "assets/img/projects/yum-china-04.jpg"
    ],
    title:   { en: "Yum China — BIM Construction Standard, Family Library & Automation", zh: "百胜中国营建BIM数字化设计-族库及智能化开发" },
    client:  { en: "Yum China Holdings", zh: "百胜中国控股有限公司" },
    location:{ en: "", zh: "" },
    area:    "",
    year: "2022",
    scope:  { en: "Family library + automation", zh: "族库及智能化开发" },
    summary:{ en: "Digital construction standard for Yum China's store programme — component library plus automation so a store set is generated, not redrawn.",
              zh: "百胜中国营建 BIM 数字化标准：族库结合智能化开发，门店图纸由模型生成而非重复绘制。" }
  },
  {
    id: "changsha-nuoya-hotel",
    cat: "hospitality",
    featured: false,
    source: "https://www.tgkw.com/project/cases/scny/list.html",
    thumb: "assets/img/projects/changsha-nuoya-hotel-01.jpg",
    gallery: [
      "assets/img/projects/changsha-nuoya-hotel-01.jpg",
      "assets/img/projects/changsha-nuoya-hotel-02.jpg",
      "assets/img/projects/changsha-nuoya-hotel-03.jpg",
      "assets/img/projects/changsha-nuoya-hotel-04.jpg",
      "assets/img/projects/changsha-nuoya-hotel-05.jpg"
    ],
    title:   { en: "Nuoya Hotel, Changsha", zh: "长沙诺雅酒店项目" },
    client:  { en: "Changsha Baining Hotel Management", zh: "长沙市柏宁酒店管理有限公司" },
    location:{ en: "Yuelu, Changsha, Hunan", zh: "湖南省长沙市岳麓区" },
    area:    "23,345 ㎡",
    year: "2021",
    scope:  { en: "Interior BIM", zh: "装饰BIM" },
    summary:{ en: "23,345 ㎡ hotel in Changsha — public areas and guest floors, with point-cloud survey checked against the model.",
              zh: "长沙诺雅酒店，建筑面积 23,345 ㎡，公区与客房层设计，并以点云扫描与模型进行复核。" }
  }
];

/* ---- Client logo wall ---------------------------------------------------
   `img` optional: "assets/img/clients/xxx.svg". Without it the name is set in type.
------------------------------------------------------------------------- */
TG.clients = [
  { en: "Tencent",        zh: "腾讯",          img: "" },
  { en: "China Resources",zh: "华润",          img: "" },
  { en: "Poly Group",     zh: "保利发展控股",  img: "" },
  { en: "CSCEC",          zh: "中建集团",      img: "" },
  { en: "OCT Group",      zh: "华侨城",        img: "" },
  { en: "ICBC",           zh: "中国工商银行",  img: "" },
  { en: "China Jinmao",   zh: "中国金茂",      img: "" },
  { en: "China Overseas", zh: "中海地产",      img: "" },
  { en: "CRCC",           zh: "中国铁建",      img: "" },
  { en: "CNBM",           zh: "中国建材集团",  img: "" },
  { en: "Yum China",      zh: "百胜中国",      img: "" },
  { en: "Kangtai Bio",    zh: "康泰生物",      img: "" }
];

/* ---- TAI before / after -------------------------------------------------
   The interactive strip on tai.html. One entry = one card the visitor clicks
   to swap the input (before) for what TAI produced (after).

   dir:   "assets/img/tai/pairs/<slug>-before.jpg" and "-after.jpg" — so to
          swap an example, save your two files over those names; nothing here
          changes. Keep the two images at the SAME aspect ratio, otherwise the
          picture jumps on the flip.
   in/out: the short labels under the state chip — what went in, what came out.
------------------------------------------------------------------------- */
TG.taiPairs = [
  {
    slug: "sketch-to-interior",
    cat:   { en: "Interior",     zh: "室内设计" },
    in:    { en: "Hand sketch",  zh: "手绘线稿" },
    out:   { en: "Interior render", zh: "室内效果图" },
    note:  { en: "Perspective, furniture and detailing all carry over — only material, texture and lighting are added.",
             zh: "透视、家具位置与造型全部沿用，只补材质、肌理与灯光。" }
  },
  {
    slug: "massing-to-render",
    cat:   { en: "Architecture", zh: "建筑设计" },
    in:    { en: "Massing model", zh: "体块白模" },
    out:   { en: "Night rendering", zh: "建筑夜景效果图" },
    note:  { en: "Volumes and openings stay exactly where they were; material, water, lighting and planting are filled in around them.",
             zh: "体量与开窗关系原样保留，补齐材质、水景、灯光与绿化。" }
  },
  {
    slug: "shopfront-retrofit",
    cat:   { en: "Retrofit",     zh: "存量改造" },
    in:    { en: "Site photo",   zh: "现状照片" },
    out:   { en: "Retail scheme", zh: "商业改造方案" },
    note:  { en: "Same bay width, same eave height, same neighbours — a shopfront scheme that can actually be built on this wall.",
             zh: "开间、檐口高度与两侧关系不变，给出能真正落在这面墙上的门头方案。" }
  },
  {
    slug: "shell-to-reuse",
    cat:   { en: "Adaptive reuse", zh: "城市更新" },
    in:    { en: "Derelict shell", zh: "工业遗存现状" },
    out:   { en: "Reuse proposal", zh: "活化改造方案" },
    note:  { en: "Steel trusses and the rhythm of the bays are kept; new façade, glazing and forecourt are proposed around them.",
             zh: "保留钢屋架与开间节奏，在此基础上给出新立面、玻璃幕与前场景观。" }
  },
  {
    slug: "elevation-material",
    cat:   { en: "Architecture", zh: "建筑设计" },
    in:    { en: "Line elevation", zh: "立面线图" },
    out:   { en: "Material elevation", zh: "材质立面图" },
    note:  { en: "Stone, timber fins and glazing are read off the line work layer by layer — title block and scale bar survive intact.",
             zh: "石材、木格栅与玻璃按图层逐一识别上材质，图名与比例尺原样保留。" }
  },
  {
    slug: "masterplan-colour",
    cat:   { en: "Landscape",    zh: "园林景观" },
    in:    { en: "Massing plan", zh: "白模总平" },
    out:   { en: "Coloured master plan", zh: "彩色总平面" },
    note:  { en: "Buildings, water, paving and planting coloured by layer. The road network and building footprints do not move.",
             zh: "建筑、水体、铺装与绿化分层上色，路网与建筑轮廓一点不动。" }
  },
  {
    slug: "park-activity",
    cat:   { en: "Landscape analysis", zh: "景观分析" },
    in:    { en: "Park photo",   zh: "公园实景" },
    out:   { en: "Activity diagram", zh: "活动分析图" },
    note:  { en: "The photograph becomes a base map, overlaid with activity zones and the people who would use them.",
             zh: "照片转为分析底图，叠加活动分区与使用人群动线。" }
  },
  {
    slug: "site-to-analysis",
    cat:   { en: "Urban design", zh: "城市规划" },
    in:    { en: "Satellite image", zh: "卫星影像" },
    out:   { en: "Site analysis",   zh: "场地区位分析" },
    note:  { en: "Boundary, radius rings and the surrounding urban fabric in one pass — ready to drop into the report deck.",
             zh: "红线、圈层半径与周边肌理一次生成，可直接放进汇报文本。" }
  },
  {
    slug: "render-to-four-times",
    cat:   { en: "Agent workflow", zh: "Agent 工作流" },
    in:    { en: "One render",   zh: "一张效果图" },
    out:   { en: "Four times of day", zh: "四个时段变体" },
    note:  { en: "Same viewpoint, same building, batched into blue hour, midday, golden hour and night by one agent run.",
             zh: "同一视角、同一方案，一次 Agent 运行批量产出黎明、正午、黄昏与夜景。" }
  }
];

/* ---- Downloadable documents --------------------------------------------
   Brochures offered on the site. `pages` is the count of page IMAGES in
   assets/img/docs/ named <id>-01.jpg, -02.jpg … — those are what the in-page
   viewer shows. `file` is the PDF handed over by the download button.
   Keep the PDF under ~6 MB; the originals are far larger, so re-export.
   To offer another brochure, drop its page images in, add a block here, and
   put <div data-doc="<id>"></div> on the page that should carry it.
------------------------------------------------------------------------- */
TG.docs = {
  "edu": {
    pages: 12,
    file: "assets/docs/tgkw-education-brochure.pdf",
    size: "5 MB",
    kind: { en: "PDF · 24 pages", zh: "PDF · 24 页" },
    title: { en: "Industry–education integration brochure",
             zh: "数字建造产教融合宣传册" },
    note:  { en: "The full programme: the four-way “post, course, contest, certificate” model, the 5+N cooperation menu, the product stack for teaching, and what we have built with partner colleges.",
             zh: "完整方案：岗课赛证四位一体育人模式、5+N 合作体系、面向教学的产品矩阵，以及已落地的院校合作成果。" }
  }
};
