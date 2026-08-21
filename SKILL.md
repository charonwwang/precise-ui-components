---
name: ui-spec
description: Translate vague UI requests into precise Chinese and English component terminology, choose the correct scenario-specific subtype, and implement it in an existing frontend stack. Use for frontend component selection, UI specifications, AI coding prompts, design-to-code work, or when selection, input, date/time, navigation, overlay, disclosure, motion, loading, data, upload, or form patterns are ambiguous.
---

# UI Spec

Turn product intent into an implementation-ready component specification, then implement it when requested. Support both existing-repository adaptation and greenfield product design.

## Working method

1. Classify the task as `existing repository` or `greenfield`. For an existing repository, inspect the actual framework, version, UI library, form/state conventions, router, styling system, SSR boundary, and tests. Reuse its stack and primitives. For greenfield work, read the greenfield workflow before choosing any UI library or page-level composition.
2. Model the user task before naming a component: actor and goal, submitted value or command, data shape and scale, persistence, consequence, device context, and accessibility constraints. Ask only for missing facts that would change the family or subtype; otherwise state bounded assumptions.
3. Resolve each vague noun to a precise component variant. State both Chinese and English names on first mention.
4. Read the component index and route each independent interaction to one owning family file. A screen may need several families, but each component subtype must have one semantic owner.
5. Record the selected subtype and the closest rejected alternatives with one-line reasons. This prevents visual similarity from overriding semantics.
6. Define behavior, data shape, states, validation, keyboard interaction, responsive behavior, and accessibility before visual polish.
7. Implement the smallest component set that satisfies the task. Do not add animation, nesting, search, multi-select, remote loading, or a component library unless the requirements warrant it.
8. Verify normal, empty, loading, error, disabled, overflow, keyboard, reduced-motion, and narrow-screen states in proportion to the task.

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

- Read [references/component-index.md](references/component-index.md) first when the family itself is unclear. It is routing-only and contains no component definitions.
- Read [references/greenfield-workflow.md](references/greenfield-workflow.md) for a from-scratch product, feature, page, or design system. Use it to turn requirements into an interaction inventory and then route each interaction to its component family.
- After routing, read exactly the matching file under `references/components/`. Each file owns one component family, its decision axes, bilingual subtypes, rejection rules, and corresponding code examples.
- Read [references/framework-adaptation.md](references/framework-adaptation.md) before implementation when a repository is present, a framework/library is named, or code must work across different frontend environments.
- Read [references/prompt-recipes.md](references/prompt-recipes.md) only when rewriting a vague request into a high-precision AI coding prompt or reviewing one for ambiguity.

Do not search a retired combined catalog. Navigation, overlays, disclosure, motion, loading, forms, layout, and every other family have separate authoritative files.

Reference snippets express behavior, not a mandatory framework. Adapt them to the repository rather than introducing React or a new component library into a different stack.

## Quality boundaries

- Prefer native semantic elements when they meet the behavior. Do not recreate buttons, links, checkboxes, radio buttons, or simple selects with generic `div` elements.
- Use the established design system's accessibility contract. For custom composites, follow the corresponding ARIA pattern and preserve visible focus.
- Labels are persistent names; placeholders are examples or format hints, never label replacements.
- Use a tooltip for supplemental explanation, a popover for interactive lightweight content, a menu for actions, and a dialog for a focused task.
- Use determinate progress only when a meaningful value is known. Never fabricate percentages for unknown-duration work.
- Do not call every floating panel a dropdown. Name the trigger, panel role, selection model, and dismissal behavior.
- Do not choose by visual shape alone. A row of pill-shaped controls can be tabs, a segmented content switcher, a radio group, toggle buttons, or filter chips; the state and user task determine the component.
- A segmented control may represent a small exclusive form value or an alternate display mode. Do not classify it as view-only. Use radio semantics (`radiogroup`/`radio` with `aria-checked`) for an exclusive form answer; use toggle-button semantics (`button` with `aria-pressed`) only for pressed action-like modes. Never mix `radiogroup` with `aria-pressed`.
- A command palette may validly use an editable combobox controlling a command listbox. Determine semantics from the actual input, popup, and result behavior instead of rejecting combobox semantics because the results are commands.
- Virtualization is an implementation strategy, not a component family. Preserve list semantics for one-dimensional collections, table semantics for comparable columns, and grid semantics only for spreadsheet-like cell interaction.
- When a library API works outside its recommended provider but loses dynamic context, theme, or configuration, describe that limitation precisely; do not call it unusable. For example, Ant Design static `message` can render, while the `App` context API is preferred for contextual configuration.
- Preserve the semantic subtype across frameworks while adapting its binding and composition. Never paste React TSX into Vue, Angular, Svelte, or a framework-free project, and never add a UI package solely because a reference snippet names a conceptual component.
- Do not copy video wording blindly. Correct obvious transcription errors and prefer established industry terms while retaining the user's intended visual behavior.
