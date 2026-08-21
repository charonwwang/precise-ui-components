# UI Spec

让 AI 不再把所有选择控件都叫“下拉框”。

这是一个面向 Codex 的前端组件决策 Skill：它会根据真实场景选择精确的中英文组件子类型，解释为什么使用它、为什么排除相似组件，并适配当前项目已经采用的框架、UI 库、表单方案和 SSR 环境。

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
6. 所引用的决策矩阵或详细组件条目。

## 能力范围

组件决策矩阵目前覆盖 14 个家族、194 个可判定子类型，并提供 259 个对应 TSX/HTML 行为示例：

| 家族 | 典型精确子类型 |
|---|---|
| 选择与建议 | Native select、Searchable select、Editable combobox、Datalist、Cascader、Tree select、Transfer list |
| 布尔与模式 | Checkbox、Tri-state checkbox、Switch、Radio group、Segmented control、Content switcher |
| 输入 | Text field、Currency input、OTP、Mentions、Tag input、Rating、Query builder |
| 日期与时间 | Date picker、Date range、Month/Week picker、Time picker、Duration、Recurrence rule |
| 操作 | Primary/Destructive/Icon button、Split button、Overflow menu、Command palette |
| 导航 | Global/Local nav、Route/Content/Workspace tabs、Breadcrumb、Back link、Tree nav、Navigation drawer/rail、Pagination、Stepper、Skip link |
| 展开与动效 | Disclosure、Accordion、Expand/collapse reveal、Crossfade、Anchored scale-fade、Edge slide、Shared axis、Container transform、Layout reorder |
| 浮层 | Tooltip、Toggletip、Hover card、Popover、Action/Selection/Picker popup、Modal/Non-modal/Full-screen dialog、Drawer、Side/Bottom sheet、Lightbox |
| 通知与引导 | Toast、Inline alert、Banner、Callout、Actionable notification、Coach mark、Product tour |
| 进度与加载 | Pending button、Inline/Region/Route loading、Skeleton、Blocking loader、Optimistic pending、Background sync、Streaming、Per-item queue |
| 数据展示 | Semantic list、Data table、Data grid、Virtualized data grid、Tree view、Treegrid、Timeline |
| 卡片与身份 | Base/Clickable/Selectable/Expandable card、Avatar group、Badge、Status indicator |
| 搜索与筛选 | Global/Page/Component search、Filter bar、Faceted filter、Advanced filter、Query builder |
| 上传与媒体 | File input、Dropzone、Upload queue、Gallery、Carousel、Media player、Editor、QR code |

## 跨框架适配

组件语义不会因为框架变化而变化，改变的是绑定、事件、生命周期、表单集成和渲染边界。Skill 会先检查项目证据，再映射实现：

- React / Next.js：受控状态、React Hook Form 等既有表单方案、Server/Client Component 边界；
- Vue / Nuxt：`v-model`、props/emits、已有 Vue 组件库与 client-only 限制；
- Angular：typed reactive forms、`FormControl`/`FormGroup`、Angular Material 等现有控件；
- Svelte / SvelteKit：Svelte 版本对应的状态与 `bind:`、SSR 安全；
- Vanilla HTML/JS：优先原生语义元素和表单约束，避免随意手写复杂 ARIA 组件。

Skill 不会为了套示例擅自引入新的组件库。若项目中的本地 wrapper 没有提供源码或现有用例，它也不会编造 props、events 或 slots，而会明确标注“语义伪代码”并列出必须检查的接口契约。

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

当前验证结果：

- 官方 `skill-creator` 格式校验通过；
- npx 安装、意外覆盖保护和备份升级测试通过；
- 16/16 语义场景盲测通过；
- 8/8 跨框架盲测通过；
- React、Vue、Angular、Svelte 和 Vanilla 环境均已覆盖。

完整记录见 [tests/RESULTS.md](tests/RESULTS.md)。

## 仓库结构

```text
ui-spec/
├── SKILL.md                         # Skill 入口与决策流程
├── agents/openai.yaml               # Codex 展示信息
├── references/
│   ├── component-decision-matrix.md # 194 个子类型的选择/排除矩阵
│   ├── framework-adaptation.md      # 跨框架和项目适配
│   ├── selection-and-input.md
│   ├── date-time-and-navigation.md
│   ├── feedback-overlays-data.md
│   ├── layout-media-actions.md
│   ├── navigation.md               # 导航范围、层级、路由与响应式决策
│   ├── overlays.md                 # 锚定、模态性、任务重量与关闭方式
│   ├── motion-and-loading.md       # 展开动画、转场、加载范围与等待反馈
│   └── prompt-recipes.md
├── bin/ui-spec.js                    # npx 安装器
├── scripts/validate_catalog.py      # 确定性目录校验
└── tests/                            # 安装器、语义和跨框架测试
```

## 设计依据

组件语义和键盘模型主要参考 [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/) 与原生 HTML 语义；框架适配参考 React、Vue、Angular、Svelte 的官方状态和表单模型。完整来源链接保留在各 reference 文件中。

本项目最初受到抖音“web前端UI组件大白话”系列启发，并将其中口语化、易混淆或转写不准确的称呼规范为可检索、可实现、可验收的前端术语。

## License

[MIT](LICENSE)
