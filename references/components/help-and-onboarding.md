# Help and onboarding / 帮助与引导

This file defines exactly one component family. Select subtypes by contextual versus sequenced guidance, first-use versus persistent help, target anchoring, dismissal, replay, and user progress.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Contextual help / 上下文帮助 | Optional explanation is tied to a field or concept | First-run sequence spans several targets | `help link, toggletip, or popover` |
| Coach mark / 教学提示 | One feature needs a targeted first-use explanation | Multi-step product walkthrough | `anchored teaching popover with dismiss` |
| Product tour / 产品导览 | Ordered onboarding spans several UI targets | One critical task should be learned by doing inline | `<Tour steps={steps} />`, skip and replay support |
| Help link / 帮助链接 | Full explanation belongs in documentation | A tiny local hint is sufficient | `<a href="/help/topic">了解详情</a>` |
| Empty-state guidance / 空状态引导 | No data exists and one clear next step helps | The state is loading or failed | `<EmptyState action={<button>新建</button>} />` |

## Detailed variants

### Keyboard hint — 键盘提示

```tsx
<span>搜索 <kbd>⌘</kbd><kbd>K</kbd></span>
```

### Coach mark — 教学提示

Use for one targeted first-use explanation. It must be dismissible and should not repeatedly interrupt returning users.

```tsx
<CoachMark targetRef={exportButtonRef} open={!seenExportHint} onDismiss={rememberHint} title="导出报表">可选择 CSV 或 XLSX。</CoachMark>
```

### Product tour — 产品导览

Use for an ordered walkthrough across several interface targets. Provide skip, previous, next, finish, and a way to replay it later.

```tsx
<Tour open={tourOpen} steps={tourSteps} current={step} onStepChange={setStep} onSkip={finishTour} onFinish={finishTour} />
```
