# Navigation component taxonomy

Use this reference when a request says only “导航 / navigation”, “菜单 / menu”, “侧栏 / sidebar”, or “切换页面 / switch pages”. Choose by destination scope, state change, hierarchy, persistence, and device—not by placement alone.

## Decision axes

- `Destination scope`: product-wide, section-local, current-page, hierarchical parent, sequential task, or result pages.
- `State change`: URL/route change, same-route content panel switch, document/workspace switch, or command execution.
- `Persistence`: always visible, collapsible, temporarily overlaid, or opened on demand.
- `Hierarchy`: flat peers, grouped destinations, deep tree, parent path, or ordered sequence.
- `Device`: wide desktop, compact desktop/tablet, or touch-first narrow screen.

Never use menu semantics merely because links appear in a floating panel. Ordinary site navigation is usually a labelled `nav` containing links; an ARIA `menu` is for application-like commands and brings a different keyboard contract.

## Global and product navigation

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

### Multi-level side navigation — 多级侧边导航

Use for grouped or hierarchical destinations. Expansion reveals links; it does not itself navigate unless a separate parent link is provided.

```tsx
<nav aria-label="后台管理"><Disclosure label="系统管理"><a href="/users">用户</a><a href="/roles">角色</a></Disclosure></nav>
```

### Navigation rail — 导航轨

Use for roughly three to seven high-level destinations in compact desktop/tablet layouts. Reject for deep trees or unfamiliar icon-only destinations.

```tsx
<nav aria-label="主导航" className="nav-rail">{routes.map(r=><a href={r.href} aria-label={r.label}><r.icon aria-hidden /><span>{r.label}</span></a>)}</nav>
```

### Bottom navigation / mobile tab bar — 底部导航栏 / 移动端标签栏

Use for three to five equally important top-level mobile destinations. Do not use for contextual actions or an unbounded destination list.

```tsx
<nav aria-label="主要页面" className="bottom-nav"><a href="/home" aria-current="page">首页</a><a href="/inbox">消息</a><a href="/me">我的</a></nav>
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

### Mega menu — 大型导航菜单

Use to expose many grouped destinations beneath a global category. Reject for commands, editable controls, or a small list of links.

```tsx
<MegaMenu trigger="产品" groups={productGroups} featured={<a href="/new">查看新品</a>} />
```

### Footer navigation / sitemap — 页脚导航 / 站点地图

Use as a redundant discovery route for broad informational sites. It does not replace primary navigation.

```tsx
<footer><nav aria-label="页脚导航">{groups.map(g=><section><h2>{g.label}</h2>{g.links.map(x=><a href={x.href}>{x.label}</a>)}</section>)}</nav></footer>
```

## Section, page, and hierarchy navigation

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

### Anchor navigation / table of contents — 锚点导航 / 页内目录

Use for stable sections within one long page. It changes the fragment/scroll position, not the information hierarchy.

```tsx
<nav aria-label="本文目录"><a href="#overview">概览</a><a href="#api">API</a><a href="#examples">示例</a></nav>
```

### Skip link — 跳过导航链接

Use as an accessibility shortcut to bypass repeated shell content. Keep it focus-visible even if visually hidden at rest.

```tsx
<><a className="skip-link" href="#main">跳到主要内容</a><main id="main" tabIndex={-1}><Page /></main></>
```

## View, document, and workflow navigation

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

### Stepper / wizard navigation — 步骤条 / 向导导航

Use for an ordered multi-step task with a current step. It is not a task-completion percentage.

```tsx
<ol aria-label="开户步骤">{steps.map((x,i)=><li aria-current={i===step?'step':undefined} data-complete={i<step}>{x}</li>)}</ol>
```

### Command palette — 命令面板

Use for keyboard-first search across destinations and executable commands. Distinguish result types and do not treat it as domain-data search.

```tsx
<CommandPalette shortcut="Mod+K" groups={[{label:'页面',items:routes},{label:'命令',items:commands}]} onSelect={executeOrNavigate} />
```

## Nearby patterns that are not navigation

- `Menu / 菜单`: executes commands; it is not ordinary site navigation.
- `Content switcher / 内容切换器`: changes representation of the same data, such as grid/list.
- `Segmented control / 分段控制器`: chooses a compact value or mode.
- `Disclosure / 展开收起`: reveals content without changing location.
- `Filter chips / 筛选标签`: changes a query, not a destination.

## Calibration sources

- [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) for breadcrumb, tabs, tree, disclosure, menu, and related keyboard contracts.
- [WAI-ARIA disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) for the distinction between ordinary navigation links and application-menu semantics.
- [Material Design navigation components](https://m3.material.io/components/navigation-bar/overview) for responsive navigation bar, rail, and drawer placement models.
- [Carbon UI shell](https://carbondesignsystem.com/components/UI-shell-header/usage/) for application header and product-shell composition.
