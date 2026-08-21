# Buttons, actions, and commands / 按钮、操作与命令

This file defines exactly one component family. Select subtypes by navigation versus mutation, action priority, command density, default action, and destructive consequence.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Menu / 操作菜单 | A compact list of commands or functions | The interaction sets a required form value | `MenuItem onSelect={command}` |
| Context menu / 上下文菜单 | Commands apply to the object or location invoked by right-click/long-press | Commands are global or must always be discoverable | `<ContextMenu targetRef={ref}>` |
| Primary button / 主要按钮 | One dominant action in a region | Several actions are equally important | `<button type="submit">` |
| Secondary/tertiary button / 次要或三级按钮 | Supporting or low-emphasis action | It navigates to another resource | `button, not anchor` |
| Link / 链接 | Navigation or opening a resource/route | In-place mutation or submission | `<a href="…">` |
| Icon button / 图标按钮 | Familiar compact action; accessible name can stay clear | Action is unfamiliar or label is important | `<button aria-label="…"><Icon /></button>` |
| Split button / 分割按钮 | One frequent default action plus closely related alternatives | No clearly dominant default exists | `default button + adjacent menu trigger` |
| Menu button / 菜单按钮 | Several actions fit behind one labeled trigger | Actions must remain immediately visible | `button with menu popup` |
| Overflow menu / 溢出菜单 | Low-frequency row/card/toolbar actions exceed available space | Primary action or destructive risk should be prominent | `icon menu button, commonly ellipsis` |
| Toolbar / 工具栏 | Related controls operate on the same canvas/table/editor | Controls are unrelated page navigation | `role="toolbar"` with roving focus if custom |
| Floating action button / 浮动操作按钮 | One high-frequency mobile/canvas creation action | Dense desktop layout or multiple peers | `fixed/floating labeled icon button` |

## Detailed variants

### Dropdown menu — 下拉操作菜单

Presents commands, not form values.

```tsx
<Menu trigger={<button>更多操作</button>}><MenuItem onSelect={duplicate}>复制</MenuItem><MenuItem onSelect={archive}>归档</MenuItem></Menu>
```

### Split button — 分割按钮

Primary area runs the default action; adjacent arrow opens alternative actions.

```tsx
<div role="group" aria-label="发布选项"><button onClick={publish}>发布</button><Menu trigger={<button aria-label="更多发布选项">▾</button>}><MenuItem onSelect={schedule}>定时发布</MenuItem></Menu></div>
```

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

### Toolbar — 工具栏

```tsx
<div role="toolbar" aria-label="编辑工具"><button onClick={bold} aria-pressed={isBold}>粗体</button><button onClick={link}>插入链接</button></div>
```

### Overflow menu — 溢出菜单

Use for low-frequency contextual actions that do not fit in a row, card, or toolbar. Keep the primary action visible.

```tsx
<Menu trigger={<button aria-label="更多操作">•••</button>}><MenuItem onSelect={duplicate}>复制</MenuItem><MenuItem onSelect={archive}>归档</MenuItem></Menu>
```

### Context menu — 右键菜单 / 上下文菜单

Commands depend on the clicked object. Provide keyboard alternatives.

```tsx
<ContextMenu targetRef={rowRef}><MenuItem onSelect={rename}>重命名</MenuItem><MenuItem onSelect={remove}>删除</MenuItem></ContextMenu>
```

### Menubar — 菜单栏

Desktop-style persistent command categories with arrow-key navigation.

```tsx
<div role="menubar"><Menu trigger="文件"><MenuItem onSelect={save}>保存</MenuItem></Menu><Menu trigger="编辑"><MenuItem onSelect={undo}>撤销</MenuItem></Menu></div>
```
