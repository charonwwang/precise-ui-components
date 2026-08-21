# Component decision matrix

Use this reference before the detailed vocabulary files when the user's noun is vague. Select a subtype from case facts, not appearance.

## Selection protocol

For each requested component, determine:

1. `User goal`: enter data, choose a value, trigger an action, navigate, inspect, compare, or monitor.
2. `Value model`: no value, boolean, one-of-many, many-of-many, free text, ordered path, range, or structured expression.
3. `Information structure`: flat, grouped, hierarchical, tabular, temporal, spatial, or sequential.
4. `Interaction weight`: passive, lightweight anchored interaction, contextual task, or blocking task.
5. `Persistence`: transient, until resolved, session-persistent, or always visible.
6. `Scale`: number of options/rows, local versus remote data, and whether search or virtualization is justified.
7. `Context`: desktop/mobile, form/navigation, narrow/wide, keyboard/touch, and whether the result must remain visible.

Return the decision in this compact form:

```text
选择：可搜索单选组合框 / searchable single-select combobox
因为：候选项约 2,000 个、必须来自后端、用户知道部分名称、最终提交 userId。
排除：native select（选项过多）；autocomplete with custom value（不允许自由值）；menu（它执行命令而不产生表单值）。
```

## 1. Selection, suggestion, and action lists

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Native select / 原生选择器 | Short, predefined, single choice; ordinary forms; mobile-native interaction is valuable | Need rich rows, remote search, hierarchy, or arbitrary values | `<select><option /></select>` |
| Select-only combobox / 只选组合框 | Custom-styled single choice where users should explore without changing the committed value until selection | Native control is sufficient; typing is required | `role="combobox"` + listbox popup, no editable text |
| Searchable select / 可搜索选择器 | Large known set; typed text only filters; submitted value must match an option | Arbitrary values are valid | `<Combobox allowCustomValue={false} />` |
| Editable combobox / 可编辑组合框 | Suggestions help, but an unmatched custom value is valid | Values must be controlled vocabulary | `<Combobox allowCustomValue />` |
| Autocomplete / 自动补全 | Input is primary and suggestions accelerate entry, often remote or history-based | User merely needs to choose from a stable short list | `<Autocomplete loadOptions debounceMs={250} />` |
| Datalist / 原生建议列表 | Lightweight native suggestions where custom values remain valid and advanced popup behavior is unnecessary | Need reliable rich rendering, async states, or controlled keyboard behavior | `<input list="cities" /><datalist id="cities">…</datalist>` |
| Listbox / 列表框 | Options should remain visible; selection itself is the task; one or many choices | Space is constrained and the list should collapse | `role="listbox"` with `role="option"` |
| Multi-select / 多选选择器 | Multiple known values, compact field, selections summarized as chips or count | Users must compare every option simultaneously | `<MultiSelect renderValue="chips" />` |
| Checkbox group / 复选框组 | Small set where all choices and labels should be visible and independently comparable | Options are numerous or screen space is tight | `<fieldset>` with checkboxes |
| Grouped select / 分组选择器 | Flat selection with a small number of non-selectable category headings | Parent-child path matters or groups expand independently | `<optgroup>` or grouped listbox |
| Cascader / 级联选择器 | User chooses a path through predictable dependent levels, such as province/city/district | Hierarchy is irregular, deep, or needs arbitrary branch expansion | `<Cascader value={path} />` |
| Tree select / 树选择器 | Deep/irregular hierarchy; branches expand independently; one or many nodes may be chosen | The task is browsing files rather than setting a field value | `<TreeSelect nodes={nodes} />` |
| Transfer list / 穿梭框 | Bulk administration: move many items between available and selected sets while both remain visible | A normal form has few choices | `<TransferList selectedIds={ids} />` |
| Menu / 操作菜单 | A compact list of commands or functions | The interaction sets a required form value | `MenuItem onSelect={command}` |
| Context menu / 上下文菜单 | Commands apply to the object or location invoked by right-click/long-press | Commands are global or must always be discoverable | `<ContextMenu targetRef={ref}>` |
| Mentions input / 提及输入 | Rich text/plain text entry needs entity insertion after `@`, `#`, or another trigger | The whole field value must be one selected entity | `<Mentions prefix={["@","#"]} />` |

## 2. Boolean, exclusive, and mode controls

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Checkbox / 复选框 | Independent boolean included in a form or a set of options | Change takes effect immediately as a system setting | `<input type="checkbox">` |
| Tri-state checkbox / 三态复选框 | Parent summarizes children as all, none, or partially selected | There is no real mixed state | `checked` plus `indeterminate` visual/state handling |
| Switch / 开关 | Immediate on/off setting with visible current state | User submits several choices together later | `role="switch" aria-checked={value}` |
| Radio group / 单选按钮组 | Small mutually exclusive set; comparison and labels should remain visible | Switching changes content views rather than submitting a choice | `<fieldset>` with same-name radios |
| Segmented control / 分段控制器 | Two to five peer values or display modes in a compact space | Options navigate distinct sections or can be independently active | radio semantics or design-system segmented control |
| Content switcher / 内容切换器 | Alternate views of the same related content, such as grid/list or all/read/unread | Views are distinct information sections or routes | `<ContentSwitcher value="grid" />` |
| Tabs / 标签页 | Distinct peer content panels within one information hierarchy | It is a binary setting, a form choice, or a mere style switch | `tablist`, `tab`, `tabpanel` |
| Toggle button / 切换按钮 | One action-like mode can be pressed/unpressed, such as bold or favorite | It represents on/off system configuration | `<button aria-pressed={active}>` |
| Toggle button group / 切换按钮组 | Toolbar modes may allow one or multiple pressed buttons | It is a form answer requiring radio/checkbox semantics | group of `aria-pressed` buttons |

## 3. Text, numeric, and specialized entry

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Text field / 单行文本框 | Short unconstrained plain text | Multiple paragraphs or structured tokens are expected | `<input type="text">` |
| Textarea / 多行文本框 | Plain-text paragraphs, comments, or descriptions | Formatting or structured blocks are required | `<textarea rows={5}>` |
| Rich-text editor / 富文本编辑器 | Users need headings, emphasis, links, and lists in authored content | Plain text/Markdown is the product contract | `<RichTextEditor toolbar={…} />` |
| Markdown editor / Markdown 编辑器 | Technical users need portable source plus preview | Nontechnical users should not see markup | textarea/editor + preview |
| Search field / 搜索框 | Query retrieves or filters results; clear and submit behavior are meaningful | Field sets an entity/value rather than a query | `<form role="search">` |
| Number input / 数字输入框 | Exact numeric typing and validation matter | Value is an identifier, phone, postal code, or card number | `<input type="number" min max step>` |
| Spinbutton / 步进数字框 | Discrete numeric range benefits from increment/decrement controls | Range is broad/approximate or direct typing is rare | number input with stepper buttons |
| Slider / 单值滑块 | Approximate value over a continuum; immediate preview is useful | Exact value entry is important | `<input type="range">` plus output |
| Range slider / 双滑块范围 | Select min/max within one bounded continuum | Bounds need exact typing or are unbounded | multi-thumb range control |
| Currency input / 金额输入框 | Locale-aware decimal value with currency prefix/suffix | It is display-only money | raw numeric model + formatted presentation |
| Masked input / 掩码输入 | Format is fixed and positional, such as expiry or license pattern | Formatting varies by locale or user | masked text input with raw value separation |
| OTP/PIN input / 验证码输入 | Short fixed-length verification code; paste and autofill matter | It is a long secret/password | one semantic input styled as cells |
| Tag input / 标签输入 | Users create multiple free-form tokens | Tokens must come from controlled vocabulary | `<TagInput separators={["Enter"]} />` |
| Color picker / 颜色选择器 | User chooses a color visually and/or by exact code | Only a few branded colors are allowed | native `type="color"` or picker with HEX/RGB fields |
| Rating / 评分控件 | User supplies an ordinal preference, commonly 1–5 | Need a precise continuous metric or read-only KPI | radio-like `<Rating count={5} />` |

## 4. Date and time

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Native date/time input / 原生日期时间输入 | Simple form; device-native picker is acceptable; minimal dependency | Need cross-browser identical calendar, presets, or complex disabled rules | `type="date"`, `time`, `month`, `week`, `datetime-local` |
| Date picker / 日期选择器 | One calendar date with visual month navigation | User already knows exact date and keyboard typing is faster | editable input plus calendar dialog |
| Date range picker / 日期范围选择器 | One related start/end interval, such as booking or report period | Dates are independent or multiple disjoint dates | `<DateRangePicker value={{from,to}} />` |
| Multiple-date picker / 多日期选择器 | Several disjoint calendar dates | User needs a continuous interval | calendar `mode="multiple"` |
| Time picker / 时间选择器 | Time-of-day with fixed precision/step | Duration is being entered | `type="time"` or time list/spinner |
| Date-time picker / 日期时间选择器 | One timestamp; timezone and storage semantics are explicit | Date and time can be collected independently without ambiguity | `<DateTimePicker timezone="…" />` |
| Calendar view / 日历视图 | Browsing/scheduling events is the main task; surface remains visible | Only a date value is needed in a form | month/week/day calendar surface |
| Duration input / 时长输入 | Elapsed quantity such as 2h 30m, not clock time | User is selecting a time of day | grouped numeric fields with canonical seconds/minutes model |
| Recurrence editor / 重复规则编辑器 | Repeating schedules need frequency, interval, weekdays, end condition | One-off date/time | recurrence form producing RRULE-like data |

## 5. Actions and command density

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Primary button / 主要按钮 | One dominant action in a region | Several actions are equally important | `<button type="submit">` |
| Secondary/tertiary button / 次要或三级按钮 | Supporting or low-emphasis action | It navigates to another resource | button, not anchor |
| Link / 链接 | Navigation or opening a resource/route | In-place mutation or submission | `<a href="…">` |
| Icon button / 图标按钮 | Familiar compact action; accessible name can stay clear | Action is unfamiliar or label is important | `<button aria-label="…"><Icon /></button>` |
| Split button / 分割按钮 | One frequent default action plus closely related alternatives | No clearly dominant default exists | default button + adjacent menu trigger |
| Menu button / 菜单按钮 | Several actions fit behind one labeled trigger | Actions must remain immediately visible | button with menu popup |
| Overflow menu / 溢出菜单 | Low-frequency row/card/toolbar actions exceed available space | Primary action or destructive risk should be prominent | icon menu button, commonly ellipsis |
| Toolbar / 工具栏 | Related controls operate on the same canvas/table/editor | Controls are unrelated page navigation | `role="toolbar"` with roving focus if custom |
| Floating action button / 浮动操作按钮 | One high-frequency mobile/canvas creation action | Dense desktop layout or multiple peers | fixed/floating labeled icon button |

## 6. Navigation and location

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Top navigation / 顶部导航 | Few global destinations; horizontal space is stable | Many nested destinations or admin-scale IA | `<nav aria-label="主导航">` |
| Application header / 应用页头 | Shell combines identity, navigation trigger, search, and account actions | Only a list of destinations is needed | `<header><Logo/><PrimaryNav/><AccountMenu/></header>` |
| Persistent sidebar / 常驻侧边栏 | Desktop app with many destinations; navigation should remain visible | Narrow mobile screen or task needs maximum width | `<aside><nav>…` |
| Collapsible sidebar / 可折叠侧边栏 | Desktop density varies; icons remain recognizable in rail state | Labels are essential and icons ambiguous | expanded sidebar + labeled navigation rail |
| Navigation rail / 导航轨 | Three to seven high-level destinations in compact desktop/tablet layout | Deep hierarchy | narrow persistent nav with icons and labels/tooltips |
| Off-canvas navigation / 滑入导航 | Mobile or narrow screen; navigation is temporarily overlaid | Navigation must coexist with content | modal/overlay drawer from left |
| Dismissible navigation drawer / 可收起导航抽屉 | Desktop/tablet navigation opens and closes while content reflows | Background must become inert or screen is narrow | non-modal drawer + responsive layout |
| Multi-level sidebar / 多级侧边栏 | Complex hierarchy with parent groups | Only a few destinations or hierarchy is shallow | disclosures inside nav |
| Mega menu / 大型菜单 | Many discoverable destinations grouped under a global category | Commands or form values | wide navigation panel with grouped links |
| Bottom navigation / 底部导航栏 | Three to five top-level mobile destinations need thumb reach | Contextual actions or many destinations | bottom `nav` with current link |
| Local section navigation / 局部分区导航 | Sibling routes belong to one product area beneath global navigation | Views are in-memory panels on one route | labelled secondary `nav` |
| Breadcrumb / 面包屑 | Current location sits inside a hierarchy; users may jump upward | Sequence is process progress rather than location | ordered navigation links |
| Back link / 返回链接 | Clear parent or previous context matters, especially in master-detail flows | Users need arbitrary sibling access | stable parent URL or defined history action |
| Tree navigation / 树形导航 | Deep irregular destination hierarchy expands by branch | Nodes set a form value or tabular columns matter | tree inside labelled navigation region |
| Pagination nav / 页码导航 | Users need random access, stable URLs, and bounded result pages | Stream is exploratory or data changes rapidly | page links with current page |
| Table pagination / 表格分页栏 | Data table needs page size, item count, previous/next, possibly direct page | SEO/route navigation is the primary goal | pagination attached below table |
| Cursor/load more / 游标分页或加载更多 | Backend uses cursor; order may change; sequential continuation is enough | Users need arbitrary page jumps | explicit “加载更多” button |
| Infinite scroll / 无限滚动 | Exploratory feed and uninterrupted browsing | Goal-oriented search, comparison, footer access, or return-to-position risk | observer plus accessible load-more fallback |
| Stepper/wizard / 步骤条或向导 | Ordered task with discrete stages and a current step | Passive task completion percentage | ordered steps with `aria-current="step"` |
| Anchor navigation / 锚点目录 | Long single page with stable sections | Destinations are separate pages | same-page fragment links |
| Skip link / 跳过导航链接 | Keyboard users need to bypass repeated shell content | There is no repeated block before main content | focus-visible fragment link to `main` |
| Route tabs / 路由标签页 | Peer sections have stable URLs, history, and deep links | Panels switch only local in-memory content | links styled as tabs, `aria-current="page"` |
| Content tabs / 内容标签页 | Peer panels switch within one page context | Stable URLs and browser history matter | APG tablist/tab/tabpanel pattern |
| Workspace tabs / 工作区标签 | Multiple open documents require activate, close, dirty, reorder, and overflow states | Ordinary page sections are being switched | document tab strip with stable IDs |
| Previous-next navigation / 上一项下一项导航 | Known ordered content needs sequential movement | Random page access is important | `rel="prev"` and `rel="next"` links |
| Footer sitemap navigation / 页脚站点地图 | Broad informational site benefits from redundant grouped discovery | It would replace the primary navigation | grouped links in labelled footer `nav` |

## 7. Disclosure, view organization, and transition motion

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Disclosure / 展开收起 | One independent show/hide region | Several peer sections form a coordinated set | `<details><summary>` or disclosure button |
| Accordion / 手风琴 | Multiple stacked sections; one or many may expand | Peer content requires persistent tab-like navigation | set of disclosures with heading buttons |
| Collapse panel / 折叠面板 | Secondary controls/details need temporary vertical expansion in place | Content deserves a separate focused task | `<Collapsible>` |
| Tabs / 标签页 | Peer sections share one context and only one panel is visible | User is toggling display format | APG tabs pattern |
| Split view / 分栏视图 | Two related surfaces must be seen together, e.g. list-detail | Secondary content is brief or small-screen modal | adjacent regions |
| Resizable panels / 可调分栏 | Users benefit from allocating space between persistent panes | Layout should be fixed or touch simplicity matters | window splitter with keyboard support |
| Resizable inline side panel / 可调整行内侧面板 | Supplemental content must coexist with the main canvas and users need to allocate width | The panel may cover content, is temporary, or does not need resizing | persistent side pane + keyboard-operable separator; responsive overlay fallback |
| Carousel / 轮播 | Sequential visual browsing where only a subset is shown | Comparable data must be visible together; important content may be hidden | manual controls, pause, slide status |
| Expand-collapse reveal / 展开收起揭示动画 | Disclosure content changes height and the spatial reveal aids comprehension | Motion adds no information or reduced motion is requested | `aria-expanded` + grid/clip reveal, no hard-coded height |
| Fade transition / 淡入淡出 | Low-spatiality status, scrim, or decoration changes visibility | Users need to understand an origin or direction | opacity transition with reduced-motion fallback |
| Crossfade replacement / 交叉淡化切换 | Peer content replaces content in one stable container | Forward/back direction or object continuity matters | keyed crossfade inside stable region |
| Anchored scale-fade / 锚点缩放淡入 | Small menu/popover emerges from its trigger | Surface comes from a viewport edge or is unrelated to trigger | transform origin derived from anchor placement |
| Edge slide transition / 边缘滑入滑出 | Drawer/sheet enters from the edge where it conceptually lives | Direction has no spatial meaning | translate from the actual placement edge |
| Shared-axis transition / 共享轴切换 | Ordered peer views or wizard steps have forward/back direction | Views are unrelated or motion would distract | directional transition keyed by step |
| Container transform / 容器变换 | Visible card/object expands into its own detail surface | Source and destination do not share identity | morph from stable source ID to detail container |
| Layout-reorder transition / 布局重排动画 | Insert, remove, sort, filter, or drag changes item positions | Stable item identity is unavailable | stable keys + short layout animation |

## 8. Floating surfaces and task weight

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Tooltip / 工具提示 | Short non-interactive supplemental explanation on hover/focus | Contains links, buttons, or essential instructions | tooltip tied to trigger description |
| Toggletip / 可点击提示 | Small supplemental content must open on click and may contain a link | Multi-field task or rich controls | button-triggered lightweight popover |
| Popover / 弹出面板 | Anchored lightweight interactive content; context should remain visible | Task is complex/blocking or content is only a command list | `<Popover anchor={trigger}>` |
| Menu / 菜单 | Anchored list of actions with menu keyboard behavior | Arbitrary interactive layout or form | menu button + menuitems |
| Selection listbox popup / 选择列表弹层 | Select/combobox popup sets a controlled field value | Items execute commands | combobox owns a listbox popup |
| Picker popup / 选择器弹层 | Anchored calendar, color, emoji, or other specialized chooser | Generic action list or long form task | picker-specific grid/list semantics |
| Popconfirm / 气泡确认 | Low-risk, simple confirmation anchored to the initiating control | Destructive/irreversible action or explanation is long | small confirmation popover |
| Modal dialog / 模态对话框 | Focused, bounded task must block background interaction | Supplemental info should coexist with main content | focus trap, labelled dialog, restore focus |
| Alert dialog / 警告对话框 | Important message interrupts workflow and requires response | Ordinary form/task or passive status | `role="alertdialog"` with safe initial focus |
| Confirmation dialog / 确认对话框 | Short consequential decision needs object and consequence stated | Passive information or destructive action needs stronger warning | labelled modal with explicit cancel/confirm |
| Full-screen dialog / 全屏对话框 | Temporary immersive mobile or multi-field task cannot fit a small dialog | Task deserves a stable route | full viewport dialog with close/discard handling |
| Non-modal dialog / 非模态对话框 | Floating task must remain while background stays interactive | Simple anchored content or mobile spatial constraint | non-modal dialog with explicit close |
| Inline drawer / 行内抽屉 | Supplemental details/actions should coexist side-by-side with main content | Space is narrow or attention must be forced | drawer that shifts/resizes layout |
| Overlay drawer / 覆盖式抽屉 | Contextual secondary task needs more room and attention | Critical confirmation or very short hint | edge overlay, modal only when warranted |
| Bottom sheet / 底部弹层 | Touch-first actions/options/details on mobile | Desktop primary workflow or complex long form | bottom surface with safe-area and close gesture |
| Side sheet / 侧边弹层 | Wide supplementary workflow needs an edge surface with header/actions | Brief anchored controls or primary deep workflow | large edge surface, modal state explicit |
| Lightbox / 灯箱 | Focused media preview with next/previous/zoom | Editing metadata or completing a form | modal media viewer |
| Command palette overlay / 命令面板弹层 | Keyboard-first actions and destinations need a searchable modal surface | Domain data search is the task | modal combobox-like command list |
| Coach-mark overlay / 教学标注弹层 | One feature needs anchored first-use teaching | Ordered onboarding spans several targets | dismissible anchored teaching surface |

## 9. Notifications, help, and onboarding

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Field validation / 字段校验 | Error is tied to one field and should appear near it | Whole task/system failed | `aria-invalid` + described error |
| Inline notification / 行内通知 | Nondisruptive feedback/status belongs to a task flow and persists near content | Short global confirmation has no local anchor | inline alert/status region |
| Toast/snackbar / 轻提示 | Short, non-blocking result after an action; no critical detail | User must act, revisit, or compare details | live region; timed only when safe |
| Actionable notification / 可操作通知 | One follow-up action resolves or explores the message | Several actions or complex resolution | persistent inline/toast with one action |
| Callout / 说明提示块 | Contextual guidance loads with the page before action; persistent and not dismissible | It reports the result of an action | static callout near relevant content |
| Banner / 横幅通知 | Product/system-wide issue not specific to one task | Message belongs to one field or local panel | persistent page/site-level region |
| Alert / 警报 | Brief important message should be announced without taking focus | A response is required | `role="alert"` |
| Status / 状态消息 | Polite background update such as saved, synced, or results count | Urgent interruption | `role="status"` |
| Notification center / 通知中心 | Users need history, unread state, filtering, or later action | One ephemeral confirmation | persistent list/feed of notifications |
| Contextual help / 上下文帮助 | Optional explanation is tied to a field or concept | First-run sequence spans several targets | help link, toggletip, or popover |
| Coach mark / 教学提示 | One feature needs a targeted first-use explanation | Multi-step product walkthrough | anchored teaching popover with dismiss |
| Product tour / 产品导览 | Ordered onboarding spans several UI targets | One critical task should be learned by doing inline | `<Tour steps={steps} />`, skip and replay support |

## 10. Progress, loading, and measurement

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Determinate progress / 确定进度 | Meaningful completed/total work is known | Duration is unknown | `<progress value={done} max={total}>` |
| Indeterminate progress / 不确定进度 | Work is ongoing but remaining amount is unknown | A real percentage is available | `<progress>` without `value` |
| Spinner / 旋转加载 | Small local action or compact region is busy | Page structure is still unknown or wait is long | status text + spinner |
| Skeleton / 骨架屏 | Initial loading has stable predictable layout and perceived continuity matters | Layout/content shape is unknown or action is tiny | semantic container `aria-busy` + decorative skeleton |
| Inline loading / 行内加载 | Action changes state in place, e.g. saving a row/button | Whole surface is unavailable | button/row status with preserved label |
| Pending button / 按钮提交中 | One triggered action must prevent duplicate submission | Several regions or a background process are loading | preserve label/width + `aria-busy` + disabled |
| Local region loading / 局部区域加载 | One bounded panel is unavailable while the page remains usable | Final layout is stable enough for a skeleton | labelled region + local status/spinner |
| Route progress / 路由进度 | Navigation data loading replaces the page and exact progress is unknown | Only one local control is pending | top linear indeterminate progress |
| Row-card skeleton / 行卡片骨架 | Repeated item shape is stable and initial data is loading | Existing items remain usable during refresh | repeated decorative skeletons in busy region |
| Blocking surface loader / 阻塞式局部遮罩 | Interaction with one surface would be unsafe during a short operation | Controls can simply be disabled or background can stay usable | loader over bounded surface, not whole app |
| Optimistic pending / 乐观更新等待态 | Success is likely and rollback is safe | Failure is costly or state cannot be restored | update immediately + subtle pending + rollback |
| Background sync / 后台同步状态 | Existing content remains usable during refresh/sync | Stale content would be unsafe | keep content + polite timestamp/status |
| Load-more pending / 加载更多等待态 | Existing list stays visible while the next cursor page loads | Whole list is initial-loading | footer status + disabled load-more control |
| Pull-to-refresh / 下拉刷新 | Touch-first feed uses a familiar refresh gesture | Desktop-only workflow or no visible alternative exists | gesture indicator + accessible refresh path |
| Lazy-media placeholder / 延迟媒体占位 | Deferred image/video must reserve layout and avoid shift | Media is already available or dimensions unknown | fixed dimensions + blur/color placeholder |
| Streaming response / 流式响应状态 | Partial output is useful while more content arrives | Result is atomic and cannot be shown incrementally | visible chunks + `aria-busy` + generation status |
| Per-item queue progress / 分项队列进度 | Multiple uploads/jobs can retry, cancel, or fail independently | Operation is one atomic task | per-item states and progress, optional aggregate |
| Step progress / 阶段进度 | Named discrete stages communicate workflow position | Continuous completion percentage | ordered stage list |
| Meter/gauge / 计量表 | Read-only scalar within known range, e.g. storage or battery | Task completion over time | `<meter min max low high value>` |
| Result/status state / 结果状态 | Operation finished and next actions matter | Work is still in progress | success/error result panel |

## 11. Lists, tables, grids, and hierarchy

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Semantic list / 语义列表 | Items are one-dimensional and do not require column comparison | Values align into comparable fields | `<ul>`/`<ol>` |
| Description list / 描述列表 | Key-value facts for one entity | Many entities must be compared row-by-row | `<dl><dt><dd>` |
| Structured list / 结构化列表 | Rows have repeated secondary fields but remain primarily navigational/read-only | Column operations, headers, sorting, or editing matter | repeated row layout with clear headings |
| Static data table / 静态数据表 | Read-only tabular comparison; ordinary Tab order is acceptable | Spreadsheet-like cell navigation/editing is required | native `<table>` |
| Interactive data table / 交互数据表 | Rows support sort/filter/select/actions but cell-by-cell keyboard grid behavior is unnecessary | Dense editable cells require arrow-key navigation | semantic table plus controls |
| Data grid / 数据网格 | Spreadsheet-like interactive/editable cells, selection, copy/paste, arrow navigation | Data is mostly read-only; simpler table is sufficient | APG grid pattern with managed focus |
| Virtualized data grid / 虚拟化数据网格 | Spreadsheet-like grid behavior is required across enough rows/columns that windowing is necessary | It is only a large read-only table or all cells can render safely | preserve grid focus/row identity while windowing; expose total row/column counts |
| Tree view / 树形视图 | Hierarchical list with expand/collapse and node selection/navigation | Each node has comparable columns | APG tree pattern |
| Treegrid / 树形数据网格 | Hierarchical rows plus tabular columns and interactive cells | Hierarchy alone or flat data alone | APG treegrid pattern |
| Feed / 信息流 | New articles/items load as user scrolls and each item is a content region | Fixed dataset or tabular comparison | feed/article semantics and position restoration |
| Timeline / 时间线 | Chronological sequence and temporal relation are primary | Users need sortable columns or dense comparison | ordered list with `<time>` |
| Virtualized collection / 虚拟化集合 | Rendering thousands of rows/items is a measured bottleneck | Dataset is modest; native DOM improves accessibility/search | virtualization with stable keys and accessible counts |

## 12. Cards, tiles, identity, and compact status

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Base card/tile / 基础卡片 | Group short information and possibly internal actions | It needs one whole-card navigation target | `<article>` with explicit links/buttons |
| Clickable card/tile / 可点击卡片 | Entire surface navigates to one destination; no nested actions | Multiple independent actions exist | single stretched link/interactive target |
| Selectable card/tile / 可选择卡片 | Rich visual options such as plans; radio or checkbox selection model | Card navigates or triggers a command | radio/checkbox semantics over card group |
| Expandable card/tile / 可展开卡片 | Reveal secondary content inline while preserving context | Focused task or overlay is more appropriate | disclosure semantics; separate trigger if nested actions exist |
| KPI/stat card / 指标卡 | One metric, unit, period, and comparison are primary | Multiple rows/series require a chart/table | labelled article with value and delta |
| Persona / 人员信息条 | Avatar plus name, role, presence, and compact metadata identify a person | Only an image identity is needed | `<Persona avatar presence meta />` |
| Avatar / 头像 | Compact visual identity | More person context is necessary | image with meaningful alt or initials fallback |
| Badge / 徽标 | Small count/status attached to another object | Full explanation or action is required | text equivalent; do not rely on color |
| Tag/chip / 标签胶囊 | Categorization, filter token, input token, or removable entity | It is a binary setting or primary action | variant-specific semantics: static/button/remove |
| Status dot / 状态点 | Very compact presence/health paired with text | Color would be the only signal | dot hidden from AT + visible status label |

## 13. Search, filtering, and query construction

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| Global search / 全局搜索 | Query spans the whole product/site and is a primary discovery path | Only current component data is searched | prominent `role="search"`, route/results page |
| Page search / 页面搜索 | Query filters or retrieves within one page domain | Dataset is tiny and fully visible | page-level search form |
| Component/table search / 组件内搜索 | Query filters one table/list/tree | Search scope would be unclear outside the component | search inside labelled toolbar |
| Expandable search / 可展开搜索 | Toolbar space is constrained and search is secondary | Search is frequent or current query must remain visible | icon trigger expands into labelled field |
| Filter chips / 筛选标签 | Few common filters should be toggled quickly and remain visible | Many dimensions or complex operators | toggle/removable chips with clear selected state |
| Filter bar / 筛选栏 | Several high-frequency filters affect one result set | Filters are numerous/advanced and would overwhelm the page | compact fields + applied state + clear all |
| Faceted filter / 分面筛选 | Large catalog/search where counts by category help refinement | Data lacks stable facets | checkbox/range groups with result counts |
| Advanced filter drawer / 高级筛选抽屉 | Many optional filters need more space without leaving results | Filters must be constantly visible for comparison | drawer with apply/reset and dirty state |
| Query builder / 查询构建器 | Expert users combine fields, operators, groups, AND/OR rules | Ordinary users need a few simple filters | structured rules model and validation |
| Command palette / 命令面板 | Keyboard-first search across actions and destinations | User is searching domain data/content only | modal combobox/list of commands |

## 14. Upload, media, and generated content

| Subtype | Choose for this case | Reject or switch when | Implementation cue |
|---|---|---|---|
| File input / 文件选择器 | One/few files, simple form, no rich queue | Drag/drop, preview, retry, or progress is central | `<input type="file">` |
| Dropzone / 拖拽上传区 | Desktop workflow benefits from drag/drop and clear target | Mobile-only or simple one-file form | drop target plus clickable file input fallback |
| Upload queue / 上传队列 | Multiple files need per-file progress, retry, cancel, reorder | One atomic upload | list of file states with concurrency policy |
| Image crop uploader / 图片裁剪上传 | Output requires exact aspect/size, such as avatar | Original file must remain unmodified | upload → crop dialog → preview → confirm |
| Attachment list / 附件列表 | Existing files need download/remove/metadata | Files are visual media requiring preview grid | semantic list with explicit actions |
| Gallery / 画廊 | Multiple images are browsed and compared visually | Sequential storytelling is the main behavior | responsive grid + lightbox |
| Carousel / 轮播 | Sequential subset, featured media, or compact storytelling | All items must be discoverable/comparable at once | manual next/prev, indicators, no forced autoplay |
| Video player / 视频播放器 | Video is primary media; controls/captions matter | Static animated decoration | native video + captions/transcript |
| Audio waveform / 音频波形 | Scrubbing, recording, or input-level feedback benefits from time/amplitude visualization | Simple playback only | accessible player/meter plus visual waveform |
| QR code / 二维码 | Cross-device transfer or machine scan is the user task | Text/link can be clicked on the same device | QR plus human-readable fallback/action |
| Watermark / 水印 | Content ownership/classification must remain visible without blocking use | It is merely decorative branding | repeated non-interactive overlay, readable content preserved |

## Official calibration sources

- [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/): semantic and keyboard distinctions among combobox, listbox, menu, grid, table, tabs, tree, treegrid, tooltip, switch, and related widgets.
- [WAI-ARIA combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/): select-only versus editable/autocomplete variants and popup types.
- [MDN input reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input): native input types and `datalist` suggestion behavior.
- [MDN progress](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress) and [MDN meter](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter): task completion versus scalar measurement.
- [Carbon dropdown](https://carbondesignsystem.com/components/dropdown/usage/), [notification](https://carbondesignsystem.com/components/notification/usage/), [tile](https://carbondesignsystem.com/components/tile/usage/), [content switcher](https://carbondesignsystem.com/components/content-switcher/usage/), and [search](https://carbondesignsystem.com/components/search/usage/): scenario boundaries among visually similar variants.
- [Fluent 2 drawer](https://fluent2.microsoft.design/components/web/react/core/drawer/usage): inline versus overlay drawers and when a tooltip, popover, or dialog is more appropriate.
- [Ant Design component overview](https://ant.design/components/overview/), [Mentions](https://ant.design/components/mentions/), [Rate](https://ant.design/components/rate/), and [Tour](https://ant.design/components/tour/): additional production UI categories and specialized input/onboarding patterns.
