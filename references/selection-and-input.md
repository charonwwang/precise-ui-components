# Selection and input vocabulary

Use these names to disambiguate form controls. Snippets are minimal React/HTML behavior references; map them to the project's own primitives.

## Selection and dropdown family

### Select — 选择器

Choose one known value from a short, finite list. Native example:

```tsx
<label>地区<select value={region} onChange={e => setRegion(e.target.value)}><option value="">请选择</option><option value="cn">中国</option></select></label>
```

Prompt phrase: `单选选择器（single-select），点击触发器打开 listbox，选中后关闭并在触发器回显；不允许自由输入。`

### Searchable select — 可搜索选择器

Filters a known option set but still requires selecting an option. Do not confuse it with free-form autocomplete.

```tsx
<Combobox value={assignee} options={users} searchable onValueChange={setAssignee} />
```

Prompt phrase: `可搜索单选选择器（searchable select），输入只用于过滤，提交值必须来自候选项。`

### Multi-select — 多选选择器 / 标签多选

Select zero or more known values; display selections as removable chips when space permits.

```tsx
<MultiSelect values={tags} options={tagOptions} onValuesChange={setTags} renderValue="chips" />
```

Prompt phrase: `标签式多选（multi-select with chips），面板保持打开以连续选择；已选项可用 Backspace 或关闭按钮移除。`

### Grouped select — 分组选择器

Groups options under non-selectable headings.

```tsx
<select><optgroup label="华东"><option>上海</option><option>杭州</option></optgroup><optgroup label="华南"><option>深圳</option></optgroup></select>
```

Prompt phrase: `分组选择器（grouped select），分组标题不可选择，组选项保持单选语义。`

### Cascader — 级联选择器

Select a value through dependent hierarchical columns, such as province/city/district. The video transcription “极连” should be normalized to “级联”.

```tsx
<Cascader options={regions} value={path} onValueChange={setPath} changeOnSelect={false} />
```

Prompt phrase: `三级级联选择器（cascader），每列展示当前层级，选择父项加载/显示子项，最终提交完整路径。`

### Tree select — 树选择器

Select nodes from a collapsible tree; useful when hierarchy is deep or branches expand independently.

```tsx
<TreeSelect nodes={departments} value={departmentId} onValueChange={setDepartmentId} />
```

Prompt phrase: `树选择器（tree select），展开/折叠与选中是两个独立操作，箭头键遍历可见节点。`

### Combobox — 组合框

An editable input with suggestions. It may allow a custom value; say explicitly whether it does.

```tsx
<Combobox inputValue={query} onInputValueChange={setQuery} options={results} allowCustomValue />
```

Prompt phrase: `可自由输入的组合框（editable combobox），输入时显示建议列表；Enter 选建议，未匹配文本也可提交。`

### Autocomplete / typeahead — 自动补全 / 即时建议

Suggest completions from local or remote data while typing. Specify debounce, minimum characters, and no-result behavior.

```tsx
<Autocomplete query={query} onQueryChange={setQuery} loadOptions={searchCities} debounceMs={250} minChars={2} />
```

Prompt phrase: `远程自动补全（async autocomplete/typeahead），输入 2 字符后 250ms 防抖请求，显示加载、无结果和失败状态。`

### Listbox — 列表框

An always-visible selectable list, not a floating dropdown.

```tsx
<ul role="listbox" aria-label="主题">{themes.map(x => <li role="option" aria-selected={x.id === theme} onClick={() => setTheme(x.id)}>{x.name}</li>)}</ul>
```

### Segmented control — 分段控制器

Switch one value among two to five peer options. Use tabs instead when content panels have navigation semantics.

```tsx
<fieldset><legend>视图</legend><label><input type="radio" name="view" value="grid" />网格</label><label><input type="radio" name="view" value="list" />列表</label></fieldset>
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

### Transfer list — 穿梭框 / 双栏选择器

Move many items between available and selected collections; best for bulk administration, not ordinary forms.

```tsx
<TransferList items={members} selectedIds={memberIds} onChange={setMemberIds} searchable />
```

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

### Mega menu — 大型菜单 / 超级菜单

A wide navigation panel with grouped destinations, descriptions, or promotions. It is navigation, not a form select.

```tsx
<nav aria-label="产品"><MegaMenu trigger="产品" groups={[{heading:'按团队', links:teamLinks},{heading:'按场景', links:useCaseLinks}]} /></nav>
```

## Text and numeric input family

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

### Stepper input — 步进器 / 数量选择器

```tsx
<div role="group" aria-label="数量"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><output>{qty}</output><button onClick={()=>setQty(qty+1)}>+</button></div>
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

### Inline editable text — 行内编辑

Read mode becomes an input on explicit action; Escape cancels, Enter saves.

```tsx
<InlineEdit value={title} onSave={setTitle} triggerLabel="编辑标题" submitOn="Enter" cancelOn="Escape" />
```

### Slider — 滑块

Use for approximate selection over a continuum.

```tsx
<label>音量 <input type="range" min="0" max="100" value={volume} onChange={e=>setVolume(+e.target.value)} /><output>{volume}%</output></label>
```

### Range slider — 范围滑块

```tsx
<RangeSlider label="价格区间" min={0} max={5000} value={[minPrice,maxPrice]} onValueChange={setPrices} />
```

### Switch — 开关

Changes an immediately effective boolean setting. Use a checkbox when values are submitted together in a form.

```tsx
<button role="switch" aria-checked={enabled} onClick={()=>setEnabled(!enabled)}>邮件通知</button>
```

## Input adornments and states

- `leading icon / 前置图标`: identifies meaning; keep decorative icons hidden from assistive tech.
- `prefix/suffix / 前后缀`: fixed semantic content such as currency or domain.
- `clear button / 清除按钮`: appears only when a value exists and has an accessible name.
- `helper text / 帮助文本`: stable guidance below the field.
- `validation message / 校验信息`: associate through `aria-describedby`; set `aria-invalid=true` on error.
- `character counter / 字数计数`: use an output; avoid noisy live announcements on every keystroke.
- `read-only / 只读`: focusable/selectable value that cannot change; distinct from disabled.
- `disabled / 禁用`: unavailable action; explain why nearby when the reason is not obvious.
