# Cards, identity, and compact status / 卡片、身份与紧凑状态

This file defines exactly one component family. Select subtypes by grouping, whole-surface action, selection, expansion, identity density, and compact status semantics.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Base card/tile / 基础卡片 | Group short information and possibly internal actions | It needs one whole-card navigation target | `<article>` with explicit links/buttons |
| Clickable card/tile / 可点击卡片 | Entire surface navigates to one destination; no nested actions | Multiple independent actions exist | `single stretched link/interactive target` |
| Selectable card/tile / 可选择卡片 | Rich visual options use a radio or checkbox value model | Card navigates or triggers a command | `radio/checkbox semantics over card group` |
| Expandable card/tile / 可展开卡片 | Reveal secondary content inline while preserving context | Focused task or overlay is more appropriate | `disclosure semantics; separate trigger if nested actions exist` |
| KPI/stat card / 指标卡 | One metric, unit, period, and comparison are primary | Multiple rows/series require a chart/table | `labelled article with value and delta` |
| Persona / 人员信息条 | Avatar plus name, role, presence, and compact metadata identify a person | Only an image identity is needed | `<Persona avatar presence meta />` |
| Avatar / 头像 | Compact visual identity | More person context is necessary | `image with meaningful alt or initials fallback` |
| Badge / 徽标 | Small count/status attached to another object | Full explanation or action is required | `text equivalent; do not rely on color` |
| Tag/chip / 标签胶囊 | Categorization, filter token, input token, or removable entity | It is a binary setting or primary action | `variant-specific semantics: static/button/remove` |
| Status dot / 状态点 | Very compact presence/health paired with text | Color would be the only signal | `dot hidden from AT + visible status label` |

## Detailed variants

### Card — 卡片

Groups one subject's summary and actions. Avoid making the whole card clickable when it contains other interactive controls.

```tsx
<article className="card"><h3><a href={`/projects/${p.id}`}>{p.name}</a></h3><p>{p.summary}</p><button onClick={()=>star(p.id)}>收藏</button></article>
```

### KPI / statistic card — 指标卡

```tsx
<article aria-label="本月收入"><span>本月收入</span><strong>¥128,400</strong><span className="positive">环比 +8.2%</span></article>
```

### Badge — 徽标 / 状态标签

```tsx
<span className="badge" data-tone="success">已完成</span>
```

### Chip / tag — 标签胶囊

```tsx
<span className="chip">前端<button aria-label="移除前端标签" onClick={remove}>×</button></span>
```

### Avatar group — 头像组

```tsx
<ul aria-label="参与者">{users.slice(0,4).map(u=><li><img src={u.avatar} alt={u.name} /></li>)}{users.length>4&&<li>+{users.length-4}</li>}</ul>
```

### Clickable card — 可点击卡片

Use when the entire card navigates to one destination and contains no independent nested actions.

```tsx
<article className="card"><a className="stretched-link" href={`/projects/${p.id}`}><h3>{p.name}</h3><p>{p.summary}</p></a></article>
```

### Selectable card — 可选择卡片

Use for visually rich options such as plans. Preserve radio semantics for single selection and checkbox semantics for multiple selection.

```tsx
<label className="selectable-card"><input type="radio" name="plan" value={plan.id} checked={value===plan.id} onChange={()=>setValue(plan.id)} /><PlanSummary plan={plan} /></label>
```

### Expandable card — 可展开卡片

Use to reveal secondary information inline. If the card contains other actions, give expansion its own button instead of making the whole surface ambiguous.

```tsx
<article><header><h3>{title}</h3><button aria-expanded={open} onClick={()=>setOpen(!open)}>详情</button></header>{open&&<CardDetails />}</article>
```

### Avatar — 头像

```tsx
<img className="avatar" src={user.avatar} alt={`${user.name}的头像`} />
```

### Status dot — 状态点

Never rely on color alone.

```tsx
<span><span className="status-dot bg-green" aria-hidden />在线</span>
```

### Visually hidden text — 视觉隐藏文本

```tsx
<span className="sr-only">在新窗口打开</span>
```
