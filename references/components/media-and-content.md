# Media and authored content / 媒体与内容创作

This file defines exactly one component family. Select subtypes by browse versus play versus edit, sequence versus comparison, accessibility alternatives, controls, and generated content state.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Recurrence editor / 重复规则编辑器 | Repeating schedules need frequency, interval, weekdays, end condition | One-off date/time | `recurrence form producing RRULE-like data` |
| Carousel / 轮播 | Sequential visual browsing where only a subset is shown | Comparable data must be visible together; important content may be hidden | `manual controls, pause, slide status` |
| Gallery / 画廊 | Multiple images are browsed and compared visually | Sequential storytelling is the main behavior | `responsive grid + lightbox` |
| Video player / 视频播放器 | Video is primary media; controls/captions matter | Static animated decoration | `native video + captions/transcript` |
| QR code / 二维码 | Cross-device transfer or machine scan is the user task | Text/link can be clicked on the same device | `QR plus human-readable fallback/action` |
| Watermark / 水印 | Content ownership/classification must remain visible without blocking use | It is merely decorative branding | `repeated non-interactive overlay, readable content preserved` |
| Rich-text editor / 富文本编辑器 | Users need headings, emphasis, links, and lists in authored content | Plain text/Markdown is the product contract | `<RichTextEditor toolbar={…} />` |
| Markdown editor / Markdown 编辑器 | Technical users need portable source plus preview | Nontechnical users should not see markup | `textarea/editor + preview` |

## Detailed variants

### Recurrence editor — 重复规则编辑器

Use for schedules with frequency, interval, weekdays, and an end condition. Always render a human-readable summary of the generated rule.

```tsx
<RecurrenceEditor value={rule} timezone="Asia/Shanghai" onChange={setRule} /><output>{summarizeRule(rule)}</output>
```

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
