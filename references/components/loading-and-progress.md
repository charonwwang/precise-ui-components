# Loading and progress / 加载与进度

This file defines exactly one component family. Select subtypes by scope, known versus unknown progress, stable versus unknown layout, blocking behavior, duration, and recoverability.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Determinate progress / 确定进度 | Meaningful completed/total work is known | Duration is unknown | `<progress value={done} max={total}>` |
| Indeterminate progress / 不确定进度 | Work is ongoing but remaining amount is unknown | A real percentage is available | `<progress>` without `value` |
| Spinner / 旋转加载 | Small local action or compact region is busy | Page structure is still unknown or wait is long | `status text + spinner` |
| Skeleton / 骨架屏 | Initial loading has stable predictable layout and perceived continuity matters | Layout/content shape is unknown or action is tiny | semantic container `aria-busy` + decorative skeleton |
| Inline loading / 行内加载 | Action changes state in place, e.g. saving a row/button | Whole surface is unavailable | `button/row status with preserved label` |
| Pending button / 按钮提交中 | One triggered action must prevent duplicate submission | Several regions or a background process are loading | preserve label/width + `aria-busy` + disabled |
| Local region loading / 局部区域加载 | One bounded panel is unavailable while the page remains usable | Final layout is stable enough for a skeleton | `labelled region + local status/spinner` |
| Blocking surface loader / 阻塞式局部遮罩 | Interaction with one bounded surface would be unsafe during a short operation | Controls can be disabled or background can remain usable | `loader over bounded surface, not whole app` |
| Route progress / 路由进度 | Navigation data loading replaces the page and exact progress is unknown | Only one local control is pending | `top linear indeterminate progress` |
| Row-card skeleton / 行卡片骨架 | Repeated item shape is stable and initial data is loading | Existing items remain usable during refresh | `repeated decorative skeletons in busy region` |
| Optimistic pending / 乐观更新等待态 | Success is likely and rollback is safe | Failure is costly or state cannot be restored | `update immediately + subtle pending + rollback` |
| Background sync / 后台同步状态 | Existing content remains usable during refresh/sync | Stale content would be unsafe | `keep content + polite timestamp/status` |
| Pull-to-refresh / 下拉刷新 | Touch-first feed uses a familiar refresh gesture | Desktop-only workflow or no visible alternative exists | `gesture indicator + accessible refresh path` |
| Lazy-media placeholder / 延迟媒体占位 | Deferred image/video must reserve layout and avoid shift | Media is already available or dimensions unknown | `fixed dimensions + blur/color placeholder` |
| Streaming response / 流式响应状态 | Partial output is useful while more content arrives | Result is atomic and cannot be shown incrementally | visible chunks + `aria-busy` + generation status |
| Per-item queue progress / 分项队列进度 | Multiple uploads/jobs can retry, cancel, or fail independently | Operation is one atomic task | `per-item states and progress, optional aggregate` |
| Step progress / 阶段进度 | Named discrete stages communicate workflow position | Continuous completion percentage | `ordered stage list` |
| Result/status state / 结果状态 | Operation finished and next actions matter | Work is still in progress | `success/error result panel` |
| Load-more pending / 加载更多等待态 | Existing list remains visible while the next cursor page loads | Whole collection is initial-loading | `footer status + disabled load-more control` |

## Detailed variants

### Linear determinate progress — 线性确定进度条 / 平滑填充

Use when a meaningful percentage is known, such as bytes uploaded.

```tsx
<progress value={uploadedBytes} max={totalBytes}>{percent}%</progress><span>{percent}%</span>
```

### Stepped progress — 分阶段进度 / 阶段步骤

Use for discrete workflow states.

```tsx
<ol className="step-progress">{steps.map((x,i)=><li data-state={i<current?'complete':i===current?'current':'upcoming'}>{x}</li>)}</ol>
```

### Circular progress — 环形进度 / 环形百分比

```tsx
<CircularProgress value={72} aria-label="导入进度 72%"><span>72%</span></CircularProgress>
```

### Indeterminate linear progress — 线性不确定进度条

Unknown duration; animated bar must not imply a fabricated percentage.

```tsx
<div role="progressbar" aria-label="正在同步" className="indeterminate-bar" />
```

### Sync spinner — 循环同步指示器

```tsx
<span role="status"><Spinner icon="sync" />正在同步数据</span>
```

### Radar scan — 雷达扫描指示器

Domain-specific searching/detection visualization; pair it with status text.

```tsx
<div role="status"><RadarScan aria-hidden /><span>正在搜索附近设备…</span></div>
```

### Typing indicator — 三点跳动 / 输入中指示器

```tsx
<div role="status" aria-label="对方正在输入"><span className="typing-dots" aria-hidden>•••</span></div>
```

### Spinner — 旋转加载指示器

```tsx
<span role="status"><Spinner aria-hidden />加载中…</span>
```

### Skeleton screen — 骨架屏

Mirrors stable page structure during initial content loading; hide decorative blocks from assistive tech.

```tsx
<section aria-busy="true" aria-label="正在加载文章"><Skeleton className="h-8 w-1/2" /><Skeleton lines={4} /></section>
```

### Shimmer skeleton — 微光骨架屏

Use only when motion meaningfully signals loading; fall back to a static skeleton under reduced motion.

```tsx
<Skeleton animation={reducedMotion?'none':'shimmer'} aria-hidden />
```

### Pending button — 按钮提交中状态

Use for one triggered action. Preserve the label/width, disable duplicate submission, and announce the pending state.

```tsx
<button disabled={saving} aria-busy={saving} onClick={save}>{saving?<><Spinner aria-hidden />保存中…</>:'保存'}</button>
```

### Blocking surface loader — 阻塞式局部遮罩

Block only the bounded surface whose interaction would be unsafe. Do not cover the entire application for an unrelated local operation.

```tsx
<section aria-busy={loading} aria-label="订单详情"><OrderDetail />{loading&&<div className="surface-loader" role="status">正在更新…</div>}</section>
```

### Load-more pending row — 加载更多等待行

Keep existing items and scroll position stable while the next cursor page loads.

```tsx
<><ItemList items={items} />{loadingMore&&<div role="status">正在加载更多…</div>}<button disabled={loadingMore||!hasMore} onClick={loadMore}>加载更多</button></>
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

### Blocking overlay loader — 阻塞式遮罩加载

Use only when interaction with a bounded surface would be unsafe during a short operation. Prefer disabling the affected controls over blocking the whole page.

```tsx
<DialogBody aria-busy={processing}>{children}{processing&&<div className="surface-loader" role="status"><Spinner />正在提交…</div>}</DialogBody>
```
