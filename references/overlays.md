# Overlay and floating-surface taxonomy

Use this reference when a request says “弹层 / popup”, “弹窗 / modal”, “气泡 / popover”, “抽屉 / drawer”, or “下拉面板 / dropdown”. First decide modality, anchoring, task weight, placement, and dismissal.

## Decision axes

- `Modal`: whether background content becomes inert and focus is contained.
- `Anchored`: whether the surface must stay spatially tied to a trigger or selection.
- `Task weight`: explanation, preview, command list, small control set, form task, consequential decision, or immersive media.
- `Placement`: adjacent to trigger, centered, viewport edge, bottom edge, or full screen.
- `Dismissal`: hover/focus exit, outside click, Escape, explicit close, submit/cancel, or swipe gesture.

Name both the trigger and surface role. “Dropdown” describes placement, not semantics.

## Anchored lightweight surfaces

### Tooltip — 工具提示

Short non-interactive supplemental text on hover and keyboard focus. Essential instructions must remain visible elsewhere.

```tsx
<Tooltip content="复制链接"><button aria-label="复制链接" onClick={copy}><LinkIcon /></button></Tooltip>
```

### Toggletip — 点击提示

Click-triggered small explanation that may contain a link. Use a button trigger; reject for multi-control tasks.

```tsx
<Toggletip label="什么是可用额度？"><p>额度每日更新。</p><a href="/help/quota">了解详情</a></Toggletip>
```

### Hover card — 悬停预览卡

Optional rich preview attached to a link or entity on hover/focus. The underlying destination must still work without it.

```tsx
<HoverCard trigger={<a href={`/users/${id}`}>{name}</a>}><UserPreview id={id} /></HoverCard>
```

### Interactive popover — 交互式气泡面板

Anchored lightweight controls that should preserve page context. Reject when the task is long, blocking, or needs complex validation.

```tsx
<Popover trigger={<button aria-expanded={open}>筛选</button>}><QuickFilters onApply={apply} /></Popover>
```

### Action menu / menu popup — 操作菜单 / 菜单弹层

Anchored list of commands with menu keyboard semantics. It does not set a required form value.

```tsx
<Menu trigger={<button aria-haspopup="menu">更多</button>}><MenuItem onSelect={rename}>重命名</MenuItem><MenuItem onSelect={archive}>归档</MenuItem></Menu>
```

### Selection popup / listbox popup — 选择列表弹层

Popup owned by a select or combobox. Options set the field value; do not call it a menu.

```tsx
<Combobox value={userId} onValueChange={setUserId} allowCustomValue={false}><ComboboxInput /><Listbox>{users.map(u=><Option value={u.id}>{u.name}</Option>)}</Listbox></Combobox>
```

### Picker popup — 选择器弹层

Anchored specialized chooser such as calendar, color palette, or emoji grid. Its role and keyboard model follow the chosen picker, not generic menu behavior.

```tsx
<DatePicker value={date} onValueChange={setDate} trigger={<button>{formatDate(date)}</button>} />
```

### Popconfirm — 气泡确认

Anchored binary confirmation for a low-to-medium-risk reversible action. Use an alert dialog for destructive, irreversible, or explanation-heavy decisions.

```tsx
<Popconfirm title="移出列表？" confirmLabel="移出" onConfirm={remove}><button>移出</button></Popconfirm>
```

## Dialogs and blocking tasks

### Modal task dialog — 模态任务对话框

Focused bounded task that blocks the background. Label it, contain focus, support Escape when safe, and restore focus to the trigger.

```tsx
<Dialog open={open} onOpenChange={setOpen} title="邀请成员"><InviteForm onCancel={()=>setOpen(false)} onSuccess={()=>setOpen(false)} /></Dialog>
```

### Confirmation dialog — 确认对话框

Short decision before a consequential action. State the object and consequence; avoid generic “确定吗”.

```tsx
<ConfirmDialog title="归档项目？" description="成员将无法继续编辑，可稍后恢复。" confirmLabel="归档" onConfirm={archive} />
```

### Alert dialog — 警告对话框

Interruptive message requiring a response, usually for destructive or safety-critical consequences. Give initial focus to the safest action when appropriate.

```tsx
<AlertDialog title="永久删除项目？" description="此操作无法撤销。" destructive confirmLabel="永久删除" onConfirm={destroy} />
```

### Full-screen dialog — 全屏对话框

Use on mobile or for an immersive multi-field task that cannot fit a small dialog but should remain a temporary layer. Reject when it deserves a stable route.

```tsx
<FullScreenDialog open={editing} title="编辑资料" onClose={confirmDiscard}><ProfileForm /></FullScreenDialog>
```

### Non-modal dialog — 非模态对话框

Floating movable task that remains open while background work continues, common in desktop tools. Reject for simple anchored content.

```tsx
<FloatingDialog modal={false} title="查找和替换" position={position} onMove={setPosition}><FindReplace /></FloatingDialog>
```

## Edge surfaces and large contextual panels

### Inline side panel — 行内侧面板

Persistent contextual content that reflows or resizes the main layout. It is not an overlay and background interaction stays available.

```tsx
<SplitView main={<Editor />} aside={inspectorOpen?<Inspector />:null} asideWidth={width} onResize={setWidth} />
```

### Overlay drawer — 覆盖式抽屉

Edge-entering contextual task that covers content. State whether it is modal; use for details or editing that benefit from page context.

```tsx
<Drawer side="right" modal open={open} onOpenChange={setOpen} title="订单详情"><OrderDetails id={orderId} /></Drawer>
```

### Side sheet — 侧边弹层

Wide edge surface for supplementary workflows, often with a header and actions. Use a full route when the task becomes primary or deeply nested.

```tsx
<SideSheet open={open} width="large" title="高级筛选" actions={<ApplyReset />}><AdvancedFilters /></SideSheet>
```

### Standard bottom sheet — 标准底部弹层

Touch-first compact choices or details rising from the bottom. Content height is bounded and dismissal is simple.

```tsx
<BottomSheet open={open} onOpenChange={setOpen}><ShareActions /></BottomSheet>
```

### Modal bottom sheet — 模态底部弹层

Mobile task requiring focused attention and a scrim. Support safe-area insets, explicit close, and optional swipe dismissal only when data loss is impossible.

```tsx
<BottomSheet modal open={open} snapPoints={[0.5,0.9]} dismissible={!dirty} onOpenChange={setOpen}><EditFilters /></BottomSheet>
```

## Specialized overlay experiences

### Lightbox / media viewer — 灯箱 / 媒体查看器

Immersive image/video inspection with previous/next, zoom, close, and position status. Reject for metadata editing.

```tsx
<Lightbox images={images} index={index} open={open} onIndexChange={setIndex} onClose={()=>setOpen(false)} zoomable />
```

### Command palette — 命令面板

Usually a modal combobox-like surface for keyboard-first actions and destinations. It is neither a generic dialog nor domain-data search.

```tsx
<CommandPalette open={open} shortcut="Mod+K" commands={commands} onSelect={runCommand} />
```

### Coach mark — 教学标注弹层

Anchored onboarding explanation for one feature. Keep it dismissible and replayable; use a product tour only for an ordered multi-step sequence.

```tsx
<CoachMark targetRef={exportButtonRef} open={firstVisit} title="导出报表" onDismiss={completeHint}>可选择 CSV 或 Excel。</CoachMark>
```

### Toast / snackbar — 轻提示 / 消息条

Transient non-modal feedback after an action. It may visually float, but it is not a task surface and must not contain critical decisions.

```tsx
toast.success('已保存', {action:{label:'撤销',onClick:undo}, duration:5000})
```

## Dismissal and focus contract

- Anchored surfaces return focus to their trigger after keyboard dismissal.
- Modal surfaces make the background inert, contain focus, and restore focus on close.
- Outside-click dismissal must not be the only exit path; provide Escape and/or an explicit close action.
- Do not allow swipe-to-dismiss when it can silently discard user input.
- Avoid nested modal dialogs. Replace the inner task with an in-dialog step or a new route.

## Calibration sources

- [WAI-ARIA APG dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) for modal focus containment, labelling, and focus restoration.
- [WAI-ARIA APG menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) for command-menu semantics and keyboard behavior.
- [WAI-ARIA APG tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) for non-interactive supplemental descriptions.
- [Carbon modal usage](https://carbondesignsystem.com/components/modal/usage/) for task weight, focus, and loading inside a modal.
- [Fluent 2 drawer usage](https://fluent2.microsoft.design/components/web/react/core/drawer/usage) for inline versus overlay drawers.
