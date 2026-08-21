# Motion, disclosure animation, and loading taxonomy

Motion is a behavior specification, not a substitute for the underlying component name. First select the semantic component, then choose the smallest transition that explains the state change. Loading feedback is selected separately by scope, duration, and whether progress is measurable.

## Motion decision axes

- `State relation`: same element changes state, content is revealed, a surface enters, peers reorder, or navigation changes context.
- `Spatial origin`: anchored trigger, viewport edge, parent container, or no meaningful origin.
- `Continuity`: preserve object identity, explain hierarchy, or simply acknowledge replacement.
- `Interruption`: background remains usable or becomes blocked.
- `User preference`: every nonessential animation must respect `prefers-reduced-motion`.

## Disclosure and state-change motion

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

### Accordion chevron rotation — 手风琴箭头旋转

Use as a secondary state cue paired with the label and expanded state; never rely on icon direction alone.

```tsx
<button aria-expanded={open} onClick={toggle}><Chevron aria-hidden className="chevron" />账单设置</button>
```

```css
.chevron{transition:transform 160ms ease}[aria-expanded=true] .chevron{transform:rotate(90deg)}@media(prefers-reduced-motion:reduce){.chevron{transition:none}}
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

### Anchored scale-and-fade — 锚点缩放淡入

Use for a small popover/menu emerging from its trigger. Set transform origin from actual placement and preserve focus behavior.

```tsx
<Popover motion="scale-fade" transformOrigin="anchor" trigger={<button>更多</button>}><Actions /></Popover>
```

### Edge slide transition — 边缘滑入/滑出

Use for drawers and sheets whose physical edge conveys where the surface lives. Do not use a slide direction unrelated to placement.

```tsx
<Drawer side="right" motion="slide" open={open} onOpenChange={setOpen}><Inspector /></Drawer>
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

### Container transform — 容器变换

Use when one visible object clearly expands into its detail surface and preserving identity improves comprehension. Reject for unrelated pages or large layout changes.

```tsx
<ContainerTransform fromId={`card-${id}`} open={open}><DetailPanel id={id} /></ContainerTransform>
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

## Loading and pending-state decision axes

- `Scope`: button/field, row/card, region, page, modal task, background process, or multi-item queue.
- `Knowledge`: determinate completed/total work, named stages, or unknown duration.
- `Layout`: known stable shape, unknown shape, or existing content that should remain visible.
- `Blocking`: whether users can safely continue elsewhere.
- `Duration`: avoid flashing indicators for near-instant work; preserve text/context for longer waits.

## Loading feedback subtypes

### Pending button — 按钮提交中状态

Use for one triggered action. Preserve the label/width, disable duplicate submission, and announce the pending state.

```tsx
<button disabled={saving} aria-busy={saving} onClick={save}>{saving?<><Spinner aria-hidden />保存中…</>:'保存'}</button>
```

### Inline saving status — 行内保存状态

Use when one field, row, or small editor saves without blocking its surroundings.

```tsx
<span role="status">{state==='saving'?'正在保存…':state==='saved'?'已保存':state==='error'?'保存失败':''}</span>
```

### Local region spinner — 局部区域加载指示器

Use when a bounded region is empty/unavailable and its final layout is not predictable. Keep the rest of the page interactive.

```tsx
<section aria-busy={loading} aria-label="订单详情">{loading?<div role="status"><Spinner aria-hidden />加载订单…</div>:<OrderDetails />}</section>
```

### Page/route progress bar — 页面/路由顶部进度条

Use for navigation or route data loading when content replacement is imminent and exact progress is unknown.

```tsx
<RouteProgress active={navigationState==='loading'} aria-label="正在打开页面" />
```

### Page skeleton — 页面骨架屏

Use for initial loading when the page structure is stable and recognizable. Decorative shapes are hidden from assistive technology while the region exposes `aria-busy`.

```tsx
<main aria-busy="true" aria-label="正在加载项目"><PageHeaderSkeleton /><CardGridSkeleton count={6} /></main>
```

### Row/card skeleton — 行/卡片骨架

Use for a known repeated-item shape. Match actual density and avoid fabricating content-like details.

```tsx
<ul aria-busy="true" aria-label="正在加载消息">{Array.from({length:5},(_,i)=><li key={i} aria-hidden><AvatarSkeleton /><TextSkeleton lines={2} /></li>)}</ul>
```

### Shimmer skeleton — 微光骨架屏

Use only when motion meaningfully signals loading; fall back to a static skeleton under reduced motion.

```tsx
<Skeleton animation={reducedMotion?'none':'shimmer'} aria-hidden />
```

### Indeterminate linear progress — 线性不确定进度

Use for a broad region or process with unknown remaining work. Never display a fabricated percentage.

```tsx
<div role="progressbar" aria-label="正在同步" className="indeterminate-progress" />
```

### Determinate progress bar — 确定进度条

Use when completed and total work are meaningful, such as bytes uploaded or records processed.

```tsx
<><progress value={completed} max={total}>{percent}%</progress><output>{completed}/{total}（{percent}%）</output></>
```

### Circular determinate progress — 环形确定进度

Use in compact areas when a real percentage is known. Always include a numeric text equivalent.

```tsx
<CircularProgress value={percent} aria-label={`处理进度 ${percent}%`}><span>{percent}%</span></CircularProgress>
```

### Named-stage progress — 分阶段进度

Use when users benefit from knowing which discrete phase is active; reject if the labels imply a false sequence.

```tsx
<ol aria-label="导入阶段">{stages.map((s,i)=><li aria-current={i===stage?'step':undefined} data-complete={i<stage}>{s}</li>)}</ol>
```

### Blocking overlay loader — 阻塞式遮罩加载

Use only when interaction with a bounded surface would be unsafe during a short operation. Prefer disabling the affected controls over blocking the whole page.

```tsx
<DialogBody aria-busy={processing}>{children}{processing&&<div className="surface-loader" role="status"><Spinner />正在提交…</div>}</DialogBody>
```

### Optimistic pending state — 乐观更新等待态

Use when success is highly likely and rollback is safe. Show a subtle pending marker and restore the previous state on failure.

```tsx
<Toggle pressed={optimisticValue} data-pending={mutation.pending} onPressedChange={next=>mutateOptimistically(next)} />
```

### Background sync status — 后台同步状态

Use when existing content remains usable while refresh/sync continues. Do not replace usable content with a spinner.

```tsx
<header><h2>报告</h2><span role="status">{syncing?'正在后台同步…':`更新于 ${updatedAt}`}</span></header>
```

### Load-more pending row — 加载更多等待行

Use at the end of a list/feed while preserving already loaded items and scroll position.

```tsx
<><ItemList items={items} />{loadingMore&&<div role="status">正在加载更多…</div>}<button disabled={loadingMore||!hasMore} onClick={loadMore}>加载更多</button></>
```

### Pull-to-refresh indicator — 下拉刷新指示器

Use in touch-first feeds with a familiar gesture, but retain a visible refresh action or automatic refresh path.

```tsx
<PullToRefresh onRefresh={refresh} indicator={distance=><RefreshIndicator progress={distance/threshold} />}><Feed /></PullToRefresh>
```

### Lazy-media placeholder — 延迟媒体占位

Use for images/video loaded after layout. Reserve dimensions to prevent layout shift and expose meaningful alt text on the final media.

```tsx
<ProgressiveImage src={src} width={640} height={360} placeholder={blurDataUrl} alt={alt} />
```

### Streaming response indicator — 流式响应指示器

Use when partial output is already useful. Keep rendered content visible and distinguish “正在生成” from a typing simulation.

```tsx
<article aria-busy={!done}>{chunks.join('')}{!done&&<span role="status">正在生成回答…</span>}</article>
```

### Per-item upload/processing queue — 分项上传/处理队列

Use when multiple items can succeed, fail, retry, or cancel independently. Prefer per-item progress over one ambiguous global spinner.

```tsx
<UploadQueue files={files} renderStatus={file=><progress value={file.sent} max={file.size} />} onRetry={retry} onCancel={cancel} />
```

## Timing and accessibility boundaries

- Do not flash a spinner for near-instant work; a short reveal delay and minimum visible duration can prevent flicker, but never delay the actual result.
- Keep existing content visible during background refresh unless stale content would be unsafe.
- Never replace a known determinate value with decorative indefinite motion.
- Pause or remove nonessential continuous animation under `prefers-reduced-motion: reduce`.
- Loading indicators require meaningful status text; animation alone is not an accessible announcement.

## Calibration sources

- [MDN `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) for honoring reduced-motion preferences.
- [MDN `progress`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress) for determinate versus indeterminate task progress.
- [WAI-ARIA APG disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) for expanded state and control relationships.
- [Carbon loading](https://carbondesignsystem.com/components/loading/usage/) and [inline loading](https://carbondesignsystem.com/components/inline-loading/usage/) for page/region versus inline pending feedback.
- [Material Design motion overview](https://m3.material.io/styles/motion/overview) for spatial continuity and transition roles.
