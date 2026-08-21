# Boolean and mode controls / 布尔与模式控件

This file defines exactly one component family. Select subtypes by boolean versus exclusive value, immediate effect versus form submission, and value choice versus view switching.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Checkbox / 复选框 | Independent boolean included in a form or a set of options | Change takes effect immediately as a system setting | `<input type="checkbox">` |
| Tri-state checkbox / 三态复选框 | Parent summarizes children as all, none, or partially selected | There is no real mixed state | `checked` plus `indeterminate` visual/state handling |
| Switch / 开关 | Immediate on/off setting with visible current state | User submits several choices together later | `role="switch" aria-checked={value}` |
| Radio group / 单选按钮组 | Small mutually exclusive set; comparison and labels should remain visible | Switching changes content views rather than submitting a choice | `<fieldset>` with same-name radios |
| Segmented control / 分段控制器 | Two to five compact peer values or display modes; exactly one is active | Options navigate distinct sections, labels need rich explanation, or items can be independently active | `exclusive value semantics or design-system segmented control` |
| Content switcher / 内容切换器 | Alternate presentations of the same data, such as grid/list | Views are distinct information sections or routes | `<ContentSwitcher value="grid" />` |
| Toggle button / 切换按钮 | One action-like mode can be pressed/unpressed, such as bold or favorite | It represents on/off system configuration | `<button aria-pressed={active}>` |
| Toggle button group / 切换按钮组 | Toolbar modes may allow one or multiple pressed buttons | It is a form answer requiring radio/checkbox semantics | group of `aria-pressed` buttons |
| Checkbox group / 复选框组 | Small set where all choices and labels should be visible and independently comparable | Options are numerous or screen space is tight | `<fieldset>` with checkboxes |

## Detailed variants

### Segmented control — 分段控制器

Switch one value among two to five peer options. It may set a compact exclusive form value or an alternate display mode; it is not view-only. Use tabs instead when peer content panels have section or navigation semantics. Use radio semantics for a form answer, and the design system's documented semantics for a display-mode control.

```tsx
<fieldset><legend>视图</legend><label><input type="radio" name="view" value="grid" />网格</label><label><input type="radio" name="view" value="list" />列表</label></fieldset>
```

Never combine `role="radiogroup"` with `aria-pressed`: radio groups use `radio`/`aria-checked`; pressed action-like buttons use `aria-pressed` without radio-group semantics.

### Content switcher — 内容切换器

Use for alternate presentations of one underlying dataset when the choice is an immediate display mode rather than a submitted answer.

```tsx
<ContentSwitcher value={view} onValueChange={setView} options={[{value:'grid',label:'网格'},{value:'list',label:'列表'}]} />
```

### Radio group — 单选按钮组

Show all mutually exclusive options when comparison matters.

```tsx
<fieldset><legend>配送速度</legend>{speeds.map(x => <label><input type="radio" name="speed" value={x.id} checked={speed===x.id} onChange={()=>setSpeed(x.id)} />{x.name}</label>)}</fieldset>
```

### Checkbox group — 复选框组

Independent boolean selections; do not use radio semantics.

```tsx
<fieldset><legend>通知渠道</legend>{channels.map(x => <label><input type="checkbox" checked={selected.includes(x.id)} onChange={() => toggle(x.id)} />{x.name}</label>)}</fieldset>
```

### Tri-state checkbox — 三态复选框

Use the mixed state only for a parent that summarizes partially selected children; it is not a third user answer.

```tsx
<input ref={el=>{if(el) el.indeterminate=selectedCount>0&&selectedCount<total}} type="checkbox" checked={selectedCount===total} onChange={toggleAll} aria-label="选择全部成员" />
```

### Toggle button — 切换按钮

```tsx
<button type="button" aria-pressed={starred} onClick={()=>setStarred(!starred)}>收藏</button>
```

### Switch — 开关

Changes an immediately effective boolean setting. Use a checkbox when values are submitted together in a form.

```tsx
<button role="switch" aria-checked={enabled} onClick={()=>setEnabled(!enabled)}>邮件通知</button>
```
