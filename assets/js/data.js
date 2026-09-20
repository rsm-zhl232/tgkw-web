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
    { id: "chain",      en: "Chain rollouts",  zh: "连锁复制" },
  { id: "developer",  en: "Developer",       zh: "地产开发" },
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
    cat: "chain",
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
    cat: "chain",
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
  },
  /* ── 以下 8 个为 2026-09-18 会议纪要要求补充的地产、酒店、连锁案例 ────────
     照片与 title/client/area 由 tools/scrape-tgkw-cases.py 从 tgkw.com 抓取，
     是真实数据。summary 和 scope 是占位，需要业务同事补写：
       scope   —— 我们具体承接了什么（嵌套/正向/现场深化/施工管理、哪些专业）
       summary —— 一两句项目介绍，出现在卡片和详情页
     en 字段留空时页面会回落到中文，填好再上线英文版。
     ──────────────────────────────────────────────────────────────── */
  {
    id: "guangzhou-flour-mill",
    cat: "developer", featured: true,
    thumb: "assets/img/projects/guangzhou-flour-mill-01.jpg",
    gallery: ["assets/img/projects/guangzhou-flour-mill-01.jpg"],
    title:  { en: "Guangzhou Flour Mill regeneration", zh: "广州南方面粉厂改造（玥玺湾）" },
    client: { en: "Poly Urban Development (Guangdong)", zh: "广东保利城市发展有限公司" },
    year: "2024", area: "175,561 ㎡",
    scope:  { en: "", zh: "" },          // TODO 承接范围
    summary:{ en: "", zh: "" }           // TODO 项目介绍
  },
  {
    id: "sanya-poly-tianjun",
    cat: "residential", featured: false,
    thumb: "assets/img/projects/sanya-poly-tianjun-01.jpg",
    gallery: ["assets/img/projects/sanya-poly-tianjun-01.jpg"],
    title:  { en: "Sanya Poly Tianjun", zh: "三亚保利天珺项目" },
    client: { en: "Poly Developments and Holdings", zh: "保利发展控股集团股份有限公司" },
    year: "", area: "172,930 ㎡",
    scope:  { en: "", zh: "" },
    summary:{ en: "", zh: "" }
  },
  {
    id: "foshan-poly-heyue",
    cat: "residential", featured: false,
    thumb: "assets/img/projects/foshan-poly-heyue-01.jpg",
    gallery: ["assets/img/projects/foshan-poly-heyue-01.jpg",
              "assets/img/projects/foshan-poly-heyue-02.jpg",
              "assets/img/projects/foshan-poly-heyue-03.jpg"],
    title:  { en: "Foshan Poly Heyue Riverside", zh: "佛山保利和悦滨江" },
    client: { en: "Foshan Zhenghong Properties", zh: "佛山市正弘置业有限公司" },
    year: "", area: "32,000 ㎡",
    scope:  { en: "", zh: "" },
    summary:{ en: "", zh: "" }
  },
  {
    id: "guangzhou-poly-duhui",
    cat: "developer", featured: false,
    thumb: "assets/img/projects/guangzhou-poly-duhui-01.jpg",
    gallery: ["assets/img/projects/guangzhou-poly-duhui-01.jpg"],
    title:  { en: "Poly Huachuang Duhui Tianjun, Tianhe", zh: "广州天河保利华创都荟天珺" },
    client: { en: "Guangzhou Suihuang Properties", zh: "广州穗皇置业有限公司" },
    year: "", area: "876 ㎡",
    scope:  { en: "", zh: "" },
    summary:{ en: "", zh: "" }
  },
  {
    id: "jiangmen-crowne-plaza",
    cat: "hospitality", featured: true,
    thumb: "assets/img/projects/jiangmen-crowne-plaza-02.jpg",
    gallery: ["assets/img/projects/jiangmen-crowne-plaza-01.jpg",
              "assets/img/projects/jiangmen-crowne-plaza-02.jpg",
              "assets/img/projects/jiangmen-crowne-plaza-03.jpg",
              "assets/img/projects/jiangmen-crowne-plaza-04.jpg"],
    title:  { en: "Crowne Plaza Jiangmen", zh: "江门保利皇冠假日酒店" },
    client: { en: "Jiangmen Poly Hongxin Real Estate", zh: "江门保利宏信房地产开发有限公司" },
    year: "2021", area: "109,358 ㎡",
    scope:  { en: "", zh: "" },
    summary:{ en: "", zh: "" }
  },
  {
    id: "jiangmen-poly-plaza",
    cat: "retail", featured: false,
    thumb: "assets/img/projects/jiangmen-poly-plaza-02.jpg",
    gallery: ["assets/img/projects/jiangmen-poly-plaza-01.jpg",
              "assets/img/projects/jiangmen-poly-plaza-02.jpg",
              "assets/img/projects/jiangmen-poly-plaza-03.jpg"],
    title:  { en: "Poly International Plaza, Jiangmen", zh: "江门保利国际广场" },
    client: { en: "Jiangmen Poly Hongxin Real Estate", zh: "江门保利宏信房地产开发有限公司" },
    year: "2021", area: "109,904 ㎡",
    scope:  { en: "", zh: "" },
    summary:{ en: "", zh: "" }
  },
  {
    id: "moutai-stores",
    cat: "chain", featured: false,
    thumb: "assets/img/projects/moutai-stores-01.jpg",
    gallery: ["assets/img/projects/moutai-stores-01.jpg"],
    title:  { en: "Moutai third-generation stores", zh: "茅台第三代专卖店" },
    client: { en: "Kweichow Moutai", zh: "贵州茅台酒股份有限公司" },
    year: "2022", area: "",
    scope:  { en: "", zh: "" },
    summary:{ en: "", zh: "" }
  },
  {
    id: "cr-vanguard",
    cat: "chain", featured: false,
    thumb: "assets/img/projects/cr-vanguard-01.jpg",
    gallery: ["assets/img/projects/cr-vanguard-01.jpg"],
    title:  { en: "CR Vanguard engineering design", zh: "华润万家工程设计服务" },
    client: { en: "China Resources Vanguard", zh: "华润万家有限公司" },
    year: "2022", area: "",
    scope:  { en: "", zh: "" },
    summary:{ en: "", zh: "" }
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

/* ---- Product line -------------------------------------------------------
   The six-product ecosystem on products.html. Content is transcribed from
   「05 产品体系」 in the 产教融合宣传册 (P11–P12) — product code, Chinese
   product name, role in the loop and status. Do not rename a code here
   without checking the brochure: the ring diagram is drawn from this list in
   order, starting at the top and running clockwise, so reordering the array
   reorders the diagram.

   live: true  —— 已上线, drawn solid
   live: false —— 研发中, drawn outlined
------------------------------------------------------------------------- */
TG.productLine = [
  {
    code: "DFC", zh: "天宫 · 启筑", live: true,
    role:  { en: "Design engine",       zh: "设计引擎" },
    kind:  { en: "Digital construction", zh: "数字建造工具" },
    note:  { en: "One model, one source of data. Architecture, fit-out and MEP are designed in parallel, with quantities and pricing generated automatically, removing design defects at source.",
             zh: "数据同源、一模到底，支持建筑、装饰、机电等多专业并行设计与量价自动生成，从源头上消除设计缺陷。" },
    href: "dfc.html"
  },
  {
    code: "QDC", zh: "天宫计元", live: false,
    role:  { en: "Cost control",        zh: "成本管控" },
    kind:  { en: "Dynamic cost platform", zh: "动态造价预算平台" },
    note:  { en: "A model-driven cost platform that keeps modelling, quantity take-off and pricing on one source.",
             zh: "基于正向模型驱动的动态造价预算平台，实现建模、算量、计价同源联动。" },
    href: ""
  },
  {
    code: "ODC", zh: "数字运营管理系统", live: false,
    role:  { en: "Operations",          zh: "数字运维" },
    kind:  { en: "Operations management", zh: "运营管理系统" },
    note:  { en: "Takes over the as-built digital asset and carries building information into operation, completing the lifecycle.",
             zh: "承接竣工数字资产，将建筑信息延伸至运营阶段，构建完整建筑全生命周期数字流转。" },
    href: ""
  },
  {
    code: "ADC", zh: "天宫 · 金翼", live: true,
    role:  { en: "Project management",  zh: "项目管理" },
    kind:  { en: "Project management",  zh: "项目管理工具" },
    note:  { en: "Whole-lifecycle project control. Live data feeds back into TAI and DFC, driving the chain forward.",
             zh: "全域管控项目全周期，实时数据反哺 TAI 与 DFC，驱动全链路智能进化。" },
    href: ""
  },
  {
    code: "PDC", zh: "项目数字化管理平台", live: false,
    role:  { en: "Programme control",   zh: "数字化管控" },
    kind:  { en: "Multi-client control", zh: "多端可视化管控" },
    note:  { en: "Multi-client visual control for engineering projects, linked to ADC data, showing programme, resources and risk in real time.",
             zh: "面向工程项目多端可视化管控模块，联动 ADC 协同数据，对进度、资源、风险进行实时可视化呈现。" },
    href: ""
  },
  {
    code: "TAI", zh: "天宫 · 神匠", live: true,
    role:  { en: "AI engine",           zh: "AI 引擎" },
    kind:  { en: "Intelligent design",  zh: "智能设计工具" },
    note:  { en: "A forward-design AI that multiplies scheme design throughput and makes design quality standardised and reusable.",
             zh: "AI 正向设计大脑让方案设计效率提升数倍，设计质量标准化、可复用。" },
    href: "tai.html"
  }
];
