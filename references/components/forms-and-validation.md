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

### Inline validation — 行内校验

```tsx
<input id="email" aria-invalid={!!error} aria-describedby={error?'email-error':undefined} />{error&&<p id="email-error" role="alert">请输入有效邮箱</p>}
```

### Fieldset — 表单分组

```tsx
<fieldset><legend>账单地址</legend><AddressFields /></fieldset>
```
