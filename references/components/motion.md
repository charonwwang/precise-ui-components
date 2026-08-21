# Motion and transitions / 动效与转场

This file defines exactly one component family. Select subtypes by state relation, spatial origin, continuity, direction, interruption, duration, and reduced-motion preference.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Fade transition / 淡入淡出 | Low-spatiality status, scrim, or decoration changes visibility | Users need to understand an origin or direction | `opacity transition with reduced-motion fallback` |
| Anchored scale-fade / 锚点缩放淡入 | Small menu/popover emerges from its trigger | Surface comes from a viewport edge or has no meaningful anchor | `transform origin derived from anchor placement` |
| Crossfade replacement / 交叉淡化切换 | Peer content replaces content in one stable container | Forward/back direction or object continuity matters | `keyed crossfade inside stable region` |
| Edge slide transition / 边缘滑入滑出 | Drawer/sheet enters from the edge where it conceptually lives | Direction has no spatial meaning | `translate from the actual placement edge` |
| Shared-axis transition / 共享轴切换 | Ordered peer views or wizard steps have forward/back direction | Views are unrelated or motion would distract | `directional transition keyed by step` |
| Layout-reorder transition / 布局重排动画 | Insert, remove, sort, filter, or drag changes item positions | Stable item identity is unavailable | `stable keys + short layout animation` |
| Expand-collapse reveal / 展开收起揭示动画 | Disclosure content changes height and spatial reveal aids comprehension | Motion adds no information or reduced motion is requested | `aria-expanded` + grid/clip reveal, no hard-coded height |
| Container transform / 容器变换 | A visible object expands into its detail surface and identity continuity matters | Source and destination do not share identity | `morph from stable source ID to detail container` |

## Detailed variants

### Instant state change / no transition — 即时切换 / 无动画

Use when motion adds no spatial explanation, latency is already noticeable, or reduced motion is requested.

```tsx
<section hidden={!open} id="details">{details}</section>
```

### Expand/collapse reveal — 展开/收起揭示动画

Use for disclosure, accordion, expandable row, or collapsible panel. Animate clipped size/opacity without hard-coded content height; state remains controlled by `aria-expanded`.

```tsx
<><button aria-expanded={open} aria-controls="advanced" onClick={()=>setOpen(!open)}>高级设置</button><div id="advanced" data-open={open} className="reveal"><AdvancedSettings /></div></>
```

```css
.reveal{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows 180ms ease,opacity 140ms ease}.reveal[data-open=true]{grid-template-rows:1fr;opacity:1}.reveal>*{overflow:hidden}@media(prefers-reduced-motion:reduce){.reveal{transition:none}}
```

### Fade in/out — 淡入淡出

Use for low-spatiality visibility changes such as scrims, status messages, or small decoration. Reject when users need to understand movement from an origin.

```tsx
<Transition show={visible} enter="fade-in" leave="fade-out"><StatusMessage /></Transition>
```

### Crossfade replacement — 交叉淡化切换

Use when peer content replaces content in the same stable container and spatial direction is irrelevant.

```tsx
<Crossfade key={viewKey}><ResultView mode={viewKey} /></Crossfade>
```

### Edge slide transition — 边缘滑入/滑出

Use for drawers and sheets whose physical edge conveys where the surface lives. Do not use a slide direction unrelated to placement.

```tsx
<Drawer side="right" motion="slide" open={open} onOpenChange={setOpen}><Inspector /></Drawer>
```

### Anchored scale-and-fade — 锚点缩放淡入

Use for a small popover or menu emerging from its trigger. Derive transform origin from actual placement; motion does not define the popup's menu, listbox, or popover semantics.

```tsx
<Popover motion="scale-fade" transformOrigin="anchor" trigger={<button>更多</button>}><Actions /></Popover>
```

### Scrim fade — 遮罩淡入淡出

Use with modal surfaces to communicate background de-emphasis. It accompanies the dialog/sheet motion and is never the focus target.

```tsx
<Modal open={open}><Scrim motion="fade" /><DialogSurface motion="scale-fade"><Task /></DialogSurface></Modal>
```

### Shared-axis navigation transition — 共享轴页面切换

Use for ordered peer views where forward/back direction matters, such as wizard steps. Reject when direction or relationship is unknown.

```tsx
<SharedAxisTransition direction={next?'forward':'back'} transitionKey={step}><WizardStep index={step} /></SharedAxisTransition>
```

### Layout/reorder transition — 布局重排动画

Use after drag, sort, filter, insert, or remove to preserve item identity. Keep duration short and stable keys mandatory.

```tsx
<MotionList layout>{items.map(item=><MotionItem layout key={item.id}>{item.label}</MotionItem>)}</MotionList>
```

### Drag feedback — 拖拽反馈动画

Use lift, placeholder, and drop-settle cues during direct manipulation. Always provide a keyboard alternative for reordering.

```tsx
<SortableList items={items} renderOverlay={item=><DragPreview item={item} />} keyboardReorder onReorder={setItems} />
```

### Container transform — 容器变换

Use when one visible object clearly expands into its detail surface and preserving identity improves comprehension.

```tsx
<ContainerTransform fromId={`card-${id}`} open={open}><DetailPanel id={id} /></ContainerTransform>
```
