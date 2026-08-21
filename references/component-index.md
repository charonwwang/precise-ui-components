# Component family index

This file is routing-only. It contains no component subtype definitions. Read the one family file matching the user task; load a second family only when the decision crosses a real semantic boundary.

| Family | Use when the vague request concerns | Reference |
|---|---|---|
| Selection and suggestion controls / 选择与建议控件 | value model, controlled versus free value, option count, hierarchy, and popup behavior | [selection.md](components/selection.md) |
| Boolean and mode controls / 布尔与模式控件 | boolean versus exclusive value, immediate effect versus form submission, and value choice versus view switching | [boolean-and-mode-controls.md](components/boolean-and-mode-controls.md) |
| Text, numeric, and specialized inputs / 文本、数值与专用输入 | data type, free-form versus structured value, precision, formatting, validation, and tokenization | [text-and-numeric-inputs.md](components/text-and-numeric-inputs.md) |
| Date and time controls / 日期与时间控件 | date versus time versus duration, single value versus range, recurrence, precision, timezone, and native versus custom picker | [date-and-time.md](components/date-and-time.md) |
| Buttons, actions, and commands / 按钮、操作与命令 | navigation versus mutation, action priority, command density, default action, and destructive consequence | [buttons-and-commands.md](components/buttons-and-commands.md) |
| Navigation / 导航 | destination scope, route versus view change, hierarchy, persistence, history, and device context | [navigation.md](components/navigation.md) |
| Disclosure and expandable content / 展开收起与内容披露 | single versus coordinated regions, independent versus exclusive expansion, content size, persistence, and nested interaction | [disclosure.md](components/disclosure.md) |
| Overlays and floating surfaces / 弹层与浮动表面 | modality, anchoring, task weight, placement, background interaction, dismissal, and focus restoration | [overlays.md](components/overlays.md) |
| Notifications and feedback / 通知与反馈 | scope, urgency, persistence, interruption, required action, and announcement behavior | [notifications-and-feedback.md](components/notifications-and-feedback.md) |
| Help and onboarding / 帮助与引导 | contextual versus sequenced guidance, first-use versus persistent help, target anchoring, dismissal, replay, and user progress | [help-and-onboarding.md](components/help-and-onboarding.md) |
| Motion and transitions / 动效与转场 | state relation, spatial origin, continuity, direction, interruption, duration, and reduced-motion preference | [motion.md](components/motion.md) |
| Loading and progress / 加载与进度 | scope, known versus unknown progress, stable versus unknown layout, blocking behavior, duration, and recoverability | [loading-and-progress.md](components/loading-and-progress.md) |
| Lists, tables, grids, and trees / 列表、表格、网格与树 | one-dimensional versus tabular data, read-only versus interactive cells, hierarchy, navigation model, and virtualization threshold | [lists-tables-trees.md](components/lists-tables-trees.md) |
| Cards, identity, and compact status / 卡片、身份与紧凑状态 | grouping, whole-surface action, selection, expansion, identity density, and compact status semantics | [cards-identity-and-status.md](components/cards-identity-and-status.md) |
| Search, filtering, and query construction / 搜索、筛选与查询构建 | query scope, retrieval versus local filtering, filter complexity, expert operators, result count, and persistence | [search-filtering-and-query.md](components/search-filtering-and-query.md) |
| File selection and upload / 文件选择与上传 | file count, drag and drop, preview, validation, per-item progress, retry, cancellation, and post-upload editing | [file-upload.md](components/file-upload.md) |
| Media and authored content / 媒体与内容创作 | browse versus play versus edit, sequence versus comparison, accessibility alternatives, controls, and generated content state | [media-and-content.md](components/media-and-content.md) |
| Layout and containers / 布局与容器 | page shell, spatial relationship, resizing, flow direction, responsive collapse, scrolling, and sticky behavior | [layout-and-containers.md](components/layout-and-containers.md) |
| Forms and validation / 表单与校验 | field grouping, submission scope, validation timing, error location, required state, help association, and action placement | [forms-and-validation.md](components/forms-and-validation.md) |
| Data visualization / 数据可视化 | comparison goal, dimensionality, time series, composition, distribution, precision, interaction, and text/table fallback | [data-visualization.md](components/data-visualization.md) |

## Cross-family decision protocol

1. Identify the user goal and value/state change.
2. Route to one family file.
3. Choose a subtype from its decision table.
4. State the chosen Chinese/English term and reject the closest sibling variants.
5. Load `framework-adaptation.md` only when implementation must match a repository or named framework.
