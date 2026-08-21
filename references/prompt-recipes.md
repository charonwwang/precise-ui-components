# High-precision UI prompt recipes

## Component specification template

Use only fields that change the result:

```text
在现有项目中实现【中文名 / English component】【精确变体】。

用途与数据：
- 用户任务：...
- 候选项/数据结构：...
- 单选、多选或自由输入：...

交互：
- 触发和关闭：...
- 键盘：...
- 异步加载、防抖、分页：...
- 提交值与显示值：...

状态：默认、hover、focus-visible、selected、disabled、loading、empty、error。
约束：复用现有组件库和设计 token；不新增依赖；适配窄屏；保持语义 HTML 与无障碍名称。
验收：列出并验证关键交互，不只完成静态外观。
```

## Vague-to-precise examples

### “做一个下拉框”

Ask or infer these axes: values known or free-form; single or multiple; flat or hierarchical; local or remote; form value or action menu.

Precise version:

```text
实现可搜索单选选择器（searchable single-select）。选项来自已有 users 接口；输入 2 个字符后 250ms 防抖过滤；只能提交候选项的 user.id，触发器回显 avatar + name。面板包含 loading、empty、error 与 retry；Enter 选择、Esc 关闭、方向键移动；选择后关闭并把焦点还给触发器。
```

### “做一个时间选择”

Clarify date vs time vs date-time vs range, timezone, precision, constraints, and storage format.

```text
实现日期时间范围选择器（date-time range picker）。界面按 zh-CN 和周一作为一周起始；时间步长 15 分钟；结束时间必须晚于开始时间；显示 Asia/Shanghai，本地状态使用 ISO 8601 含时区偏移；提供“今天”“未来 7 天”快捷范围。
```

### “加一个侧边栏”

Clarify persistent/collapsible/off-canvas, hierarchy, active route, and responsive behavior.

```text
实现响应式可折叠侧边栏（responsive collapsible sidebar）。桌面宽 240px，收起为 64px navigation rail，仅保留图标但提供 tooltip 与 aria-label；移动端改为左侧 off-canvas navigation drawer。支持二级父菜单展开、当前路由高亮、刷新后保留展开状态；Esc 关闭移动端抽屉并恢复触发器焦点。
```

### “加个加载动画”

Select feedback by information availability and layout stability.

```text
首屏数据加载使用结构匹配的 skeleton screen；后续分页使用按钮内 spinner；文件上传使用 determinate linear progress，直接绑定 uploadedBytes / totalBytes。禁止用伪造百分比表示未知时长，prefers-reduced-motion 下关闭 shimmer。
```

### “弹个框确认”

```text
删除操作使用 destructive alert dialog，不是普通 toast。标题明确对象名，正文说明不可恢复；默认焦点放在“取消”，确认按钮文案为“删除项目”；确认期间按钮显示 loading 并防重复提交；成功后关闭并把焦点移到合理位置，失败则保持对话框并显示行内错误。
```

## Review checklist

- Does the name describe role rather than appearance alone?
- Is the selection model explicit: action, single value, multiple values, or free text?
- Is the data source and submitted value clear?
- Are anchoring, placement, opening, dismissal, and focus restoration defined for floating UI?
- Are loading, empty, error, disabled, overflow, and narrow-screen behavior defined?
- Are keyboard and accessible name/description relationships preserved?
- Does the implementation reuse current project primitives and tokens?
- Are motion and decoration subordinate to task completion?

## Common terminology corrections

| Ambiguous phrase | Prefer | Reason |
|---|---|---|
| 下拉框 | select, combobox, dropdown menu, popover, or date picker | These have different roles and keyboard behavior. |
| 弹窗 | modal dialog, alert dialog, popover, toast, drawer, or bottom sheet | Modality and task weight differ. |
| 输入框 | text field, search field, textarea, number input, tag input, or combobox | Value model differs. |
| 进度条 | determinate/indeterminate linear progress, circular progress, stepper, spinner, or skeleton | Information content differs. |
| 列表 | semantic list, data table, feed, tree view, listbox, or menu | Structure and interaction differ. |
| 按钮组 | button group, segmented control, radio group, toolbar, or split button | Selection and action semantics differ. |
| 侧边栏 | persistent sidebar, collapsible rail, multi-level sidebar, off-canvas navigation, or drawer | Layout and responsive behavior differ. |
| 日期框 | date input, date picker, date range picker, calendar, or date-time picker | Granularity and selection count differ. |

## Source calibration

The motivating Douyin series uses these useful terms: select, multi-select, grouped select, cascader, split button, mega menu, date picker; floating, curved-wheel, multi-level, collapsible, and hidden/off-canvas sidebars; smooth/determinate, stepped, circular, liquid-gauge, syncing, radar, typing-dot, and audio-wave progress indicators. Normalize transcription variants to established frontend terminology before implementation.
