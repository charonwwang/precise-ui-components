# Overlays and floating surfaces / 弹层与浮动表面

This file defines exactly one component family. Select subtypes by modality, anchoring, task weight, placement, background interaction, dismissal, and focus restoration.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Tooltip / 工具提示 | Short non-interactive supplemental explanation on hover/focus | Contains links, buttons, or essential instructions | `tooltip tied to trigger description` |
| Toggletip / 可点击提示 | Small supplemental content must open on click and may contain a link | Multi-field task or rich controls | `button-triggered lightweight popover` |
| Popover / 弹出面板 | Anchored lightweight interactive content; context should remain visible | Task is complex/blocking or content is only a command list | `<Popover anchor={trigger}>` |
| Selection listbox popup / 选择列表弹层 | Select/combobox popup sets a controlled field value | Items execute commands | `combobox owns a listbox popup` |
| Picker popup / 选择器弹层 | Anchored calendar, color, emoji, or other specialized chooser | Generic action list or long form task | `picker-specific grid/list semantics` |
| Popconfirm / 气泡确认 | Low-risk, simple confirmation anchored to the initiating control | Destructive/irreversible action or explanation is long | `small confirmation popover` |
| Modal dialog / 模态对话框 | Focused, bounded task must block background interaction | Supplemental info should coexist with main content | `focus trap, labelled dialog, restore focus` |
| Alert dialog / 警告对话框 | Important message interrupts workflow and requires response | Ordinary form/task or passive status | `role="alertdialog"` with safe initial focus |
| Confirmation dialog / 确认对话框 | Short consequential decision needs object and consequence stated | Passive information or destructive action needs stronger warning | `labelled modal with explicit cancel/confirm` |
| Full-screen dialog / 全屏对话框 | Temporary immersive mobile or multi-field task cannot fit a small dialog | Task deserves a stable route | `full viewport dialog with close/discard handling` |
| Non-modal dialog / 非模态对话框 | Floating task must remain while background stays interactive | Simple anchored content or mobile spatial constraint | `non-modal dialog with explicit close` |
| Overlay drawer / 覆盖式抽屉 | Contextual secondary task needs more room and attention | Critical confirmation or very short hint | `edge overlay, modal only when warranted` |
| Bottom sheet / 底部弹层 | Touch-first actions/options/details on mobile | Desktop primary workflow or complex long form | `bottom surface with safe-area and close gesture` |
| Side sheet / 侧边弹层 | Wide supplementary workflow needs an edge surface with header/actions | Brief anchored controls or primary deep workflow | `large edge surface, modal state explicit` |
| Lightbox / 灯箱 | Focused media preview with next/previous/zoom | Editing metadata or completing a form | `modal media viewer` |

## Detailed variants

### Toggletip — 可点击提示

Use a button-triggered lightweight explanation when hover-only tooltip behavior is insufficient or the content contains a link. Use a popover for richer controls.

```tsx
<Toggletip trigger={<button aria-label="了解税率计算">?</button>}><p>税率按账单地址计算。</p><a href="/tax">了解更多</a></Toggletip>
```

### Tooltip — 工具提示

Short non-interactive supplemental text on hover and keyboard focus. Essential instructions must remain visible elsewhere.

```tsx
<Tooltip content="复制链接"><button aria-label="复制链接" onClick={copy}><LinkIcon /></button></Tooltip>
```

### Popover — 气泡卡片 / 弹出面板

Lightweight interactive content anchored to a trigger.

```tsx
<Popover trigger={<button aria-expanded={open}>筛选</button>}><FilterForm onApply={applyFilters} /></Popover>
```

### Modal dialog — 模态对话框

Focused task that blocks background interaction; trap focus and restore it on close.

```tsx
<Dialog open={open} onOpenChange={setOpen} title="邀请成员"><InviteForm onSuccess={()=>setOpen(false)} /></Dialog>
```

### Alert dialog — 警告对话框 / 确认对话框

Interruptive confirmation for consequential actions.

```tsx
<AlertDialog open={confirming} title="删除项目？" description="删除后无法恢复。" confirmLabel="删除" destructive onConfirm={remove} />
```

### Drawer — 抽屉

Slides from an edge for secondary details or a contained task while preserving page context.

```tsx
<Drawer side="right" open={open} onOpenChange={setOpen} title="订单详情"><OrderDetails id={orderId} /></Drawer>
```

### Bottom sheet — 底部弹层

Touch-oriented mobile surface rising from the bottom; support swipe/close and safe-area insets.

```tsx
<BottomSheet open={open} onOpenChange={setOpen} snapPoints={[0.45,0.9]}><ShareActions /></BottomSheet>
```

### Hover card — 悬停卡片

Rich preview opened by hover/focus, usually non-essential and lightly interactive.

```tsx
<HoverCard trigger={<a href={`/users/${id}`}>{name}</a>}><UserPreview id={id} /></HoverCard>
```

### Lightbox — 灯箱 / 图片预览层

```tsx
<Lightbox images={images} index={index} open={open} onClose={()=>setOpen(false)} zoomable />
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

### Lightbox / media viewer — 灯箱 / 媒体查看器

Immersive image/video inspection with previous/next, zoom, close, and position status. Reject for metadata editing.

```tsx
<Lightbox images={images} index={index} open={open} onIndexChange={setIndex} onClose={()=>setOpen(false)} zoomable />
```
