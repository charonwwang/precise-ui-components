# Navigation / 导航

This file defines exactly one component family. Select subtypes by destination scope, route versus view change, hierarchy, persistence, history, and device context.

Underlined, contained/card, pill, and vertical are tab treatments or placements, not substitutes for route/content/workspace tab semantics. Apply `../visual-modifiers.md` only after choosing the tab subtype.

## Decision table

| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
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

### Top navigation / 顶部导航

Use for a small stable set of product-wide destinations on wide screens. Reject when hierarchy is deep or horizontal space is unreliable.

```tsx
<nav aria-label="主导航"><a href="/home" aria-current="page">首页</a><a href="/projects">项目</a><a href="/reports">报表</a></nav>
```

### Application header / 应用页头

The shell region may combine identity, a navigation trigger, global search, and account actions. It is not a substitute name for each child control.

```tsx
<header><a href="/" aria-label="产品首页"><Logo /></a><PrimaryNav /><GlobalSearch /><AccountMenu /></header>
```

### Persistent sidebar / 常驻侧边栏

Use when many desktop destinations must remain visible alongside content.

```tsx
<aside><nav aria-label="工作台">{routes.map(r=><a href={r.href} aria-current={r.active?'page':undefined}>{r.label}</a>)}</nav></aside>
```

### Collapsible sidebar / 可折叠侧边栏

Expanded state shows icons and labels; collapsed state keeps accessible names and reveals unfamiliar labels through tooltips.

```tsx
<aside data-collapsed={collapsed}><button aria-expanded={!collapsed} onClick={()=>setCollapsed(!collapsed)}>切换导航</button><NavItems showLabels={!collapsed} /></aside>
```

### Navigation rail / 导航轨

Use for roughly three to seven high-level destinations in a compact desktop or tablet layout. Reject for deep trees.

```tsx
<nav aria-label="主导航" className="nav-rail">{routes.map(r=><a href={r.href} aria-label={r.label}><r.icon aria-hidden /><span>{r.label}</span></a>)}</nav>
```

### Off-canvas navigation / 滑入导航

On narrow screens it temporarily covers content, makes the background inert, closes with Escape, and restores focus to its trigger.

```tsx
<><button aria-controls="mobile-nav" aria-expanded={open} onClick={()=>setOpen(true)}>菜单</button><Drawer id="mobile-nav" modal side="left" open={open} onOpenChange={setOpen}><nav aria-label="主导航"><AppLinks /></nav></Drawer></>
```

### Multi-level sidebar / 多级侧边栏

Use disclosures inside navigation for deep grouped destinations. Expansion and current-route state are separate.

```tsx
<aside><nav aria-label="管理后台"><NavGroup label="设置" expanded={expanded.settings} onExpandedChange={toggleSettings}><NavLinks items={settingRoutes} /></NavGroup></nav></aside>
```

### Mega menu / 大型菜单

A wide panel groups destinations and descriptions. It is navigation, not a form select or command menu.

```tsx
<nav aria-label="产品"><MegaMenu trigger="产品" groups={[{heading:'按团队', links:teamLinks},{heading:'按场景', links:useCaseLinks}]} /></nav>
```

### Bottom navigation / 底部导航栏

Use for three to five equally important top-level mobile destinations, not contextual actions.

```tsx
<nav aria-label="主要页面" className="bottom-nav"><a href="/home" aria-current="page">首页</a><a href="/inbox">消息</a><a href="/me">我的</a></nav>
```

### Local section navigation / 局部分区导航

Use for sibling routes inside one product area while global navigation remains unchanged.

```tsx
<nav aria-label="项目设置"><a href="/settings/general" aria-current="page">常规</a><a href="/settings/members">成员</a></nav>
```

### Breadcrumb / 面包屑

Show hierarchical location and allow jumps to ancestors. It does not represent process progress.

```tsx
<nav aria-label="面包屑"><ol><li><a href="/">首页</a></li><li><a href="/products">产品</a></li><li aria-current="page">详情</li></ol></nav>
```

### Back link / 返回链接

Define whether it follows browser history or a stable parent URL, and preserve required list context.

```tsx
<a href={`/orders?${preservedQuery}`}>← 返回订单列表</a>
```

### Tree navigation / 树形导航

Use for deep irregular destination hierarchies. Expansion changes visibility; activation changes destination.

```tsx
<nav aria-label="文档目录"><Tree items={pages} selectionMode="single" onActivate={page=>navigate(page.href)} /></nav>
```

### Pagination nav / 页码导航

Use stable page URLs when random access and returnability matter.

```tsx
<nav aria-label="分页"><a href="?page=1">上一页</a><a href="?page=2" aria-current="page">2</a><a href="?page=3">下一页</a></nav>
```

### Table pagination / 表格分页栏

Keep page size, item count, and page controls attached to the table whose rows they change.

```tsx
<TablePagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} onPageSizeChange={setPageSize} />
```

### Cursor/load more / 游标分页或加载更多

Use an opaque backend cursor when sequential continuation is sufficient.

```tsx
<button disabled={!nextCursor||loading} onClick={()=>loadMore(nextCursor)}>{loading?'加载中…':'加载更多'}</button>
```

### Infinite scroll / 无限滚动

Reserve for exploratory streams. Preserve position and expose an accessible load-more fallback.

```tsx
<InfiniteList items={items} loadMore={loadMore} hasMore={hasMore} fallback={<button onClick={loadMore}>加载更多</button>} />
```

### Stepper/wizard / 步骤条或向导

Represents the current stage in an ordered task, not numeric task completion.

```tsx
<ol aria-label="开户步骤">{steps.map((x,i)=><li aria-current={i===step?'step':undefined} data-complete={i<step}>{x}</li>)}</ol>
```

### Anchor navigation / 锚点目录

Use same-page fragment links for stable sections in long content.

```tsx
<nav aria-label="本文目录"><a href="#api">API</a><a href="#examples">示例</a></nav>
```

### Skip link / 跳过导航链接

Keep the shortcut focus-visible so keyboard users can bypass repeated shell content.

```tsx
<><a className="skip-link" href="#main">跳到主要内容</a><main id="main" tabIndex={-1}><Page /></main></>
```

### Route tabs / 路由标签页

Use peer links with stable URLs when browser history and deep links matter.

```tsx
<nav aria-label="订单视图" className="route-tabs"><a href="/orders/all" aria-current="page">全部</a><a href="/orders/pending">待处理</a></nav>
```

### Content tabs / 内容标签页

Switch peer panels within one page using the tablist, tab, and tabpanel keyboard model.

```tsx
<Tabs value={tab} onValueChange={setTab}><TabList aria-label="账户"><Tab value="profile">资料</Tab><Tab value="security">安全</Tab></TabList><TabPanel value="profile"><Profile /></TabPanel></Tabs>
```

### Workspace tabs / 工作区标签

Use for open documents with activation, close, dirty, reorder, stable identity, and overflow behavior.

```tsx
<DocumentTabs items={docs} activeId={activeId} onActivate={setActiveId} onClose={closeDoc} reorderable />
```

### Previous-next navigation / 上一项下一项导航

Use for a known ordered sequence when random access is unnecessary.

```tsx
<nav aria-label="文章顺序"><a rel="prev" href={previous.href}>上一篇</a><a rel="next" href={next.href}>下一篇</a></nav>
```

### Footer sitemap navigation / 页脚站点地图

Provide redundant grouped discovery on broad informational sites; do not replace primary navigation.

```tsx
<footer><nav aria-label="页脚导航">{groups.map(g=><section><h2>{g.label}</h2>{g.links.map(x=><a href={x.href}>{x.label}</a>)}</section>)}</nav></footer>
```

### Dismissible navigation drawer / 可收起导航抽屉

Use on desktop or tablet when navigation can open and close while content reflows and remains interactive.

```tsx
<NavigationDrawer variant="dismissible" open={open} onOpenChange={setOpen}><AppLinks /></NavigationDrawer>
```
