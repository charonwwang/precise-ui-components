# Search, filtering, and query construction / 搜索、筛选与查询构建

This file defines exactly one component family. Select subtypes by query scope, retrieval versus local filtering, filter complexity, expert operators, result count, and persistence.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Global search / 全局搜索 | Query spans the whole product/site and is a primary discovery path | Only current component data is searched | prominent `role="search"`, route/results page |
| Page search / 页面搜索 | Query filters or retrieves within one page domain | Dataset is tiny and fully visible | `page-level search form` |
| Component/table search / 组件内搜索 | Query filters one table/list/tree | Search scope would be unclear outside the component | `search inside labelled toolbar` |
| Expandable search / 可展开搜索 | Toolbar space is constrained and search is secondary | Search is frequent or current query must remain visible | `icon trigger expands into labelled field` |
| Filter chips / 筛选标签 | Few common filters should be toggled quickly and remain visible | Many dimensions or complex operators | `toggle/removable chips with clear selected state` |
| Filter bar / 筛选栏 | Several high-frequency filters affect one result set | Filters are numerous/advanced and would overwhelm the page | `compact fields + applied state + clear all` |
| Faceted filter / 分面筛选 | Large catalog/search where counts by category help refinement | Data lacks stable facets | `checkbox/range groups with result counts` |
| Advanced filter drawer / 高级筛选抽屉 | Many optional filters need more space without leaving results | Filters must be constantly visible for comparison | `drawer with apply/reset and dirty state` |
| Query builder / 查询构建器 | Expert users combine fields, operators, groups, AND/OR rules | Ordinary users need a few simple filters | `structured rules model and validation` |
| Command palette / 命令面板 | Keyboard-first search across actions and destinations | User is searching domain data/content only | `modal combobox/list of commands` |

## Detailed variants

### Command palette — 命令面板

Use for keyboard-first search across destinations and executable commands. Distinguish result types and do not treat it as domain-data search. An editable search field controlling command results may correctly use combobox + listbox semantics; the command outcome does not invalidate that input/popup pattern.

```tsx
<CommandPalette shortcut="Mod+K" groups={[{label:'页面',items:routes},{label:'命令',items:commands}]} onSelect={executeOrNavigate} />
```

### Global search — 全局搜索

Searches across the whole product or site and usually routes to a unified results experience. State the searchable entity types and keep the query in the URL when results are navigable/shareable.

```tsx
<form role="search" action="/search"><label className="sr-only" htmlFor="global-q">全局搜索</label><input id="global-q" name="q" type="search" placeholder="搜索文档、用户和项目" /><button>搜索</button></form>
```

### Page search — 页面搜索

Searches within one page domain, such as all audit events on the audit page. Do not call it global search merely because it sends a server request.

```tsx
<form role="search" onSubmit={searchAuditEvents}><label htmlFor="audit-q">搜索审计事件</label><input id="audit-q" type="search" value={query} onChange={e=>setQuery(e.target.value)} /><button>搜索</button></form>
```

### Component/table search — 组件内搜索

Filters or retrieves results for one labelled table, list, or tree. Place it in that component's toolbar and announce result-count changes when filtering is asynchronous.

```tsx
<section aria-labelledby="orders-title"><h2 id="orders-title">订单</h2><div role="search"><label htmlFor="order-q">搜索当前订单</label><input id="order-q" type="search" value={query} onChange={filterOrders} /></div><OrdersTable rows={visibleRows} /></section>
```

### Query builder — 查询构建器

Use only for expert users who must combine fields, operators, nested groups, and `AND`/`OR`. Prefer a filter bar for ordinary filtering.

```tsx
<QueryBuilder fields={fields} value={rules} operators={operators} onChange={setRules} maxDepth={3} />
```
