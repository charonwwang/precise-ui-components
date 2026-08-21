# File selection and upload / 文件选择与上传

This file defines exactly one component family. Select subtypes by file count, drag and drop, preview, validation, per-item progress, retry, cancellation, and post-upload editing.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| File input / 文件选择器 | One/few files, simple form, no rich queue | Drag/drop, preview, retry, or progress is central | `<input type="file">` |
| Dropzone / 拖拽上传区 | Desktop workflow benefits from drag/drop and clear target | Mobile-only or simple one-file form | `drop target plus clickable file input fallback` |
| Image crop uploader / 图片裁剪上传 | Output requires exact aspect/size, such as avatar | Original file must remain unmodified | `upload → crop dialog → preview → confirm` |
| Upload queue / 上传队列 | Multiple files need per-file progress, retry, cancel, reorder | One atomic upload | `list of file states with concurrency policy` |
| Attachment list / 附件列表 | Existing files need download/remove/metadata | Files are visual media requiring preview grid | `semantic list with explicit actions` |

## Detailed variants

### File input — 文件选择器

```tsx
<label>上传合同<input type="file" accept="application/pdf" onChange={selectFile} /></label>
```

### Drag-and-drop upload — 拖拽上传区

Always retain a clickable file-input path.

```tsx
<Dropzone accept={{'image/*':['.png','.jpg']}} maxSize={5_000_000} onDrop={upload}><input type="file" accept="image/png,image/jpeg" /><p>拖入图片，或点击选择</p></Dropzone>
```

### Image uploader with crop — 图片上传与裁剪

```tsx
<ImageUploader value={avatar} aspect={1} minSize={[512,512]} onCropComplete={setAvatar} />
```

### Multi-file upload queue — 多文件上传队列

```tsx
<UploadQueue files={files} concurrency={3} onRetry={retry} onCancel={cancel} />
```

### Per-item upload/processing queue — 分项上传/处理队列

Use when multiple items can succeed, fail, retry, or cancel independently. Prefer per-item progress over one ambiguous global spinner.

```tsx
<UploadQueue files={files} renderStatus={file=><progress value={file.sent} max={file.size} />} onRetry={retry} onCancel={cancel} />
```

### Attachment list — 附件列表

```tsx
<ul aria-label="附件">{files.map(f=><li><a href={f.url}>{f.name}</a><span>{formatBytes(f.size)}</span><button aria-label={`移除 ${f.name}`} onClick={()=>remove(f.id)}>移除</button></li>)}</ul>
```
