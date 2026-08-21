# Disclosure and expandable content / 展开收起与内容披露

This file defines exactly one component family. Select subtypes by single versus coordinated regions, independent versus exclusive expansion, content size, persistence, and nested interaction.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Disclosure / 展开收起 | One independent show/hide region | Several peer sections form a coordinated set | `<details><summary>` or disclosure button |
| Accordion / 手风琴 | Multiple stacked sections; one or many may expand | Peer content requires persistent tab-like navigation | `set of disclosures with heading buttons` |
| Collapse panel / 折叠面板 | Secondary controls/details need temporary vertical expansion in place | Content deserves a separate focused task | `<Collapsible>` |
| Single disclosure / 单区展开收起 | One independent optional region | Several peer sections coordinate expansion | `<details><summary>…</summary>…</details>` |
| Single-open accordion / 单开手风琴 | Only one peer section should stay open | Users must compare several open sections | `<Accordion type="single" />` |
| Multi-open accordion / 多开手风琴 | Several peer sections may stay open for comparison | Vertical length becomes unmanageable | `<Accordion type="multiple" />` |
| Show more-less / 显示更多收起 | Truncated content expands inline | Content is a separate task or destination | `<button aria-expanded={open}>显示更多</button>` |
| Expandable row / 可展开行 | A table/list row reveals secondary details in context | Details need editing space or column comparison | `row disclosure controlling a labelled detail row` |

## Detailed variants

### Accordion — 手风琴

One or more collapsible content sections.

```tsx
<Accordion multiple={false}><AccordionItem value="billing" title="账单设置"><BillingSettings /></AccordionItem></Accordion>
```

### Disclosure — 披露控件 / 展开收起

```tsx
<details><summary>查看技术细节</summary><pre>{details}</pre></details>
```

### Collapsible panel — 可折叠面板

```tsx
<Collapsible open={open} onOpenChange={setOpen} trigger="高级筛选"><AdvancedFilters /></Collapsible>
```

### Accordion chevron rotation — 手风琴箭头旋转

Use as a secondary state cue paired with the label and expanded state; never rely on icon direction alone.

```tsx
<button aria-expanded={open} onClick={toggle}><Chevron aria-hidden className="chevron" />账单设置</button>
```

```css
.chevron{transition:transform 160ms ease}[aria-expanded=true] .chevron{transform:rotate(90deg)}@media(prefers-reduced-motion:reduce){.chevron{transition:none}}
```
