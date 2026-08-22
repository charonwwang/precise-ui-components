# Forms and validation / 表单与校验

This file defines exactly one component family. Select subtypes by field grouping, submission scope, validation timing, error location, required state, help association, and action placement.

## Decision table

| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Field validation / 字段校验 | Error is tied to one field and should appear near it | Whole task/system failed | `aria-invalid` + described error |
| Form / 表单 | Related fields submit one task | Each control saves independently | `<form onSubmit={submit}>…</form>` |
| Form field / 表单字段 | Label, control, help, and error form one unit | Content is display-only | `<Field label="邮箱" error={error}><input /></Field>` |
| Fieldset / 表单分组 | Related controls need one group label | Visual grouping has no semantic relation | `<fieldset><legend>通知方式</legend>…</fieldset>` |
| Error summary / 错误摘要 | Submission has several errors or a long form | Only one nearby field failed | `focusable summary linking to invalid fields` |
| Input group / 输入组合 | Several fields form one structured value | Fields are unrelated | `labelled group with per-part labels` |
| Form actions / 表单操作区 | Submit, cancel, and secondary actions need stable placement | Actions belong to separate tasks | `primary submit + secondary cancel` |
| Helper text / 字段帮助文本 | Persistent format or consequence guidance prevents errors | Optional supplemental explanation belongs in toggletip | `aria-describedby` associated help text |

## Detailed variants

### Field validation / 字段校验

Validate at a useful time: on submission by default, or after blur/change when early feedback helps. Keep the message next to the field, associate it with `aria-describedby`, and do not repeatedly announce the same error on every keystroke.

```tsx
<><label htmlFor="email">邮箱</label><input id="email" aria-invalid={!!error} aria-describedby={error?'email-error':undefined} />{error&&<p id="email-error" role="alert">请输入有效邮箱</p>}</>
```

### Form / 表单

Use one form for one coherent submission boundary. Native submission semantics must still work when JavaScript handlers enhance validation or async persistence.

```tsx
<form onSubmit={handleSubmit(save)} noValidate><AccountFields /><button type="submit" disabled={saving}>保存</button></form>
```

### Form field / 表单字段

Keep the persistent label, control, help, error, required state, disabled state, and read-only behavior in one field contract. A placeholder is not the label.

```tsx
<Field label="项目名称" htmlFor="name" help="最多 80 个字符" error={errors.name}><input id="name" name="name" required maxLength={80} /></Field>
```

### Fieldset / 表单分组

Use `fieldset` and `legend` when several controls answer one grouped question, especially radio buttons and related checkboxes.

```tsx
<fieldset><legend>通知方式</legend><label><input type="checkbox" name="channel" value="email" />邮件</label><label><input type="checkbox" name="channel" value="sms" />短信</label></fieldset>
```

### Error summary / 错误摘要

After a failed submission with several errors, move focus to a summary whose links target the invalid controls. Keep the inline field errors too; the summary is navigation and overview, not a replacement.

```tsx
<div role="alert" tabIndex={-1} ref={summaryRef}><h2>请修正 2 项错误</h2><ul><li><a href="#email">邮箱格式不正确</a></li><li><a href="#company">请输入公司名称</a></li></ul></div>
```

### Input group / 输入组合

Use when several inputs form one structured value. Give the group a name and keep each part distinguishable; do not concatenate unrelated fields merely to achieve a compact visual layout.

```tsx
<fieldset><legend>有效期</legend><label htmlFor="expiry-month">月份</label><input id="expiry-month" inputMode="numeric" /><label htmlFor="expiry-year">年份</label><input id="expiry-year" inputMode="numeric" /></fieldset>
```

### Form actions / 表单操作区

Keep the primary submit action stable and make secondary actions explicit. Disable or mark the submitting action as busy to prevent duplicate submission; do not disable unrelated escape paths without reason.

```tsx
<div className="form-actions"><button type="submit" aria-busy={saving} disabled={saving}>{saving?'保存中…':'保存'}</button><button type="button" onClick={cancel}>取消</button></div>
```

### Helper text / 字段帮助文本

Use persistent helper text for format, constraints, or consequences that users need before entering a value. Associate help and errors without replacing one with the other.

```tsx
<><label htmlFor="slug">地址标识</label><input id="slug" aria-describedby={`slug-help${error?' slug-error':''}`} /><p id="slug-help">仅使用小写字母、数字和连字符。</p>{error&&<p id="slug-error">该地址标识已被使用。</p>}</>
```
