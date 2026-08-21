# Navigation / 导航

This file defines exactly one component family. Select subtypes by destination scope, route versus view change, hierarchy, persistence, history, and device context.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Tabs / 标签页 | Distinct peer content panels within one information hierarchy | It is a binary setting, a form choice, or a mere style switch | `tablist`, `tab`, `tabpanel` |
| Top navigation / 顶部导航 | Few global destinations; horizontal space is stable | Many nested destinations or admin-scale IA | `<nav aria-label="主导航">` |
| Application header / 应用页头 | Shell combines identity, navigation trigger, search, and account actions | Only a list of destinations is needed | `<header><Logo/><PrimaryNav/><AccountMenu/></header>` |
| Persistent sidebar / 常驻侧边栏 | Desktop app with many destinations; navigation should remain visible | Narrow mobile screen or task needs maximum width | `<aside><nav>…` |
| Collapsible sidebar / 可折叠侧边栏 | Desktop density varies; icons remain recognizable in rail state | Labels are essential and icons ambiguous | `expanded sidebar + labeled navigation rail` |
| Navigation rail / 导航轨 | Three to seven high-level destinations in compact desktop/tablet layout | Deep hierarchy | `narrow persistent nav with icons and labels/tooltips` |
| Off-canvas navigation / 滑入导航 | Mobile or narrow screen; navigation is temporarily overlaid | Navigation must coexist with content | `modal/overlay drawer from left` |
| Multi-level sidebar / 多级侧边栏 | Complex hierarchy with parent groups | Only a few destinations or hierarchy is shallow | `disclosures inside nav` |
| Mega menu / 大型菜单 | Many discoverable destinations grouped under a global category | Commands or form values | `wide navigation panel with grouped links` |
| Bottom navigation / 底部导航栏 | Three to five top-level mobile destinations need thumb reach | Contextual actions or many destinations | bottom `nav` with current link |
| Local section navigation / 局部分区导航 | Sibling routes belong to one product area beneath global navigation | Views are in-memory panels on one route | labelled secondary `nav` |
| Breadcrumb / 面包屑 | Current location sits inside a hierarchy; users may jump upward | Sequence is process progress rather than location | `ordered navigation links` |
| Back link / 返回链接 | Clear parent or previous context matters, especially in master-detail flows | Users need arbitrary sibling access | `stable parent URL or defined history action` |
| Tree navigation / 树形导航 | Deep irregular destination hierarchy expands by branch | Nodes set a form value or tabular columns matter | `tree inside labelled navigation region` |
| Pagination nav / 页码导航 | Users need random access, stable URLs, and bounded result pages | Stream is exploratory or data changes rapidly | `page links with current page` |
| Table pagination / 表格分页栏 | Data table needs page size, item count, previous/next, possibly direct page | SEO/route navigation is the primary goal | `pagination attached below table` |
| Cursor/load more / 游标分页或加载更多 | Backend uses cursor; order may change; sequential continuation is enough | Users need arbitrary page jumps | `explicit “加载更多” button` |
| Infinite scroll / 无限滚动 | Exploratory feed and uninterrupted browsing | Goal-oriented search, comparison, footer access, or return-to-position risk | `observer plus accessible load-more fallback` |
| Stepper/wizard / 步骤条或向导 | Ordered task with discrete stages and a current step | Passive task completion percentage | ordered steps with `aria-current="step"` |
| Anchor navigation / 锚点目录 | Long single page with stable sections | Destinations are separate pages | `same-page fragment links` |
| Skip link / 跳过导航链接 | Keyboard users need to bypass repeated shell content | There is no repeated block before main content | focus-visible fragment link to `main` |
| Route tabs / 路由标签页 | Peer sections have stable URLs, history, and deep links | Panels switch only local in-memory content | links styled as tabs, `aria-current="page"` |
| Content tabs / 内容标签页 | Peer panels switch within one page context | Stable URLs and browser history matter | `APG tablist/tab/tabpanel pattern` |
| Workspace tabs / 工作区标签 | Multiple open documents require activate, close, dirty, reorder, and overflow states | Ordinary page sections are being switched | `document tab strip with stable IDs` |
| Previous-next navigation / 上一项下一项导航 | Known ordered content needs sequential movement | Random page access is important | `rel="prev"` and `rel="next"` links |
| Footer sitemap navigation / 页脚站点地图 | Broad informational site benefits from redundant grouped discovery | It would replace the primary navigation | grouped links in labelled footer `nav` |
| Dismissible navigation drawer / 可收起导航抽屉 | Desktop/tablet navigation opens and closes while content reflows | Background must become inert or screen is narrow | `non-modal drawer + responsive layout` |

## Detailed variants

### Mega menu — 大型菜单 / 超级菜单

A wide navigation panel with grouped destinations, descriptions, or promotions. It is navigation, not a form select.

```tsx
<nav aria-label="产品"><MegaMenu trigger="产品" groups={[{heading:'按团队', links:teamLinks},{heading:'按场景', links:useCaseLinks}]} /></nav>
```

### Top navigation / navbar — 顶部导航栏

```tsx
<nav aria-label="主导航"><a href="/overview" aria-current="page">概览</a><a href="/reports">报表</a></nav>
```

### Standard sidebar — 标准侧边栏

Persistent vertical navigation attached to the viewport edge.

```tsx
<aside><nav aria-label="工作台"><NavItem href="/home" icon={Home}>首页</NavItem><NavItem href="/orders" icon={Box}>订单</NavItem></nav></aside>
```

### Floating sidebar — 悬浮式侧边栏

The video calls this “悬浮导式”; normalize to the established term “悬浮式侧边栏 / floating sidebar”. It has outer margins and reads as an independent navigation card.

```tsx
<aside className="fixed inset-y-4 left-4 w-64 rounded-2xl border bg-surface shadow-lg"><AppNav /></aside>
```

### Curved wheel navigation — 弧形滚轮式导航

A highly visual carousel-like navigation where items move along an arc. Use only when spatial motion adds value; keep a linear accessible fallback.

```tsx
<nav aria-label="场景"><ul className="arc-wheel">{items.map((x,i)=><li data-active={i===active}><button onClick={()=>setActive(i)}>{x.label}</button></li>)}</ul></nav>
```

### Collapsible sidebar / rail — 可折叠侧边栏 / 导航轨

Expanded state shows icons and labels; collapsed state retains icons with accessible names and tooltips.

```tsx
<aside data-collapsed={collapsed}><button aria-expanded={!collapsed} onClick={()=>setCollapsed(!collapsed)}>切换导航</button><NavItems showLabels={!collapsed} /></aside>
```

### Off-canvas sidebar — 隐藏式侧边栏 / 滑入导航

Enters from the edge after a menu trigger; behaves like a modal drawer on narrow screens.

```tsx
<button aria-controls="mobile-nav" aria-expanded={open} onClick={()=>setOpen(true)}>菜单</button><Drawer id="mobile-nav" side="left" open={open} onOpenChange={setOpen}><AppNav /></Drawer>
```

### Tabs — 标签页

Switch peer content panels without changing context. Arrow keys move between tabs.

```tsx
<Tabs value={tab} onValueChange={setTab}><TabList aria-label="订单"><Tab value="all">全部</Tab><Tab value="pending">待处理</Tab></TabList><TabPanel value="all"><AllOrders /></TabPanel></Tabs>
```

### Browser-like tabs — 文档标签 / 可关闭标签页

For multiple working documents; specify close, dirty, reorder, and overflow behavior.

```tsx
<DocumentTabs items={docs} activeId={activeId} onActivate={setActiveId} onClose={closeDoc} reorderable />
```

### Breadcrumb — 面包屑导航

```tsx
<nav aria-label="面包屑"><ol><li><a href="/">首页</a></li><li><a href="/products">产品</a></li><li aria-current="page">详情</li></ol></nav>
```

### Pagination — 分页器

```tsx
<nav aria-label="分页"><a href="?page=1">上一页</a><a href="?page=2" aria-current="page">2</a><a href="?page=3">下一页</a></nav>
```

### Cursor pagination / load more — 游标分页 / 加载更多

Use when the backend provides opaque cursors and sequential continuation is sufficient.

```tsx
<button disabled={!nextCursor||loading} onClick={()=>loadMore(nextCursor)}>{loading?'加载中…':'加载更多'}</button>
```

### Infinite scroll — 无限滚动

Use for exploratory streams. Preserve scroll position and expose an accessible load-more fallback; reject for comparison tasks and footer-dependent pages.

```tsx
<InfiniteList items={items} loadMore={loadMore} hasMore={hasMore} fallback={<button onClick={loadMore}>加载更多</button>} />
```

### Stepper / wizard steps — 步骤条 / 向导步骤

Represents progress through a multi-step task, not numeric loading progress.

```tsx
<ol aria-label="开户步骤">{steps.map((x,i)=><li aria-current={i===step?'step':undefined} data-complete={i<step}>{x}</li>)}</ol>
```

### Anchor navigation / table of contents — 锚点导航 / 目录

```tsx
<nav aria-label="本文目录"><a href="#api">API</a><a href="#examples">示例</a></nav>
```

### Bottom navigation — 底部导航栏

Use three to five primary mobile destinations.

```tsx
<nav aria-label="主要页面" className="fixed bottom-0"><a href="/home" aria-current="page">首页</a><a href="/inbox">消息</a><a href="/me">我的</a></nav>
```

### Navigation rail — 导航轨

Use for roughly three to seven high-level destinations in compact desktop/tablet layouts. Reject for deep trees or unfamiliar icon-only destinations.

```tsx
<nav aria-label="主导航" className="nav-rail">{routes.map(r=><a href={r.href} aria-label={r.label}><r.icon aria-hidden /><span>{r.label}</span></a>)}</nav>
```

### Table pagination — 表格分页栏

Use when a data table needs item count, page size, and sequential page controls. Keep it attached below the table; use page-link pagination for route navigation.

```tsx
<TablePagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} onPageSizeChange={setPageSize} />
```

### Global navigation bar / navbar — 全局顶部导航栏

Use for a small stable set of product-wide destinations on wide screens. Reject when the hierarchy is deep or horizontal space is unreliable.

```tsx
<nav aria-label="主导航"><a href="/home" aria-current="page">首页</a><a href="/projects">项目</a><a href="/reports">报表</a></nav>
```

### Application header / app bar — 应用页头 / 应用栏

Use as the shell region that combines identity, global navigation trigger, search, and account actions. It is a container, not a substitute term for every child control.

```tsx
<header><a href="/" aria-label="产品首页"><Logo /></a><PrimaryNav /><GlobalSearch /><AccountMenu /></header>
```

### Persistent side navigation — 常驻侧边导航

Use for many top-level destinations in a desktop application when navigation should coexist with content.

```tsx
<aside><nav aria-label="工作台">{routes.map(r=><a href={r.href} aria-current={r.active?'page':undefined}>{r.label}</a>)}</nav></aside>
```

### Bottom navigation / mobile tab bar — 底部导航栏 / 移动端标签栏

Use for three to five equally important top-level mobile destinations. Do not use for contextual actions or an unbounded destination list.

```tsx
<nav aria-label="主要页面" className="bottom-nav"><a href="/home" aria-current="page">首页</a><a href="/inbox">消息</a><a href="/me">我的</a></nav>
```

### Footer navigation / sitemap — 页脚导航 / 站点地图

Use as a redundant discovery route for broad informational sites. It does not replace primary navigation.

```tsx
<footer><nav aria-label="页脚导航">{groups.map(g=><section><h2>{g.label}</h2>{g.links.map(x=><a href={x.href}>{x.label}</a>)}</section>)}</nav></footer>
```

### Local navigation / section navigation — 局部导航 / 分区导航

Use for sibling destinations inside one product area while global navigation remains unchanged.

```tsx
<nav aria-label="项目设置"><a href="/settings/general" aria-current="page">常规</a><a href="/settings/members">成员</a></nav>
```

### Breadcrumb trail — 面包屑导航

Use to show the current hierarchical location and allow jumps to ancestors. Reject for process progress.

```tsx
<nav aria-label="面包屑"><ol><li><a href="/">首页</a></li><li><a href="/catalog">目录</a></li><li aria-current="page">相机</li></ol></nav>
```

### Back link / back button — 返回链接 / 返回按钮

Use for a clear parent or previous context, especially in narrow master-detail flows. Define whether it follows history or a stable parent URL.

```tsx
<a href={`/orders?${preservedQuery}`}>← 返回订单列表</a>
```

### Tree navigation — 树形导航

Use for deep, irregular hierarchies such as documentation or file locations when branches expand independently.

```tsx
<nav aria-label="文档目录"><Tree items={pages} selectionMode="single" onActivate={page=>navigate(page.href)} /></nav>
```

### Skip link — 跳过导航链接

Use as an accessibility shortcut to bypass repeated shell content. Keep it focus-visible even if visually hidden at rest.

```tsx
<><a className="skip-link" href="#main">跳到主要内容</a><main id="main" tabIndex={-1}><Page /></main></>
```

### Route tabs — 路由标签页

Use when peer subsections have stable URLs and browser history/deep links matter. Do not implement them as in-memory-only tab panels.

```tsx
<nav aria-label="订单视图" className="route-tabs"><a href="/orders/all" aria-current="page">全部</a><a href="/orders/pending">待处理</a></nav>
```

### Content tabs — 内容标签页

Use for peer panels in one page context. Apply `tablist`/`tab`/`tabpanel` behavior and arrow-key navigation; reject for form values or unrelated routes.

```tsx
<Tabs value={tab} onValueChange={setTab}><TabList aria-label="账户"><Tab value="profile">资料</Tab><Tab value="security">安全</Tab></TabList><TabPanel value="profile"><Profile /></TabPanel></Tabs>
```

### Workspace/document tabs — 工作区标签 / 文档标签

Use for multiple open documents with activation, close, dirty, reorder, and overflow behavior. This is closer to an editor workspace than ordinary page tabs.

```tsx
<DocumentTabs items={docs} activeId={activeId} onActivate={setActiveId} onClose={closeDoc} reorderable />
```

### Previous/next navigation — 上一项/下一项导航

Use for a known ordered sequence such as lessons, articles, or records when random page access is unnecessary.

```tsx
<nav aria-label="文章顺序"><a rel="prev" href={previous.href}>上一篇</a><a rel="next" href={next.href}>下一篇</a></nav>
```

### Page-number pagination — 页码分页

Use for bounded result sets requiring random access, stable URLs, and returnability. Reject for cursor-only APIs or exploratory feeds.

```tsx
<nav aria-label="分页"><a href="?page=1">上一页</a><a href="?page=2" aria-current="page">2</a><a href="?page=3">下一页</a></nav>
```

### Stepper / wizard navigation — 步骤条 / 向导导航

Use for an ordered multi-step task with a current step. It is not a task-completion percentage.

```tsx
<ol aria-label="开户步骤">{steps.map((x,i)=><li aria-current={i===step?'step':undefined} data-complete={i<step}>{x}</li>)}</ol>
```

### Stepper input — 步进器 / 数量选择器

```tsx
<div role="group" aria-label="数量"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><output>{qty}</output><button onClick={()=>setQty(qty+1)}>+</button></div>
```

### Navigation drawer — 导航抽屉

Material-style persistent, dismissible, or modal navigation surface. State the mode explicitly.

```tsx
<NavigationDrawer variant="dismissible" open={open} onOpenChange={setOpen} items={routes} />
```

### Modal navigation drawer — 模态导航抽屉

Use on narrow screens when global navigation temporarily covers content and background interaction must pause.

```tsx
<><button aria-controls="mobile-nav" aria-expanded={open} onClick={()=>setOpen(true)}>菜单</button><Drawer id="mobile-nav" modal side="left" open={open} onOpenChange={setOpen}><nav aria-label="主导航"><AppLinks /></nav></Drawer></>
```

### Dismissible navigation drawer — 可收起导航抽屉

Use when a desktop/tablet navigation surface may open and close while content reflows. Unlike a modal drawer, the background remains usable.

```tsx
<NavigationDrawer variant="dismissible" open={open} onOpenChange={setOpen}><AppLinks /></NavigationDrawer>
```
