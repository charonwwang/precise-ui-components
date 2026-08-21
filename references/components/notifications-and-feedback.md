# Notifications and feedback / 通知与反馈

This file defines exactly one component family. Select subtypes by scope, urgency, persistence, interruption, required action, and announcement behavior.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Inline notification / 行内通知 | Nondisruptive feedback/status belongs to a task flow and persists near content | Short global confirmation has no local anchor | `inline alert/status region` |
| Toast/snackbar / 轻提示 | Short, non-blocking result after an action; no critical detail | User must act, revisit, or compare details | `live region; timed only when safe` |
| Actionable notification / 可操作通知 | One follow-up action resolves or explores the message | Several actions or complex resolution | `persistent inline/toast with one action` |
| Callout / 说明提示块 | Contextual guidance loads with the page before action; persistent and not dismissible | It reports the result of an action | `static callout near relevant content` |
| Banner / 横幅通知 | Product/system-wide issue not specific to one task | Message belongs to one field or local panel | `persistent page/site-level region` |
| Alert / 警报 | Brief important message should be announced without taking focus | A response is required | `role="alert"` |
| Status / 状态消息 | Polite background update such as saved, synced, or results count | Urgent interruption | `role="status"` |
| Notification center / 通知中心 | Users need history, unread state, filtering, or later action | One ephemeral confirmation | `persistent list/feed of notifications` |

## Detailed variants

### Alert — 警告提示 / 页面内提示

Persistent message in content flow.

```tsx
<div role="alert"><strong>保存失败</strong><p>网络不可用，请检查连接后重试。</p><button onClick={retry}>重试</button></div>
```

### Banner — 横幅通知

Page- or site-level persistent announcement.

```tsx
<aside aria-label="系统公告" className="banner">系统将在 22:00 维护。<a href="/status">查看详情</a></aside>
```

### Toast / snackbar — 轻提示 / 消息条

Temporary non-modal feedback after an action. Do not place critical decisions only in a disappearing toast.

```tsx
toast.success('已保存', {action:{label:'撤销',onClick:undo}, duration:5000})
```

### Empty state — 空状态

```tsx
<EmptyState title="暂无项目" description="创建第一个项目以开始协作。" action={<button onClick={createProject}>新建项目</button>} />
```

### Error state — 错误状态

```tsx
<ErrorState title="无法加载订单" detail="请求超时" actions={<><button onClick={retry}>重试</button><a href="/status">服务状态</a></>} />
```

### Result page — 结果页

```tsx
<Result status="success" title="支付成功" description={`订单号 ${orderId}`} actions={<a href="/orders">查看订单</a>} />
```

### Status message — 状态消息

Use a polite live region for background outcomes that should be announced without interrupting the user.

```tsx
<p role="status" aria-live="polite">{saveState==='saved'?'已自动保存':''}</p>
```

### Actionable notification — 可操作通知

Use a persistent inline or toast-style message with one clear follow-up action. If resolution needs several controls, link to a page or dialog.

```tsx
<Notification persistent tone="warning" title="付款方式即将过期" action={<a href="/billing">更新</a>} />
```

### Callout — 说明提示块

Use persistent contextual guidance that loads with the page before a user acts. It is not success/error feedback and is not dismissible.

```tsx
<aside className="callout" aria-label="导入说明"><strong>导入前请确认</strong><p>CSV 第一行必须包含字段名。</p><a href="/docs/import">查看格式</a></aside>
```

### Notification center — 通知中心

Use when messages require history, unread state, filtering, or later action; a toast alone cannot provide revisitability.

```tsx
<NotificationCenter items={notifications} filter={filter} onMarkRead={markRead} onOpenItem={openNotification} />
```
