# Visual modifiers after semantic selection

Use this reference only after the component family and semantic subtype are known. A visual modifier changes presentation without changing the value model, command, navigation target, modality, focus contract, or persistence.

## Modifier axes

| Axis | Common terms | Decision rule |
|---|---|---|
| Emphasis / 强调度 | solid/filled, outline, ghost, text | Derive from action priority and surface contrast. Do not infer primary/secondary semantics from fill alone. |
| Shape / 形状 | square, rounded, pill | Use the product radius system. Pill is a shape, not a button, tab, chip, or segmented-control subtype. |
| Width / 宽度 | intrinsic, fixed, full-width | Full-width is useful in narrow forms or stacked mobile actions; it does not make an action primary. |
| Density / 密度 | compact, default, comfortable | Choose from data density and input method; preserve target size and legibility. |
| Surface / 表面 | flat, bordered, elevated, inset | Elevation communicates layering only when a real surface relationship exists. |
| Tone / 语气 | neutral, accent, success, warning, danger | Tone follows meaning and consequence. Never rely on color alone. |
| Tab treatment / 标签页外观 | underline, contained/card, pill, vertical | Preserve the selected route/content/workspace tab semantics and keyboard model. A pill-shaped form choice may instead be radio or segmented control. |

## Composition format

Write semantic subtype first, then modifiers:

```text
主要按钮 / Primary button
Modifiers: solid emphasis, pill shape, intrinsic width, danger tone
```

```text
内容标签页 / Content tabs
Modifiers: underline treatment, compact density, horizontal placement
```

Avoid standalone requests such as “use a pill button” when the action priority and behavior are unknown. Resolve the behavior first, then apply only the modifiers supported by the existing design system.

## Invariants

- Visual treatment must not change native or ARIA semantics.
- Preserve visible focus, contrast, disabled distinction, text scaling, and touch target size.
- Do not use shape or color as the only selected, error, destructive, or current-state cue.
- Reuse existing tokens for radius, spacing, typography, elevation, tone, density, and motion.
- In narrow layouts, change placement or width without silently changing the task, value, or dismissal model.
- For bidirectional locales, use logical placement terms (`start`/`end`) and logical CSS properties instead of baking meaning into left/right.
