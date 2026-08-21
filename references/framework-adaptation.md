# Framework and project adaptation

Component selection is semantic; implementation syntax is environmental. Select the subtype first, then map it to the project's real framework and installed primitives.

## Required repository inspection

Inspect the smallest authoritative set before writing code:

1. `package.json` dependencies and scripts, plus the active lockfile.
2. Framework config and source extensions: React/Next (`.tsx`), Vue/Nuxt (`.vue`), Angular (`angular.json`, templates), Svelte/SvelteKit (`.svelte`), or framework-free HTML/JS/Web Components.
3. Existing imports and local component directories to identify the actual design system and wrapper conventions.
4. Existing forms, state, router, validation, styling, icons, tests, and accessibility helpers.
5. Framework/version-specific client/SSR boundaries and established async data pattern.

Do not infer the stack only from one file extension. A monorepo may contain several frontend applications; stay inside the requested package.

## Invariants across frameworks

- The chosen semantic subtype, value model, keyboard behavior, states, and accessibility contract do not change merely because the framework changes.
- The framework changes binding syntax, event syntax, lifecycle, form integration, slot/children composition, and test utilities.
- Reuse the installed design-system primitive when it implements the required semantics. Wrap or compose it only for missing product behavior.
- If the installed library lacks the subtype, prefer native semantic HTML for simple controls. For complex composites such as combobox, data grid, treegrid, or modal focus management, use an existing accessible primitive before hand-rolling.
- Do not introduce a new framework, component library, form library, state manager, CSS system, or icon set without a concrete need and user authorization.
- Check the installed package version before copying API syntax from current documentation.
- Treat local wrapper APIs as evidence, not guesswork. If their source or documented usage is unavailable, do not present invented props, events, slots, or bindings as runnable code. Label the snippet as semantic pseudocode and state exactly which wrapper contract must be inspected.

## Framework mapping

| Environment | State/value mapping | Events and forms | Composition and implementation notes |
|---|---|---|---|
| React / Next.js | Controlled `value`/`checked` props with callbacks when parent coordination or form state matters; local state for isolated ephemeral UI | `onChange`, component callbacks, existing form controller/registration pattern | Use JSX/TSX and existing components. Respect server/client boundaries; interactive controls belong in the established client component boundary. Preserve stable keys and avoid duplicated derived state. |
| Vue / Nuxt | `v-model` or named `v-model:*`; local `ref`/reactive state following project convention | `@event`, `defineModel`/props+emits, existing validation/form integration | Use SFC template/script conventions and installed Vue component wrappers. Do not output React-style props or handlers. Respect client-only requirements for browser-dependent widgets. |
| Angular | `FormControl`/`FormGroup` for existing reactive forms; `[(ngModel)]` only in template-driven areas | Template bindings such as `[value]`, `(selectionChange)`, `[formControl]`; use existing validators | Follow standalone/module conventions and typed forms in the project. A reusable custom form control should integrate through the project's value-accessor pattern rather than keeping disconnected internal state. |
| Svelte / SvelteKit | `$state` or the project's version-appropriate state style; `bind:value`, `bind:checked`, `bind:group`, `bind:indeterminate` where appropriate | Event attributes/callback props matching installed Svelte version; form actions when already used | Use `.svelte` markup, not JSX. Keep browser-only behavior out of SSR evaluation and use existing component actions/primitives. |
| Vanilla HTML/JS | DOM properties and one explicit source of truth; native form values and constraint validation | `addEventListener`, form `submit`, `input`, `change`; custom events for Web Components | Prefer native elements. If building a Web Component, expose attributes/properties/events without hiding labels or form semantics. Avoid recreating complex ARIA widgets casually. |

## Same case, framework-specific shape

Case: a searchable employee selector whose submitted value must be an existing `userId`.

The semantic choice remains `searchable single-select combobox`; only the integration changes.

### React

```tsx
<EmployeeCombobox value={userId} onValueChange={setUserId} query={query} onQueryChange={setQuery} allowCustomValue={false} />
```

If the project uses a form controller, connect `value`, validation, and the component's change callback through that existing controller instead of duplicating local form state.

### Vue 3

```vue
<EmployeeCombobox v-model="userId" v-model:query="query" :allow-custom-value="false" @search="searchEmployees" />
```

Use the installed component library's actual prop/event names after checking its version; the example expresses the value contract rather than a universal API.

### Angular

```html
<app-employee-combobox [formControl]="employeeControl" [allowCustomValue]="false" (search)="searchEmployees($event)" />
```

The control value should be `userId`, not the display label or the query string.

### Svelte 5

```svelte
<EmployeeCombobox bind:value={userId} bind:query allowCustomValue={false} onSearch={searchEmployees} />
```

Use `$state`/`bind:` only when consistent with the installed Svelte version and surrounding code.

### Vanilla HTML/JS

For a strict remote searchable choice, do not substitute `<datalist>` because it permits unmatched values. Prefer an existing accessible combobox primitive. If none exists, implement the WAI-ARIA combobox interaction fully or reconsider whether a native `<select>` with server-side filtering can satisfy the scale.

## Installed UI library mapping

Map the semantic subtype to what is actually installed; names differ across libraries.

| Semantic need | Common library labels to inspect | Verification before use |
|---|---|---|
| Strict searchable single choice | Select with search/filter, Autocomplete configured to disallow free values, Combobox | Submitted value is option ID; query text cannot become value; loading/empty/error supported |
| Free-value suggestions | Autocomplete, Combobox with free-solo/allow-create/custom-value mode | Unmatched text is intentionally valid and validated |
| Hierarchical path | Cascader | Output is full path or leaf as product requires; async children and partial selection are explicit |
| Hierarchical node | Tree Select | Expansion and selection are independent; single/multiple model is explicit |
| Interactive tabular cells | Data Grid/Grid | Package actually implements focus management/editing; do not use solely for sorting a table |
| Modal task | Dialog/Modal | Label, focus trap, Escape/close rules, focus restoration, portal/SSR behavior |
| Nonblocking anchored content | Popover | Positioning, dismissal, focus, collision behavior, touch behavior |
| Task progress | Progress/ProgressBar | Determinate value is real; accessible label exists |
| Scalar measurement | Meter/Gauge or native `meter` | It is not task progress; numeric text and thresholds remain perceivable |

Library labels are discovery hints, not interchangeable APIs. Inspect actual exports, wrappers, and usage in the repository.

### Provider and context APIs

Distinguish “cannot render” from “renders without the recommended contextual behavior.” Some libraries expose static convenience APIs alongside provider/context APIs. Verify the installed version and report the exact limitation.

For example, Ant Design's static `message` API can render without an enclosing `App`, but it cannot reliably consume dynamic `ConfigProvider` context such as theme or locale and may emit a context warning. Prefer the `App` context API when contextual configuration matters; do not describe the static API as categorically unusable.

## Styling adaptation

- Reuse design tokens, density, focus ring, spacing, radii, elevation, breakpoints, and motion conventions already present.
- Tailwind projects should reuse configured utilities/tokens; CSS Modules should use local classes; CSS-in-JS projects should use their established styling API.
- Do not translate every reference class literally. Classes such as `bg-surface` and `button-primary` are semantic placeholders.
- Preserve `prefers-reduced-motion`, forced-colors/high-contrast behavior, and visible `focus-visible` treatment.

## SSR and hydration checks

- Do not access `window`, `document`, `localStorage`, layout measurements, or browser-only observers during server rendering.
- Use stable initial IDs and markup so the server and client trees match.
- Portal-based overlays, media queries, and persisted preferences must follow the framework's established client-boundary/hydration pattern.
- Async suggestions need cancellation or stale-result protection regardless of framework.

## Framework-specific acceptance checklist

- The selected subtype and rejected alternatives remain semantically correct.
- Code syntax matches the detected framework and installed version.
- Imports come from existing dependencies or local primitives.
- Form value contains the canonical domain value, not merely the label/query.
- Event names and binding direction match the local wrapper API.
- Any unavailable local wrapper contract is surfaced explicitly; assumed APIs are never presented as verified integration code.
- Validation, touched/dirty state, reset, disabled, and read-only behavior integrate with the existing form system.
- SSR/client boundaries are respected.
- Existing test conventions cover keyboard interaction and value submission.

## Official framework calibration

- [React: sharing state between components](https://react.dev/learn/sharing-state-between-components) for controlled/uncontrolled ownership and one source of truth.
- [Vue: component `v-model`](https://vuejs.org/guide/components/v-model.html) for component bindings and named models.
- [Angular forms overview](https://angular.dev/guide/forms) and [reactive forms](https://angular.dev/guide/forms/reactive-forms) for form-model ownership and control integration.
- [Svelte `bind:`](https://svelte.dev/docs/svelte/bind) for element/component bindings, groups, files, and indeterminate checkboxes.
- [MDN custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) for framework-free reusable element lifecycle and interface basics.
