# Actions, layout, disclosure, and media vocabulary

## Buttons and actions

### Primary button — 主要按钮

One dominant action per region.

```tsx
<button type="submit" className="button-primary">保存更改</button>
```

### Secondary button — 次要按钮

```tsx
<button type="button" className="button-secondary" onClick={preview}>预览</button>
```

### Tertiary / ghost button — 三级按钮 / 幽灵按钮

```tsx
<button type="button" className="button-ghost" onClick={cancel}>取消</button>
```

### Destructive button — 危险按钮

```tsx
<button type="button" className="button-danger" onClick={()=>setConfirming(true)}>删除项目</button>
```

### Icon button — 图标按钮

```tsx
<button type="button" aria-label="关闭" onClick={onClose}><CloseIcon aria-hidden /></button>
```

### Toggle button — 切换按钮

```tsx
<button type="button" aria-pressed={starred} onClick={()=>setStarred(!starred)}>收藏</button>
```

### Button group — 按钮组

```tsx
<div role="group" aria-label="文本对齐"><button aria-pressed={align==='left'} onClick={()=>setAlign('left')}>左对齐</button><button aria-pressed={align==='center'} onClick={()=>setAlign('center')}>居中</button></div>
```

### Floating action button — 浮动操作按钮

```tsx
<button className="fab" aria-label="新建消息" onClick={compose}><PlusIcon aria-hidden /></button>
```

### Link vs button — 链接与按钮

Use a link for navigation and a button for an in-place action.

```tsx
<a href="/settings">打开设置</a><button onClick={refresh}>刷新数据</button>
```

## Layout and containers

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

## Disclosure and grouping

### Accordion — 手风琴

One or more collapsible content sections.

```tsx
<Accordion multiple={false}><AccordionItem value="billing" title="账单设置"><BillingSettings /></AccordionItem></Accordion>
```

### Disclosure — 披露控件 / 展开收起

```tsx
<details><summary>查看技术细节</summary><pre>{details}</pre></details>
```

### Collapsible panel — 可折叠面板

```tsx
<Collapsible open={open} onOpenChange={setOpen} trigger="高级筛选"><AdvancedFilters /></Collapsible>
```

### Fieldset — 表单分组

```tsx
<fieldset><legend>账单地址</legend><AddressFields /></fieldset>
```

### Toolbar — 工具栏

```tsx
<div role="toolbar" aria-label="编辑工具"><button onClick={bold} aria-pressed={isBold}>粗体</button><button onClick={link}>插入链接</button></div>
```

## Upload and files

### File input — 文件选择器

```tsx
<label>上传合同<input type="file" accept="application/pdf" onChange={selectFile} /></label>
```

### Drag-and-drop upload — 拖拽上传区

Always retain a clickable file-input path.

```tsx
<Dropzone accept={{'image/*':['.png','.jpg']}} maxSize={5_000_000} onDrop={upload}><input type="file" accept="image/png,image/jpeg" /><p>拖入图片，或点击选择</p></Dropzone>
```

### Multi-file upload queue — 多文件上传队列

```tsx
<UploadQueue files={files} concurrency={3} onRetry={retry} onCancel={cancel} />
```

### Image uploader with crop — 图片上传与裁剪

```tsx
<ImageUploader value={avatar} aspect={1} minSize={[512,512]} onCropComplete={setAvatar} />
```

### Attachment list — 附件列表

```tsx
<ul aria-label="附件">{files.map(f=><li><a href={f.url}>{f.name}</a><span>{formatBytes(f.size)}</span><button aria-label={`移除 ${f.name}`} onClick={()=>remove(f.id)}>移除</button></li>)}</ul>
```

## Media and content

### Image gallery — 图片画廊

```tsx
<ul className="gallery">{images.map((x,i)=><li><button onClick={()=>openLightbox(i)}><img src={x.thumb} alt={x.alt} /></button></li>)}</ul>
```

### Carousel — 轮播 / 走马灯

Use only when sequential browsing is meaningful; provide pause and manual controls.

```tsx
<Carousel aria-label="产品截图" autoplay={false} slides={slides} showPrevNext showDots />
```

### Video player — 视频播放器

```tsx
<video controls playsInline preload="metadata"><source src={src} type="video/mp4" /><track kind="captions" srcLang="zh" src={captions} default /></video>
```

### Audio player — 音频播放器

```tsx
<audio controls preload="metadata"><source src={src} type="audio/mpeg" /></audio>
```

### Rich text editor — 富文本编辑器

```tsx
<RichTextEditor value={doc} onChange={setDoc} toolbar={['heading','bold','italic','link','list']} aria-label="文章正文" />
```

### Markdown editor with preview — Markdown 编辑器与预览

```tsx
<SplitView><textarea aria-label="Markdown" value={md} onChange={e=>setMd(e.target.value)} /><article aria-label="预览"><Markdown source={md} /></article></SplitView>
```

### Code editor — 代码编辑器

```tsx
<CodeEditor language="typescript" value={code} onChange={setCode} aria-label="TypeScript 代码" minimap={false} />
```

## Supporting primitives

### Avatar — 头像

```tsx
<img className="avatar" src={user.avatar} alt={`${user.name}的头像`} />
```

### Status dot — 状态点

Never rely on color alone.

```tsx
<span><span className="status-dot bg-green" aria-hidden />在线</span>
```

### Keyboard hint — 键盘提示

```tsx
<span>搜索 <kbd>⌘</kbd><kbd>K</kbd></span>
```

### Visually hidden text — 视觉隐藏文本

```tsx
<span className="sr-only">在新窗口打开</span>
```

## Guidance and discovery components

### Toggletip — 可点击提示

Use a button-triggered lightweight explanation when hover-only tooltip behavior is insufficient or the content contains a link. Use a popover for richer controls.

```tsx
<Toggletip trigger={<button aria-label="了解税率计算">?</button>}><p>税率按账单地址计算。</p><a href="/tax">了解更多</a></Toggletip>
```

### Coach mark — 教学提示

Use for one targeted first-use explanation. It must be dismissible and should not repeatedly interrupt returning users.

```tsx
<CoachMark targetRef={exportButtonRef} open={!seenExportHint} onDismiss={rememberHint} title="导出报表">可选择 CSV 或 XLSX。</CoachMark>
```

### Product tour — 产品导览

Use for an ordered walkthrough across several interface targets. Provide skip, previous, next, finish, and a way to replay it later.

```tsx
<Tour open={tourOpen} steps={tourSteps} current={step} onStepChange={setStep} onSkip={finishTour} onFinish={finishTour} />
```

### Overflow menu — 溢出菜单

Use for low-frequency contextual actions that do not fit in a row, card, or toolbar. Keep the primary action visible.

```tsx
<Menu trigger={<button aria-label="更多操作">•••</button>}><MenuItem onSelect={duplicate}>复制</MenuItem><MenuItem onSelect={archive}>归档</MenuItem></Menu>
```

### QR code — 二维码

Use for machine scanning or cross-device transfer. Always include a human-readable fallback such as the URL and copy action.

```tsx
<figure><QRCode value={url} /><figcaption><a href={url}>{url}</a><button onClick={()=>copy(url)}>复制链接</button></figcaption></figure>
```

### Watermark — 水印

Use for classification or ownership marking without blocking content. It must be non-interactive and preserve contrast/readability.

```tsx
<Watermark text="内部资料" aria-hidden><DocumentContent /></Watermark>
```
