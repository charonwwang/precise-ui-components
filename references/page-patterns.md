# Page patterns as component compositions

Page patterns are reusable composition hypotheses, not component families. Choose one from the primary user goal, then route every interaction and state to its owning family through `component-index.md`.

## Decision table

| Pattern | Choose for this case | Reject or switch when | Minimum composition |
|---|---|---|---|
| Monitoring dashboard / 监控看板 | Users watch a small set of changing health signals and investigate exceptions | The primary task is editing records or producing a report | shell + global status/KPIs + trends + exception queue + freshness/status |
| Analysis dashboard / 分析看板 | Users compare dimensions, filter, inspect drivers, and form a conclusion | Users only need a live operational status | question/context + filters + overview + comparison/trend + diagnostic detail + data table fallback |
| Operational workspace / 操作工作台 | Users repeatedly act on a queue, canvas, editor, or records while context remains visible | The task is occasional or fits a simple form page | app shell + primary work surface + command area + contextual panel + persistent task state |
| Authentication entry / 登录注册入口 | One identity task, recovery path, or SSO choice gates entry | Identity is only one field inside a broader onboarding flow | trust/product context + one primary auth task + alternatives + recovery + inline validation/status |
| Settings/admin surface / 设置管理页 | Users manage grouped configuration with stable destinations and explicit save scope | The task is a one-off wizard or high-frequency operational queue | local navigation + grouped forms + save boundaries + permissions/consequence feedback |
| Record detail/master-detail / 记录详情或主从页 | Users select a record, inspect it, and take contextual actions while retaining list context | Records require spreadsheet-like comparison/editing | list or route context + identity/status + detail sections + contextual actions + history/recovery |
| Marketing/landing page / 营销落地页 | Users must understand value, trust it, and take one conversion action | Returning users need an application workspace | value proposition + primary CTA + evidence/proof + capabilities + objection handling + repeated CTA + footer navigation |

## Pattern rules

### Dashboards

Do not make a dashboard a collage of unrelated charts. Establish three information levels: overview signals, explanation/trend, and actionable detail. State data freshness, units, comparison period, filter scope, empty/loading/error behavior, and a textual or tabular alternative for charts. Use a monitoring dashboard for “what needs attention now” and an analysis dashboard for “why did this change”.

### Operational workspaces

Keep the primary work surface dominant. Put global navigation in the shell, commands near the object they affect, and secondary context in an inline panel or overlay chosen from available space and attention requirements. Preserve unsaved work, selection, focus, and return position across responsive transformations.

### Authentication entry

Choose one primary identity task per state: sign in, register, recover, or verify. Do not show every method at equal weight. Keep labels persistent, validation local, errors non-destructive to entered values, password-manager behavior intact, and recovery reachable. Explain security-sensitive consequences without inventing trust claims.

### Settings and record detail

Make save scope explicit: per control, per section, or whole page. Separate navigation from mode switching, and destructive account/object actions from ordinary settings. For master-detail layouts, define narrow-screen routing and focus/scroll restoration instead of merely stacking panes.

### Marketing/landing pages

Start from audience, promise, evidence, and conversion—not from a mandatory hero image. Use media only when it demonstrates the product or supports the message. Preserve heading hierarchy, link destinations, performance, responsive reading order, and a useful page without animation.

## Output ledger

For a page request, add a short pattern decision before the component ledger:

```text
Page pattern: Analysis dashboard / 分析看板
Primary goal: explain the weekly conversion drop and identify a segment to act on
Reject: Monitoring dashboard — current health is not the main question
Regions: global filters, KPI overview, trend/segment comparison, diagnostic table, notes/actions
```

Then route filters, charts, tables, navigation, loading, feedback, and overlays independently. The pattern must never become an excuse to introduce components with no user goal.
