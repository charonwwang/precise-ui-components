# Lists, tables, grids, and trees / 列表、表格、网格与树

This file defines exactly one component family. Select subtypes by one-dimensional versus tabular data, read-only versus interactive cells, hierarchy, navigation model, and virtualization threshold.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Selectable card/tile / 可选择卡片 | Rich visual options such as plans; radio or checkbox selection model | Card navigates or triggers a command | `radio/checkbox semantics over card group` |
| Semantic list / 语义列表 | Items are one-dimensional and do not require column comparison | Values align into comparable fields | `<ul>`/`<ol>` |
| Description list / 描述列表 | Key-value facts for one entity | Many entities must be compared row-by-row | `<dl><dt><dd>` |
| Structured list / 结构化列表 | Rows have repeated secondary fields but remain primarily navigational/read-only | Column operations, headers, sorting, or editing matter | `repeated row layout with clear headings` |
| Static data table / 静态数据表 | Read-only tabular comparison; ordinary Tab order is acceptable | Spreadsheet-like cell navigation/editing is required | native `<table>` |
| Interactive data table / 交互数据表 | Rows support sort/filter/select/actions but cell-by-cell keyboard grid behavior is unnecessary | Dense editable cells require arrow-key navigation | `semantic table plus controls` |
| Data grid / 数据网格 | Spreadsheet-like interactive/editable cells, selection, copy/paste, arrow navigation | Data is mostly read-only; simpler table is sufficient | `APG grid pattern with managed focus` |
| Virtualized data grid / 虚拟化数据网格 | Spreadsheet-like grid behavior is required across enough rows/columns that windowing is necessary | It is only a large read-only table or all cells can render safely | `preserve grid focus/row identity while windowing; expose total row/column counts` |
| Tree view / 树形视图 | Hierarchical list with expand/collapse and node selection/navigation | Each node has comparable columns | `APG tree pattern` |
| Treegrid / 树形数据网格 | Hierarchical rows plus tabular columns and interactive cells | Hierarchy alone or flat data alone | `APG treegrid pattern` |
| Feed / 信息流 | New articles/items load as user scrolls and each item is a content region | Fixed dataset or tabular comparison | `feed/article semantics and position restoration` |
| Timeline / 时间线 | Chronological sequence and temporal relation are primary | Users need sortable columns or dense comparison | ordered list with `<time>` |
| Virtualized collection / 虚拟化集合 | Rendering thousands of rows/items is a measured bottleneck | Dataset is modest; native DOM improves accessibility/search | `virtualization with stable keys and accessible counts` |
| Editable combobox / 可编辑组合框 | Suggestions help, but an unmatched custom value is valid | Values must be controlled vocabulary | `<Combobox allowCustomValue />` |
| Datalist / 原生建议列表 | Lightweight native suggestions where custom values remain valid and advanced popup behavior is unnecessary | Need reliable rich rendering, async states, or controlled keyboard behavior | `<input list="cities" /><datalist id="cities">…</datalist>` |
| Listbox / 列表框 | Options should remain visible; selection itself is the task; one or many choices | Space is constrained and the list should collapse | `role="listbox"` with `role="option"` |

## Detailed variants

### Selectable card — 可选择卡片

Use for visually rich options such as plans. Preserve radio semantics for single selection and checkbox semantics for multiple selection.

```tsx
<label className="selectable-card"><input type="radio" name="plan" value={plan.id} checked={value===plan.id} onChange={()=>setValue(plan.id)} /><PlanSummary plan={plan} /></label>
```

### Data table — 数据表格

Columns describe comparable fields; rows represent records. Use native table semantics.

```tsx
<table><caption>订单</caption><thead><tr><th scope="col">编号</th><th scope="col">状态</th></tr></thead><tbody>{orders.map(o=><tr><th scope="row">{o.id}</th><td>{o.status}</td></tr>)}</tbody></table>
```

### Sortable table — 可排序表格

```tsx
<th aria-sort={sort==='amount'?'descending':'none'}><button onClick={()=>setSort('amount')}>金额</button></th>
```

### Selectable table — 可选择表格

```tsx
<tr aria-selected={selected.has(row.id)}><td><input type="checkbox" aria-label={`选择订单 ${row.id}`} checked={selected.has(row.id)} onChange={()=>toggle(row.id)} /></td></tr>
```

### Virtualized table — 虚拟化表格

For very large datasets; preserve headers, row identity, keyboard access, and screen-reader alternatives.

```tsx
<VirtualTable rows={rows} rowKey="id" estimatedRowHeight={44} columns={columns} overscan={8} />
```

### Description list — 描述列表 / 键值详情

```tsx
<dl><dt>负责人</dt><dd>{owner}</dd><dt>创建时间</dt><dd><time dateTime={createdAt}>{formatted}</time></dd></dl>
```

### List — 列表

```tsx
<ul>{tasks.map(t=><li key={t.id}><a href={`/tasks/${t.id}`}>{t.title}</a></li>)}</ul>
```

### Feed — 信息流

```tsx
<section aria-label="动态">{events.map(e=><article key={e.id}><h3>{e.actor}</h3><p>{e.summary}</p></article>)}</section>
```

### Tree view — 树形视图

```tsx
<TreeView aria-label="文件" nodes={files} expandedIds={expanded} selectedId={selected} onExpandedChange={setExpanded} onSelect={setSelected} />
```

### Timeline — 时间线

```tsx
<ol className="timeline">{events.map(e=><li><time dateTime={e.at}>{e.label}</time><p>{e.detail}</p></li>)}</ol>
```

### Structured list — 结构化列表

Use repeated row layouts with secondary fields when content is primarily read-only or navigational. Switch to a table when column comparison and headers become essential.

```tsx
<ul className="structured-list">{services.map(s=><li><a href={`/services/${s.id}`}><strong>{s.name}</strong><span>{s.region}</span><Badge>{s.status}</Badge></a></li>)}</ul>
```

### Data grid — 数据网格

Use for spreadsheet-like interactive cells, selection, editing, copy/paste, and arrow-key navigation. Do not apply grid semantics to a merely sortable table.

```tsx
<DataGrid rows={rows} columns={columns} editable selectionMode="cell" onCellsChange={updateCells} />
```

### Virtualized data grid — 虚拟化数据网格

Use only when both spreadsheet-like grid interaction and large-data windowing are required. Virtualization is an implementation strategy, so it must not weaken the grid's cell focus, editing, selection, or announced row/column position.

```tsx
<VirtualizedDataGrid rows={rows} columns={columns} rowKey="id" editable overscan={8} aria-rowcount={rows.length} onCellsChange={updateCells} />
```

Reject this for a large read-only dataset that only needs row sorting/filtering; that remains a virtualized table.

### Treegrid — 树形数据网格

Use when hierarchical rows also have comparable columns or editable cells. Use a tree for hierarchy without columns and a data grid for flat rows.

```tsx
<TreeGrid rows={hierarchicalRows} columns={columns} expandedIds={expanded} onExpandedChange={setExpanded} />
```

### Listbox — 列表框

An always-visible selectable list, not a floating dropdown.

```tsx
<ul role="listbox" aria-label="主题">{themes.map(x => <li role="option" aria-selected={x.id === theme} onClick={() => setTheme(x.id)}>{x.name}</li>)}</ul>
```

### Datalist — 原生建议列表

Use for lightweight native suggestions when custom values remain valid. Do not promise the rendering or async behavior of a fully controlled combobox.

```tsx
<label>浏览器<input list="browsers" value={browser} onChange={e=>setBrowser(e.target.value)} /></label><datalist id="browsers"><option value="Chrome" /><option value="Firefox" /></datalist>
```

### Inline editable text — 行内编辑

Read mode becomes an input on explicit action; Escape cancels, Enter saves.

```tsx
<InlineEdit value={title} onSave={setTitle} triggerLabel="编辑标题" submitOn="Enter" cancelOn="Escape" />
```
