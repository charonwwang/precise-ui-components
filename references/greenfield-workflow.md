# Greenfield UI decision workflow

Use this workflow when no existing frontend repository or design system constrains the implementation. It selects components from product facts rather than from a preferred library or visual style.

## 1. Build an interaction inventory

For every user-visible interaction, record only facts that change the component decision:

| Fact | Questions that change the decision |
|---|---|
| User goal | Navigate, inspect, compare, choose, enter, edit, execute, confirm, or monitor? |
| Outcome | Does it change a route, local view, form value, persisted state, or run a command? |
| Value model | Boolean, one-of-many, many-of-many, free text, structured value, hierarchy, range, or no value? |
| Data | Local or remote, stable or changing, flat or hierarchical, item count, row richness, and latency? |
| Consequence | Reversible, destructive, security-sensitive, costly, or blocking? |
| Duration | Immediate, unknown wait, measurable progress, background work, or streaming? |
| Context | Desktop/mobile, pointer/keyboard/touch, narrow screen, locale, timezone, and reduced motion? |

If a missing answer changes the family or value model, ask one concise question. Otherwise state an assumption and continue.

## 2. Route by user task

Do not design a page by selecting a library first. Route each inventory item through `component-index.md`:

- moving to a destination → navigation;
- choosing or entering a value → selection, boolean/mode, text/numeric, or date/time;
- executing a command → buttons/actions;
- showing temporary or focused content → overlays;
- revealing content in place → disclosure;
- reporting work or outcome → loading/progress or notifications/feedback;
- presenting collections → lists/tables/trees;
- arranging persistent regions → layout/containers;
- explaining spatial/state change → motion, after the base interaction is chosen.

A complete page normally crosses several families. Route each interaction independently and keep exactly one owner for each subtype. Motion describes a transition applied to a component; virtualization describes rendering strategy; neither changes the component's base semantics.

## 3. Select the subtype

Open only the owning family file and decide using its axes. Record:

```text
Interaction: assign an employee
Facts: remote 2,000-person set; one value; must submit existing userId; typing filters only
Choose: 可搜索单选选择器 / searchable single-select combobox
Reject: autocomplete (free text may be valid); native select (poor large-set retrieval)
Value: userId; label: avatar + name
```

Do not let the visual shape decide. Pill-shaped controls, floating panels, side surfaces, and percentage bars each span several semantic subtypes.

## 4. Compose the screen

Define the minimum page-level system:

1. information hierarchy and navigation;
2. primary task and primary action;
3. fields and value ownership;
4. overlays and confirmation boundaries;
5. loading, empty, error, success, and recovery;
6. responsive transformations that preserve the same task and state;
7. keyboard order, focus return, accessible names, and reduced motion.

When the product facts match a recurring page structure, read `page-patterns.md` and use one pattern as a composition hypothesis. Keep the interaction ledger authoritative: the pattern may suggest regions and state boundaries, but every interactive element still routes to exactly one component family. Apply `visual-modifiers.md` only after those semantic decisions are stable.

Avoid selecting several design systems. Start with native HTML where it satisfies the behavior. Choose one component library only when its supported primitives materially reduce the required custom composite behavior, and verify framework, SSR, accessibility, theming, bundle, and maintenance constraints before committing.

## 5. Produce an implementation blueprint

For a greenfield request, return a compact decision ledger followed by implementation:

| Interaction | Family | Selected subtype | Rejected sibling | Key facts |
|---|---|---|---|---|
| Change result view | Boolean and mode | Segmented control | Tabs | Same dataset; compact exclusive display mode |
| Open advanced filters | Overlay | Non-modal drawer | Modal dialog | Main results remain operable |
| Load first result set | Loading | Skeleton | Determinate progress | Stable row shape; no meaningful percentage |

Then define data contracts, state ownership, responsive behavior, accessibility, and testable acceptance criteria. Choose framework and library mappings only after this semantic blueprint exists.

## Greenfield acceptance gate

- Every interactive element has a user goal and state/value model.
- Every subtype is owned by one component-family file.
- The closest visual or semantic sibling is explicitly rejected.
- Route changes, view changes, form answers, toggle actions, and commands are not conflated.
- Popup role, modality, dismissal, focus entry, and focus return are defined.
- Loading indicators reflect real information; unknown progress has no fabricated percentage.
- Collection semantics remain list, table, or grid even when virtualized.
- Responsive changes preserve task, value, and focus rather than creating a second behavior model.
- The selected page pattern has a stated user goal and rejected alternative; it does not replace per-interaction component decisions.
- Visual modifiers are recorded separately from semantic subtype and state.
