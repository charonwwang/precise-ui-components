# Layout and containers / 布局与容器

This file defines exactly one component family. Select subtypes by page shell, spatial relationship, resizing, flow direction, responsive collapse, scrolling, and sticky behavior.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Split view / 分栏视图 | Two related surfaces must be seen together, e.g. list-detail | Secondary content is brief or small-screen modal | `adjacent regions` |
| Resizable panels / 可调分栏 | Users benefit from allocating space between persistent panes | Layout should be fixed or touch simplicity matters | `window splitter with keyboard support` |
| Resizable inline side panel / 可调整行内侧面板 | Supplemental content must coexist with the main canvas and users need to allocate width | The panel may cover content, is temporary, or does not need resizing | `persistent side pane + keyboard-operable separator; responsive overlay fallback` |
| App shell / 应用外壳 | Persistent header/navigation/main regions define the product frame | Only one page section needs grouping | `<AppShell header={} nav={} main={} />` |
| Grid layout / 网格布局 | Two-dimensional aligned tracks organize content | Items flow independently by content height | `CSS Grid` |
| Masonry layout / 瀑布流布局 | Visual cards have varied heights and order is non-tabular | Row alignment or reading order is critical | `masonry with DOM order preserved` |
| Stack layout / 堆叠布局 | Children flow on one axis with consistent spacing | Two-dimensional placement is required | `<Stack gap="md" />` |
| Scroll area / 滚动区域 | A bounded region intentionally owns overflow | Whole-page scrolling is sufficient | `labelled overflow container` |
| Sticky region / 粘性区域 | Header/actions must remain visible within scroll context | It obscures content or nested scroll makes behavior unclear | `position: sticky` with offset |
| Inline drawer / 行内抽屉 | Supplemental details/actions should coexist side-by-side with main content | Space is narrow or attention must be forced | `drawer that shifts/resizes layout` |

## Detailed variants

### App shell — 应用外壳

```tsx
<div className="app-shell"><Header /><Sidebar /><main id="main"><Outlet /></main></div>
```

### Split view — 分栏视图

```tsx
<div className="split-view"><section aria-label="会话列表"><ConversationList /></section><section aria-label="会话内容"><Conversation /></section></div>
```

### Resizable panels — 可调整分栏

```tsx
<ResizablePanelGroup direction="horizontal"><ResizablePanel defaultSize={30}><Tree /></ResizablePanel><ResizeHandle /><ResizablePanel><Editor /></ResizablePanel></ResizablePanelGroup>
```

### Resizable inline side panel — 可调整行内侧面板

Use when supplemental details or filters must remain beside an interactive main canvas and the user benefits from allocating width. It is an inline layout region, not an overlay drawer. A narrow-screen fallback may reuse the same content inside an overlay drawer.

```tsx
<ResizablePanelGroup direction="horizontal"><ResizablePanel><Chart /></ResizablePanel><ResizeHandle aria-label="调整筛选面板宽度" /><ResizablePanel defaultSize={28} minSize={20}><aside aria-label="筛选详情"><FilterFields /></aside></ResizablePanel></ResizablePanelGroup>
```

Keep one canonical filter model across desktop and mobile renderings. The resize handle needs pointer and keyboard operation, visible focus, and usable minimum/maximum sizes.

### Grid — 网格布局

```tsx
<ul className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">{items.map(x=><li><Card item={x} /></li>)}</ul>
```

### Masonry — 瀑布流

Use for variable-height visual browsing, not rows requiring alignment.

```tsx
<Masonry columns={{base:1,md:2,lg:4}} gap={16}>{items.map(x=><MediaCard item={x} />)}</Masonry>
```

### Stack — 堆叠布局

```tsx
<div className="flex flex-col gap-4"><Heading /><Content /><Actions /></div>
```

### Cluster / inline group — 行内群组

```tsx
<div className="flex flex-wrap items-center gap-2"><FilterChips /><button>清除</button></div>
```

### Container — 内容容器

```tsx
<main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</main>
```

### Sticky header — 吸顶页头

```tsx
<header className="sticky top-0 z-20 border-b bg-surface/95 backdrop-blur"><PageToolbar /></header>
```

### Aspect-ratio frame — 固定宽高比容器

```tsx
<div className="aspect-video overflow-hidden"><img src={src} alt={alt} className="h-full w-full object-cover" /></div>
```

### Scroll area — 滚动区域

```tsx
<section className="max-h-96 overflow-auto" tabIndex={0} aria-label="运行日志"><LogLines /></section>
```

### Divider — 分隔线

```tsx
<hr aria-hidden="true" className="border-subtle" />
```

### Inline side panel — 行内侧面板

Persistent contextual content that reflows or resizes the main layout. It is not an overlay and background interaction stays available.

```tsx
<SplitView main={<Editor />} aside={inspectorOpen?<Inspector />:null} asideWidth={width} onResize={setWidth} />
```
