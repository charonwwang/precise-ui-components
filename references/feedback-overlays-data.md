# Feedback, overlays, and data display vocabulary

## Progress and loading

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

### Liquid fill gauge — 液体填充仪表

Decorative data-display variant for dashboards. Provide a numeric text equivalent and avoid it for critical precision.

```tsx
<figure><LiquidGauge value={68} aria-hidden /><figcaption>存储使用率 68%</figcaption></figure>
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

### Audio waveform / level meter — 音频波形 / 音量电平

```tsx
<div role="meter" aria-label="输入音量" aria-valuemin={0} aria-valuemax={100} aria-valuenow={level}><Waveform level={level} aria-hidden /></div>
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

```tsx
<Skeleton animation="shimmer" reducedMotion="static" aria-label="正在加载卡片" />
```

## Status and feedback

### Inline validation — 行内校验

```tsx
<input id="email" aria-invalid={!!error} aria-describedby={error?'email-error':undefined} />{error&&<p id="email-error" role="alert">请输入有效邮箱</p>}
```

### Alert — 警告提示 / 页面内提示

Persistent message in content flow.

```tsx
<div role="alert"><strong>保存失败</strong><p>网络不可用，请检查连接后重试。</p><button onClick={retry}>重试</button></div>
```

### Banner — 横幅通知

Page- or site-level persistent announcement.

```tsx
<aside aria-label="系统公告" className="banner">系统将在 22:00 维护。<a href="/status">查看详情</a></aside>
```

### Toast / snackbar — 轻提示 / 消息条

Temporary non-modal feedback after an action. Do not place critical decisions only in a disappearing toast.

```tsx
toast.success('已保存', {action:{label:'撤销',onClick:undo}, duration:5000})
```

### Empty state — 空状态

```tsx
<EmptyState title="暂无项目" description="创建第一个项目以开始协作。" action={<button onClick={createProject}>新建项目</button>} />
```

### Error state — 错误状态

```tsx
<ErrorState title="无法加载订单" detail="请求超时" actions={<><button onClick={retry}>重试</button><a href="/status">服务状态</a></>} />
```

### Result page — 结果页

```tsx
<Result status="success" title="支付成功" description={`订单号 ${orderId}`} actions={<a href="/orders">查看订单</a>} />
```

## Overlays and floating surfaces

### Tooltip — 工具提示

Short, non-interactive supplemental text on hover and keyboard focus.

```tsx
<Tooltip content="复制链接"><button aria-label="复制链接" onClick={copy}><LinkIcon /></button></Tooltip>
```

### Popover — 气泡卡片 / 弹出面板

Lightweight interactive content anchored to a trigger.

```tsx
<Popover trigger={<button aria-expanded={open}>筛选</button>}><FilterForm onApply={applyFilters} /></Popover>
```

### Dropdown menu — 下拉菜单

Action list anchored to a trigger.

```tsx
<Menu trigger={<button aria-haspopup="menu">更多</button>}><MenuItem onSelect={edit}>编辑</MenuItem><MenuItem onSelect={archive}>归档</MenuItem></Menu>
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

## Data display

### Data table — 数据表格

Columns describe comparable fields; rows represent records. Use native table semantics.

```tsx
<table><caption>订单</caption><thead><tr><th scope="col">编号</th><th scope="col">状态</th></tr></thead><tbody>{orders.map(o=><tr><th scope="row">{o.id}</th><td>{o.status}</td></tr>)}</tbody></table>
```

### Sortable table — 可排序表格

```tsx
<th aria-sort={sort==='amount'?'descending':'none'}><button onClick={()=>setSort('amount')}>金额</button></th>
```

### Selectable table — 可选择表格

```tsx
<tr aria-selected={selected.has(row.id)}><td><input type="checkbox" aria-label={`选择订单 ${row.id}`} checked={selected.has(row.id)} onChange={()=>toggle(row.id)} /></td></tr>
```

### Virtualized table — 虚拟化表格

For very large datasets; preserve headers, row identity, keyboard access, and screen-reader alternatives.

```tsx
<VirtualTable rows={rows} rowKey="id" estimatedRowHeight={44} columns={columns} overscan={8} />
```

### Description list — 描述列表 / 键值详情

```tsx
<dl><dt>负责人</dt><dd>{owner}</dd><dt>创建时间</dt><dd><time dateTime={createdAt}>{formatted}</time></dd></dl>
```

### List — 列表

```tsx
<ul>{tasks.map(t=><li key={t.id}><a href={`/tasks/${t.id}`}>{t.title}</a></li>)}</ul>
```

### Feed — 信息流

```tsx
<section aria-label="动态">{events.map(e=><article key={e.id}><h3>{e.actor}</h3><p>{e.summary}</p></article>)}</section>
```

### Tree view — 树形视图

```tsx
<TreeView aria-label="文件" nodes={files} expandedIds={expanded} selectedId={selected} onExpandedChange={setExpanded} onSelect={setSelected} />
```

### Card — 卡片

Groups one subject's summary and actions. Avoid making the whole card clickable when it contains other interactive controls.

```tsx
<article className="card"><h3><a href={`/projects/${p.id}`}>{p.name}</a></h3><p>{p.summary}</p><button onClick={()=>star(p.id)}>收藏</button></article>
```

### KPI / statistic card — 指标卡

```tsx
<article aria-label="本月收入"><span>本月收入</span><strong>¥128,400</strong><span className="positive">环比 +8.2%</span></article>
```

### Timeline — 时间线

```tsx
<ol className="timeline">{events.map(e=><li><time dateTime={e.at}>{e.label}</time><p>{e.detail}</p></li>)}</ol>
```

### Badge — 徽标 / 状态标签

```tsx
<span className="badge" data-tone="success">已完成</span>
```

### Chip / tag — 标签胶囊

```tsx
<span className="chip">前端<button aria-label="移除前端标签" onClick={remove}>×</button></span>
```

### Avatar group — 头像组

```tsx
<ul aria-label="参与者">{users.slice(0,4).map(u=><li><img src={u.avatar} alt={u.name} /></li>)}{users.length>4&&<li>+{users.length-4}</li>}</ul>
```

### Chart shell — 图表容器

Always provide title, units, legend when needed, and a textual/table alternative.

```tsx
<figure><figcaption>近 7 日请求量（次）</figcaption><LineChart data={series} aria-hidden /><DataTable className="sr-only" data={series} /></figure>
```

## Additional feedback and measurement variants

### Meter / gauge — 计量表

Use for a read-only scalar within a known range, such as storage, battery, or score. It is not task progress.

```tsx
<label>存储使用量 <meter min={0} max={100} low={60} high={85} optimum={0} value={usedPercent}>{usedPercent}%</meter></label>
```

### Status message — 状态消息

Use a polite live region for background outcomes that should be announced without interrupting the user.

```tsx
<p role="status" aria-live="polite">{saveState==='saved'?'已自动保存':''}</p>
```

### Actionable notification — 可操作通知

Use a persistent inline or toast-style message with one clear follow-up action. If resolution needs several controls, link to a page or dialog.

```tsx
<Notification persistent tone="warning" title="付款方式即将过期" action={<a href="/billing">更新</a>} />
```

### Callout — 说明提示块

Use persistent contextual guidance that loads with the page before a user acts. It is not success/error feedback and is not dismissible.

```tsx
<aside className="callout" aria-label="导入说明"><strong>导入前请确认</strong><p>CSV 第一行必须包含字段名。</p><a href="/docs/import">查看格式</a></aside>
```

### Notification center — 通知中心

Use when messages require history, unread state, filtering, or later action; a toast alone cannot provide revisitability.

```tsx
<NotificationCenter items={notifications} filter={filter} onMarkRead={markRead} onOpenItem={openNotification} />
```

## Additional data structures

### Structured list — 结构化列表

Use repeated row layouts with secondary fields when content is primarily read-only or navigational. Switch to a table when column comparison and headers become essential.

```tsx
<ul className="structured-list">{services.map(s=><li><a href={`/services/${s.id}`}><strong>{s.name}</strong><span>{s.region}</span><Badge>{s.status}</Badge></a></li>)}</ul>
```

### Data grid — 数据网格

Use for spreadsheet-like interactive cells, selection, editing, copy/paste, and arrow-key navigation. Do not apply grid semantics to a merely sortable table.

```tsx
<DataGrid rows={rows} columns={columns} editable selectionMode="cell" onCellsChange={updateCells} />
```

### Virtualized data grid — 虚拟化数据网格

Use only when both spreadsheet-like grid interaction and large-data windowing are required. Virtualization is an implementation strategy, so it must not weaken the grid's cell focus, editing, selection, or announced row/column position.

```tsx
<VirtualizedDataGrid rows={rows} columns={columns} rowKey="id" editable overscan={8} aria-rowcount={rows.length} onCellsChange={updateCells} />
```

Reject this for a large read-only dataset that only needs row sorting/filtering; that remains a virtualized table.

### Treegrid — 树形数据网格

Use when hierarchical rows also have comparable columns or editable cells. Use a tree for hierarchy without columns and a data grid for flat rows.

```tsx
<TreeGrid rows={hierarchicalRows} columns={columns} expandedIds={expanded} onExpandedChange={setExpanded} />
```

### Clickable card — 可点击卡片

Use when the entire card navigates to one destination and contains no independent nested actions.

```tsx
<article className="card"><a className="stretched-link" href={`/projects/${p.id}`}><h3>{p.name}</h3><p>{p.summary}</p></a></article>
```

### Selectable card — 可选择卡片

Use for visually rich options such as plans. Preserve radio semantics for single selection and checkbox semantics for multiple selection.

```tsx
<label className="selectable-card"><input type="radio" name="plan" value={plan.id} checked={value===plan.id} onChange={()=>setValue(plan.id)} /><PlanSummary plan={plan} /></label>
```

### Expandable card — 可展开卡片

Use to reveal secondary information inline. If the card contains other actions, give expansion its own button instead of making the whole surface ambiguous.

```tsx
<article><header><h3>{title}</h3><button aria-expanded={open} onClick={()=>setOpen(!open)}>详情</button></header>{open&&<CardDetails />}</article>
```
