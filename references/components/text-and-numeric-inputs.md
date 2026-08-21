# Text, numeric, and specialized inputs / 文本、数值与专用输入

This file defines exactly one component family. Select subtypes by data type, free-form versus structured value, precision, formatting, validation, and tokenization.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Mentions input / 提及输入 | Rich text/plain text entry needs entity insertion after `@`, `#`, or another trigger | The whole field value must be one selected entity | `<Mentions prefix={["@","#"]} />` |
| Text field / 单行文本框 | Short unconstrained plain text | Multiple paragraphs or structured tokens are expected | `<input type="text">` |
| Textarea / 多行文本框 | Plain-text paragraphs, comments, or descriptions | Formatting or structured blocks are required | `<textarea rows={5}>` |
| Search field / 搜索框 | Query retrieves or filters results; clear and submit behavior are meaningful | Field sets an entity/value rather than a query | `<form role="search">` |
| Number input / 数字输入框 | Exact numeric typing and validation matter | Value is an identifier, phone, postal code, or card number | `<input type="number" min max step>` |
| Spinbutton / 步进数字框 | Discrete numeric range benefits from increment/decrement controls | Range is broad/approximate or direct typing is rare | `number input with stepper buttons` |
| Slider / 单值滑块 | Approximate value over a continuum; immediate preview is useful | Exact value entry is important | `<input type="range">` plus output |
| Currency input / 金额输入框 | Locale-aware decimal value with currency prefix/suffix | It is display-only money | `raw numeric model + formatted presentation` |
| Masked input / 掩码输入 | Format is fixed and positional, such as expiry or license pattern | Formatting varies by locale or user | `masked text input with raw value separation` |
| OTP/PIN input / 验证码输入 | Short fixed-length verification code; paste and autofill matter | It is a long secret/password | `one semantic input styled as cells` |
| Tag input / 标签输入 | Users create multiple free-form tokens | Tokens must come from controlled vocabulary | `<TagInput separators={["Enter"]} />` |
| Rating / 评分控件 | User supplies an ordinal preference, commonly 1–5 | Need a precise continuous metric or read-only KPI | radio-like `<Rating count={5} />` |

## Detailed variants

### Text field — 单行文本框

```tsx
<label htmlFor="name">项目名称</label><input id="name" value={name} onChange={e=>setName(e.target.value)} autoComplete="organization" />
```

### Password field — 密码框

```tsx
<label htmlFor="password">密码</label><input id="password" type={show?'text':'password'} autoComplete="current-password" /><button type="button" onClick={()=>setShow(!show)}>{show?'隐藏':'显示'}密码</button>
```

### Search field — 搜索框

```tsx
<form role="search" onSubmit={submit}><label className="sr-only" htmlFor="q">搜索</label><input id="q" type="search" value={q} onChange={e=>setQ(e.target.value)} /><button>搜索</button></form>
```

### Textarea — 多行文本框

```tsx
<label htmlFor="bio">简介</label><textarea id="bio" rows={5} maxLength={300} value={bio} onChange={e=>setBio(e.target.value)} /><output>{bio.length}/300</output>
```

### Number input — 数字输入框

Use when direct typing matters. Do not use `type=number` for identifiers, phone numbers, or credit-card numbers.

```tsx
<label>数量<input type="number" min={1} max={99} step={1} inputMode="numeric" value={qty} onChange={e=>setQty(e.currentTarget.valueAsNumber)} /></label>
```

### Currency input — 金额输入框

Keep a raw numeric value separate from localized display formatting.

```tsx
<label>预算<span aria-hidden>¥</span><input inputMode="decimal" value={amountText} onChange={parseAmount} aria-describedby="currency" /></label><span id="currency">人民币</span>
```

### Masked input — 格式化输入框

```tsx
<MaskedInput label="银行卡有效期" mask="99/99" inputMode="numeric" value={expiry} onChange={setExpiry} />
```

### OTP / PIN input — 验证码 / PIN 输入

Prefer one semantic input styled as cells unless product requirements demand separate fields.

```tsx
<label>6 位验证码<input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,''))} /></label>
```

### Tag input — 标签输入框

Turns submitted tokens into removable chips; specify delimiter, duplicate handling, and maximum count.

```tsx
<TagInput values={tags} onValuesChange={setTags} separators={["Enter",","]} maxTags={10} allowDuplicates={false} />
```

### Slider — 滑块

Use for approximate selection over a continuum.

```tsx
<label>音量 <input type="range" min="0" max="100" value={volume} onChange={e=>setVolume(+e.target.value)} /><output>{volume}%</output></label>
```

### Mentions input — 提及输入框

Use when free text contains inserted entities triggered by `@`, `#`, or another prefix. Persist stable entity IDs separately from display labels when references must survive renames.

```tsx
<Mentions value={text} prefix={["@","#"]} options={suggestions} onSearch={loadEntities} onChange={setText} />
```

### Rating — 评分控件

Use for a small ordinal scale such as 1–5. State whether half values, clearing, and read-only display are allowed; provide textual labels for each value.

```tsx
<Rating value={rating} count={5} labels={['很差','较差','一般','满意','很好']} onValueChange={setRating} />
```
