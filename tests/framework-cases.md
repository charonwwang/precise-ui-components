# Cross-framework forward-test cases

For each environment, inspect the stated project evidence, select the semantic subtype, and produce a minimal integration snippet in the correct framework syntax.

Every answer must include:

- detected framework and existing UI/form libraries;
- selected Chinese and English subtype;
- at least two rejected sibling variants;
- exact skill reference file and heading;
- framework-specific value binding, event, form, styling, and SSR notes;
- confirmation that no new dependency is required, or a clear explanation if the installed stack cannot safely implement the pattern.
- no invented local-wrapper API: when evidence omits props/events/slots, use labelled semantic pseudocode and name the contract that must be inspected instead of claiming runnable integration code.

## Case A — React + MUI + React Hook Form

Project evidence:

```json
{"dependencies":{"react":"^19.1.0","next":"^15.4.0","@mui/material":"^7.2.0","react-hook-form":"^7.62.0"}}
```

Requirement: select exactly one of 2,000 remote employees. Typing filters the server result, the form must store only an existing `userId`, and arbitrary text is invalid. The interactive control is rendered in an established client component.

## Case B — Vue 3 + Element Plus

Project evidence:

```json
{"dependencies":{"vue":"^3.5.0","nuxt":"^4.0.0","element-plus":"^2.10.0","vee-validate":"^4.15.0"}}
```

Requirement: choose province, city, and district as one ordered path. Child options load after choosing a parent, and the submitted value must contain all three IDs.

## Case C — Angular Material + reactive forms

Project evidence:

```json
{"dependencies":{"@angular/core":"^20.1.0","@angular/forms":"^20.1.0","@angular/material":"^20.1.0"}}
```

Requirement: enter a customer name with remote suggestions, but a new unmatched customer name is valid. The surrounding feature already uses typed reactive forms.

## Case D — Svelte 5 without a UI library

Project evidence:

```json
{"dependencies":{"svelte":"^5.38.0","@sveltejs/kit":"^2.27.0"}}
```

Requirement: a parent checkbox selects all visible rows and displays a mixed state when only some rows are selected. No third-party component should be added.

## Case E — Vanilla HTML and JavaScript

Project evidence: no package manager, no framework, ordinary server-rendered HTML enhanced by a small JavaScript file.

Requirement: suggest a few common cities while typing, but allow a city outside the suggestion list. Rich option rows and remote loading are not needed.

## Case F — React + existing semantic table

Project evidence:

```json
{"dependencies":{"react":"^19.1.0","@tanstack/react-table":"^8.21.0"}}
```

Requirement: a read-only order table needs sorting and row selection, but no cell editing, clipboard operations, or arrow-key cell navigation. Preserve the existing table abstraction and do not add a data-grid package.

## Case G — Vue + existing drawer wrapper

Project evidence: Vue 3 project with a local `AppDrawer.vue` wrapper already used for mobile filters and focus restoration.

Requirement: on desktop, filter details must remain side-by-side with the chart and both stay interactive; on mobile, the same filters may overlay from the right.

## Case H — SvelteKit SSR

Project evidence: SvelteKit project renders the page on the server and already has a local `Popover.svelte` positioning primitive.

Requirement: clicking a help button opens a small anchored panel containing explanatory text and one documentation link. It must not access browser globals during SSR.
