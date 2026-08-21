# Selection and suggestion controls / 选择与建议控件

This file defines exactly one component family. Select subtypes by value model, controlled versus free value, option count, hierarchy, and popup behavior.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Native select / 原生选择器 | Short, predefined, single choice; ordinary forms; mobile-native interaction is valuable | Need rich rows, remote search, hierarchy, or arbitrary values | `<select><option /></select>` |
| Select-only combobox / 只选组合框 | Custom-styled single choice where users should explore without changing the committed value until selection | Native control is sufficient; typing is required | `role="combobox"` + listbox popup, no editable text |
| Searchable select / 可搜索选择器 | Large known set; typed text only filters; submitted value must match an option | Arbitrary values are valid | `<Combobox allowCustomValue={false} />` |
| Autocomplete / 自动补全 | Input is primary and suggestions accelerate entry, often remote or history-based | User merely needs to choose from a stable short list | `<Autocomplete loadOptions debounceMs={250} />` |
| Multi-select / 多选选择器 | Multiple known values, compact field, selections summarized as chips or count | Users must compare every option simultaneously | `<MultiSelect renderValue="chips" />` |
| Grouped select / 分组选择器 | Flat selection with a small number of non-selectable category headings | Parent-child path matters or groups expand independently | `<optgroup>` or grouped listbox |
| Cascader / 级联选择器 | User chooses a path through predictable dependent levels, such as province/city/district | Hierarchy is irregular, deep, or needs arbitrary branch expansion | `<Cascader value={path} />` |
| Tree select / 树选择器 | Deep/irregular hierarchy; branches expand independently; one or many nodes may be chosen | The task is browsing files rather than setting a field value | `<TreeSelect nodes={nodes} />` |
| Transfer list / 穿梭框 | Bulk administration: move many items between available and selected sets while both remain visible | A normal form has few choices | `<TransferList selectedIds={ids} />` |
| Color picker / 颜色选择器 | User chooses a color visually and/or by exact code | Only a few branded colors are allowed | native `type="color"` or picker with HEX/RGB fields |

## Detailed variants

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

### Transfer list — 穿梭框 / 双栏选择器

Move many items between available and selected collections; best for bulk administration, not ordinary forms.

```tsx
<TransferList items={members} selectedIds={memberIds} onChange={setMemberIds} searchable />
```

### Color picker — 颜色选择器

Use a native picker for simple color entry; use a custom picker only when exact formats, alpha, swatches, or contrast preview are required.

```tsx
<label>品牌色<input type="color" value={color} onChange={e=>setColor(e.target.value)} /></label><output>{color}</output>
```
