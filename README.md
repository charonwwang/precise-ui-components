# UI Spec

让 AI 不再把所有选择控件都叫“下拉框”。

这是一个面向 Codex 的前端组件与页面结构决策 Skill：它会根据真实场景选择精确的中英文组件子类型，解释为什么使用它、为什么排除相似组件，并适配当前项目已经采用的框架、UI 库、表单方案和 SSR 环境。它还会把语义组件、视觉修饰和页面组合分开，避免把“胶囊”“通栏”“高级感”误当成组件类型。

它也支持从 0 开始的项目：先把产品需求拆成用户目标、值模型、数据规模、后果、等待方式和设备约束，再分别选择导航、输入、弹层、反馈、数据展示等组件族。语义蓝图确定后才选择框架和组件库，避免让现成组件名反过来扭曲需求。

例如，同一句“做一个可以搜索员工的下拉框”，会进一步判断为：

> 可搜索单选选择器 / Searchable single-select combobox。输入只负责查询，最终必须提交已有员工的 `userId`，禁止自由文本；不应使用允许任意值的 autocomplete，也不应使用仅执行命令的 menu。

## 这是标准 Skill 吗？

是，但需要区分两个目录：

- GitHub/npm 仓库是“发布源码”，除了标准 Skill 运行时，还包含 README、npm 安装器和测试；
- `npx` 安装到 `~/.codex/skills/ui-spec` 的才是“标准运行时 Skill”，只包含 Codex 会加载的入口和按需参考资料。

标准安装结果如下：

```text
~/.codex/skills/ui-spec/
├── SKILL.md
├── agents/openai.yaml
├── references/
└── scripts/
```

`SKILL.md` 是必需入口；`agents/`、`references/`、`scripts/` 是标准可选资源目录。不要把整个 GitHub 发布仓库直接克隆到 `~/.codex/skills`，否则 README、`package.json`、`bin/` 和 `tests/` 也会混入运行时目录。

## 安装

需要 Node.js 18 或更高版本。

### 使用 npx（推荐）

从 npm Registry 运行安装器，默认安装到 `${CODEX_HOME:-~/.codex}/skills/ui-spec`：

```bash
npx @charonwwang/ui-spec
```

也可以显式写出安装子命令：`npx @charonwwang/ui-spec install`。

更新已有安装：

```bash
npx @charonwwang/ui-spec install --force
```

`--force` 不会直接删除旧版本。安装器会先把它移动到同级的时间戳备份目录，再原子地安装新版本，并在输出中显示备份位置。

安装到自定义位置：

```bash
npx @charonwwang/ui-spec install --target /absolute/path/ui-spec
```

如果设置了 `CODEX_HOME`，默认目标会自动变为 `$CODEX_HOME/skills/ui-spec`。安装完成后，请重新启动 Codex 或新建任务，使 Skill 被重新发现。

验证本机目录是否为标准 Skill 运行时：

```bash
npx @charonwwang/ui-spec doctor
```

### 直接从 GitHub 运行

如果 npm Registry 暂时不可用，也可以直接执行 GitHub 上的最新版：

```bash
npx --yes github:charonwwang/ui-spec install
```

### 从 GitHub 源码安装

```bash
git clone https://github.com/charonwwang/ui-spec.git ui-spec-source
node ui-spec-source/bin/ui-spec.js install
```

源码保留在普通开发目录，安装器只把标准 Skill 运行时复制到 `~/.codex/skills/ui-spec`。

## 使用方式

可以显式调用：

```text
使用 $ui-spec，把“做一个可以搜索人员的下拉框”改写为精确组件规格，并按当前项目技术栈实现。
```

从 0 创建产品或页面时可以这样调用：

```text
使用 $ui-spec 从 0 设计项目管理后台。先输出交互清单和组件决策表，为每个交互选择唯一组件族与精确子类型，排除相邻类型；完成语义蓝图后再选择一套合适的技术栈并实现。
```

此时 Skill 会先决定“需要什么语义”，再决定“用哪个库实现”：

1. 拆解独立交互与状态变化；
2. 分别路由到导航、选择、输入、命令、弹层、反馈、数据、布局、动效等组件族；
3. 输出选择依据、排除项、值模型、焦点和响应式规则；
4. 最后评估原生 HTML 或单一组件库能否覆盖这些需求。

对于看板、登录页、工作台、设置页、记录详情或营销首页，Skill 会先选择页面模式，再把其中的导航、输入、命令、数据、反馈和状态分别交给对应组件族。对于 `pill`、`outline`、`full-width`、`underlined tabs` 等词，则会在组件语义确定后作为视觉修饰轴记录，而不会创建假的组件族。

也可以直接描述界面需求；当请求涉及 dropdown、input、date picker、sidebar、modal、table、upload、progress、navigation 等容易混淆的组件时，Codex 可以自动选择这个 Skill。

推荐提供这些场景事实：

- 值必须来自候选项，还是允许自由输入；
- 单选、多选、层级路径，还是命令操作；
- 数据量、远程加载、分页和虚拟化要求；
- 是任务进度、静态容量，还是未知时长的忙碌状态；
- 是否阻断背景、是否锚定触发器、是否需要持久显示；
- 项目使用的框架、UI 库、表单库、样式方案和 SSR 方式。

Skill 的回答会尽量包含：

1. 选择的中文与英文精确子类型；
2. 支撑选择的场景事实；
3. 被排除的相邻子类型及原因；
4. 值模型、键盘、无障碍和异步状态要求；
5. 与当前项目一致的实现方式和代码；
6. 所引用的单一组件族文件及详细条目。

## 能力范围

组件目录拆分为 20 个单一归属的组件族文件。目录校验器会在每次测试时动态统计可判定子类型和详细 TSX/HTML 行为示例，并检查重复归属、孤立详细条目、引用路由和代码围栏。每个子类型的决策行还包含对应代码或语义伪代码：

| 家族 | 典型精确子类型 |
|---|---|
| 选择与建议 | Native select、Searchable select、Editable combobox、Datalist、Cascader、Tree select、Transfer list |
| 布尔与模式 | Checkbox、Tri-state checkbox、Switch、Radio group、Segmented control、Content switcher |
| 文本与数值输入 | Text field、Currency input、OTP、Mentions、Tag input、Rating、Slider |
| 日期与时间 | Date picker、Date range、Month/Week picker、Time picker、Duration、Recurrence rule |
| 按钮与命令 | Primary/Destructive/Icon button、Split button、Overflow menu、Context menu |
| 导航 | Global/Local nav、Route/Content/Workspace tabs、Breadcrumb、Back link、Tree nav、Navigation drawer/rail、Pagination、Stepper、Skip link |
| 展开收起 | Disclosure、Single/Multi-open accordion、Collapsible panel、Show more、Expandable row |
| 浮层 | Tooltip、Toggletip、Hover card、Popover、Action/Selection/Picker popup、Modal/Non-modal/Full-screen dialog、Drawer、Side/Bottom sheet、Lightbox |
| 通知反馈 | Toast、Snackbar、Inline alert、Banner、Callout、Actionable notification、Notification center、Ticker、Status、Result page |
| 帮助引导 | Contextual help、Coach mark、Product tour、Help link、Empty-state guidance |
| 动效转场 | Expand/collapse reveal、Crossfade、Anchored scale-fade、Edge slide、Shared axis、Container transform、Layout reorder |
| 加载进度 | Pending button、Inline/Region/Route loading、Skeleton、Blocking loader、Optimistic pending、Background sync、Streaming |
| 列表表格树 | Semantic list、Data table、Data grid、Virtualized data grid、Tree view、Treegrid、Timeline |
| 卡片与身份 | Base/Clickable/Selectable/Expandable card、Avatar group、Badge、Status indicator |
| 搜索与筛选 | Global/Page/Component search、Filter bar、Faceted filter、Advanced filter、Query builder |
| 文件上传 | File input、Dropzone、Upload queue、Image crop uploader、Attachment list |
| 媒体内容 | Gallery、Carousel、Video/Audio player、Rich text/Markdown/Code editor、QR code |
| 布局容器 | App shell、Grid、Stack、Masonry、Split view、Resizable panel、Scroll area、Sticky region |
| 表单校验 | Form、Field、Fieldset、Inline validation、Error summary、Helper text、Form actions |
| 数据可视化 | Line/Bar/Pie/Scatter chart、Heatmap、Sparkline、Gauge、Chart shell |

## 跨框架适配

组件语义不会因为框架变化而变化，改变的是绑定、事件、生命周期、表单集成和渲染边界。Skill 会先检查项目证据，再映射实现：

- React / Next.js：受控状态、React Hook Form 等既有表单方案、Server/Client Component 边界；
- Vue / Nuxt：`v-model`、props/emits、已有 Vue 组件库与 client-only 限制；
- Angular：typed reactive forms、`FormControl`/`FormGroup`、Angular Material 等现有控件；
- Svelte / SvelteKit：Svelte 版本对应的状态与 `bind:`、SSR 安全；
- Vanilla HTML/JS：优先原生语义元素和表单约束，避免随意手写复杂 ARIA 组件。

Skill 不会为了套示例擅自引入新的组件库。若项目中的本地 wrapper 没有提供源码或现有用例，它也不会编造 props、events 或 slots，而会明确标注“语义伪代码”并列出必须检查的接口契约。

## 页面模式与视觉修饰

页面模式不是组件族。当前提供 Monitoring dashboard、Analysis dashboard、Operational workspace、Authentication entry、Settings/admin、Record detail/master-detail 和 Marketing/landing page，用来形成页面结构假设；页面里的每个交互仍必须回到唯一组件族。

视觉修饰也不是组件子类型。Skill 会分别记录强调度、形状、宽度、密度、表面、语气和 Tab 外观，并保持原有值模型、导航、命令、焦点、模态与持久化语义。例如“描边、胶囊、通栏”可以修饰一个已经判定的 Radio group 或 Primary button，但不能代替该判定。

## 示例判断

| 场景 | 应选组件 | 关键排除项 |
|---|---|---|
| 2,000 名员工远程搜索，只能提交已有 `userId` | Searchable single-select | 排除自由值 autocomplete、native select |
| 提供常见城市建议，但允许输入列表外城市 | Native datalist | 排除 strict select |
| 8,000 行数据，逐格导航、编辑、复制粘贴 | Virtualized data grid | 排除普通 interactive table |
| 显示 82 GB / 100 GB，90 GB 告警 | Meter | 排除 task progress |
| 小型点击帮助面板，内容包含链接 | Toggletip | 排除 hover-only tooltip、modal dialog |
| 桌面筛选与图表并排且可拖动宽度 | Resizable inline side panel | 排除 overlay drawer |
| 文档、用户、项目的统一检索 | Global search | 排除 component/table search |

## 验证

仓库包含确定性校验和真实场景盲测：

```bash
npm test
npm run validate:catalog
```

验证分为两层：

- `npm test` 自动运行目录完整性、触发边界、关键语义不变量和 npx 安装器回归测试；
- `tests/behavior-cases.md` 的 24 个语义选择与页面组合场景，以及 `tests/framework-cases.md` 的 8 个跨框架场景，是独立前向评估夹具，不会被描述成由普通单元测试自动执行的模型评估。

CI 在 Windows、Linux 和 macOS 上使用 Node.js 18 与 22 运行测试和 `npm pack --dry-run`。目录指标直接以校验器输出为准，避免 README 与代码发生计数漂移。

完整记录见 [tests/RESULTS.md](tests/RESULTS.md)。

## 仓库结构

```text
ui-spec/
├── SKILL.md                         # Skill 入口与决策流程
├── agents/openai.yaml               # Codex 展示信息
├── references/
│   ├── component-index.md           # 只负责路由，不存放跨族组件明细
│   ├── greenfield-workflow.md        # 0→1 需求建模、跨族编排与技术选型顺序
│   ├── page-patterns.md              # 看板、工作台、登录、设置、详情与营销页组合模式
│   ├── visual-modifiers.md           # 语义选择后的强调、形状、宽度、密度与外观修饰
│   ├── framework-adaptation.md      # 跨框架和项目适配
│   ├── prompt-recipes.md            # 通用规格模板，不拥有组件定义
│   └── components/
│       ├── selection.md
│       ├── boolean-and-mode-controls.md
│       ├── text-and-numeric-inputs.md
│       ├── date-and-time.md
│       ├── buttons-and-commands.md
│       ├── navigation.md
│       ├── disclosure.md
│       ├── overlays.md
│       ├── notifications-and-feedback.md
│       ├── help-and-onboarding.md
│       ├── motion.md
│       ├── loading-and-progress.md
│       ├── lists-tables-trees.md
│       ├── cards-identity-and-status.md
│       ├── search-filtering-and-query.md
│       ├── file-upload.md
│       ├── media-and-content.md
│       ├── layout-and-containers.md
│       ├── forms-and-validation.md
│       └── data-visualization.md
├── bin/ui-spec.js                    # npx 安装器
├── scripts/validate-catalog.js      # 跨平台确定性目录校验
└── tests/                            # 安装器、语义和跨框架测试
```

## 设计依据

组件语义和键盘模型主要参考 [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/) 与原生 HTML 语义；框架适配参考 React、Vue、Angular、Svelte 的官方状态和表单模型。完整来源链接保留在各 reference 文件中。

本项目最初受到抖音“web前端UI组件大白话”系列启发，并将其中口语化、易混淆或转写不准确的称呼规范为可检索、可实现、可验收的前端术语。

## License

[MIT](LICENSE)
