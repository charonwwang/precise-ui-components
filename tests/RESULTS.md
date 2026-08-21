# Validation results

Date: 2026-08-21

## Deterministic validation

- Official `skill-creator` validator: PASS.
- Catalog integrity validator: PASS.
- Decision families: 14.
- Decision rows: 155.
- Detailed TSX/HTML behavior examples: 181.
- Framework mappings: React/Next.js, Vue/Nuxt, Angular, Svelte/SvelteKit, and Vanilla HTML/JS.
- Source and installed `SKILL.md`/references: byte-for-byte equivalent after synchronization.

## npx installer validation

- Local package execution through `npx --package .` installed the runtime files into an isolated target: PASS.
- Post-push execution through the GitHub package source installed and revalidated the runtime from the public repository: PASS.
- First install creates `SKILL.md`, `agents/`, `references/`, and `scripts/` without copying repository-only tests or package metadata: PASS.
- Installing over an existing target without `--force` fails and preserves the target: PASS.
- `--force` moves the existing target to a timestamped backup before replacement: PASS.
- Help, version, unknown-command handling, package file allowlist, and executable mode: PASS.
- Package dry run includes only the runtime, installer, README, license, and validation report; repository-only behavioral prompts and installer tests are excluded.

Run locally:

```bash
python3 scripts/validate_catalog.py
```

## Independent semantic forward test

An independent agent read the installed skill and the 16 prompts in `behavior-cases.md` without an answer key.

- Correct semantic subtype selection: 16/16.
- Cases with ambiguous input facts: 0.
- Each answer included decision facts, at least two rejected siblings, an exact reference heading, and an implementation cue.
- The first pass exposed three documentation-addressability gaps: virtualized data grid, resizable inline side panel, and detailed global search guidance.
- After adding dedicated matrix rows and detailed headings, targeted regression cases 5, 12, and 16 passed 3/3 with no remaining skill gap.

## Independent cross-framework forward test

An independent agent read the installed skill and the eight environments in `framework-cases.md` without an answer key.

- Correct framework-invariant semantic subtype: 8/8.
- New dependencies introduced: 0/8.
- Correct syntax/environment mapping covered React + MUI + React Hook Form, Vue + Element Plus + vee-validate, Angular Material reactive forms, Svelte 5, Vanilla HTML/JS, TanStack Table, a local Vue drawer, and a local Svelte popover.
- The first pass exposed a risk: examples could look runnable even when a local wrapper's props/events/slots were absent from the supplied evidence.
- A hard rule now forbids presenting guessed wrapper APIs as verified code. Targeted regressions G and H passed 2/2: both preserved the correct component semantics, emitted labelled semantic pseudocode, and listed the exact wrapper contracts that still require repository inspection.

## Interpretation

The skill passed semantic selection and framework adaptation tests. A missing local-wrapper source remains a project-evidence limitation, not a reason to invent an API: the required behavior is to stop at a labelled adapter contract until the wrapper or an existing usage can be inspected.
