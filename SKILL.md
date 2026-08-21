---
name: ui-spec
description: Translate vague UI requests into precise Chinese and English component terminology, choose the correct variant, and implement it in an existing frontend stack. Use for frontend component selection, UI specifications, AI coding prompts, design-to-code work, or when terms such as dropdown, input, date picker, sidebar, progress, modal, table, navigation, upload, or form are ambiguous.
---

# UI Spec

Turn product intent into an implementation-ready component specification, then implement it when requested.

## Working method

1. Inspect the repository before choosing syntax, packages, styling conventions, and design-system components. Determine the actual framework, version, UI library, form/state conventions, router, styling system, SSR boundary, and test setup. Reuse the existing stack and primitives.
2. Resolve each vague noun to a precise component variant. State both Chinese and English names on first mention.
3. For an ambiguous family, read the decision matrix first. Select with explicit axes: user goal, value model, information structure, interaction weight, persistence, data volume, and device context.
4. Record the selected subtype and the closest rejected alternatives with one-line reasons. This prevents visual similarity from overriding semantics.
5. Define behavior, data shape, states, validation, keyboard interaction, responsive behavior, and accessibility before visual polish.
6. Implement the smallest component that satisfies the interaction. Do not add animation, nesting, search, multi-select, or remote loading unless the request or data warrants it.
7. Verify normal, empty, loading, error, disabled, overflow, keyboard, and narrow-screen states in proportion to the task.

## Output contract

When the user asks for terminology or a prompt, return:

- `组件 / Component`: canonical Chinese and English term.
- `变体 / Variant`: the exact subtype.
- `使用场景`: why this variant fits and which nearby variant does not.
- `判定依据`: the case facts that selected this subtype, plus rejected sibling variants.
- `交互规格`: trigger, selection model, dismissal, focus, keyboard, validation, async behavior.
- `视觉规格`: placement, width, density, hierarchy, truncation, responsive behavior, motion only if useful.
- `状态`: default, hover, focus-visible, active/selected, disabled, loading, empty, error, success.
- `实现映射`: existing project primitive or a semantic HTML/React fallback.

When the user asks for implementation, keep the specification concise and make the code the primary deliverable.

## Reference routing

- Read [references/component-decision-matrix.md](references/component-decision-matrix.md) first when the user gives a vague component family, when two or more variants could fit, or when reviewing whether an existing component is the right pattern.
- Read [references/framework-adaptation.md](references/framework-adaptation.md) before implementation when a repository is present, a framework/library is named, or code must work across different frontend environments.
- Read [references/selection-and-input.md](references/selection-and-input.md) for dropdowns, selects, comboboxes, text inputs, toggles, sliders, and form controls.
- Read [references/date-time-and-navigation.md](references/date-time-and-navigation.md) for date/time controls, sidebars, menus, tabs, breadcrumbs, pagination, steppers, and command navigation.
- Read [references/feedback-overlays-data.md](references/feedback-overlays-data.md) for progress/loading, alerts, toast, modal, drawer, tooltip, popover, table, list, tree, cards, and data visualization shells.
- Read [references/layout-media-actions.md](references/layout-media-actions.md) for buttons, layout, disclosure, media, upload, editors, and supporting UI primitives.
- Read [references/prompt-recipes.md](references/prompt-recipes.md) when rewriting a vague request into a high-precision AI coding prompt or reviewing one for ambiguity.

Reference snippets express behavior, not a mandatory framework. Adapt them to the repository rather than introducing React or a new component library into a different stack.

## Quality boundaries

- Prefer native semantic elements when they meet the behavior. Do not recreate buttons, links, checkboxes, radio buttons, or simple selects with generic `div` elements.
- Use the established design system's accessibility contract. For custom composites, follow the corresponding ARIA pattern and preserve visible focus.
- Labels are persistent names; placeholders are examples or format hints, never label replacements.
- Use a tooltip for supplemental explanation, a popover for interactive lightweight content, a menu for actions, and a dialog for a focused task.
- Use determinate progress only when a meaningful value is known. Never fabricate percentages for unknown-duration work.
- Do not call every floating panel a dropdown. Name the trigger, panel role, selection model, and dismissal behavior.
- Do not choose by visual shape alone. A row of pill-shaped controls can be tabs, a segmented content switcher, a radio group, toggle buttons, or filter chips; the state and user task determine the component.
- Preserve the semantic subtype across frameworks while adapting its binding and composition. Never paste React TSX into Vue, Angular, Svelte, or a framework-free project, and never add a UI package solely because a reference snippet names a conceptual component.
- Do not copy video wording blindly. Correct obvious transcription errors and prefer established industry terms while retaining the user's intended visual behavior.
