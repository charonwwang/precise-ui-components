# Validation results

This file distinguishes reproducible automated checks from historical model-evaluation evidence. Live catalog counts are intentionally not copied here; use `npm run validate:catalog` so documentation cannot drift from the source.

## Automated validation

Run locally:

```bash
npm test
npm run pack:check
```

`npm test` performs:

- cross-platform Node validation of `SKILL.md`, reference routing, family ownership, bilingual decision rows, duplicate subtype ownership, unfinished placeholders, and code fences;
- exact one-row/one-detail coverage for the migrated navigation and forms families;
- semantic documentation regressions for greenfield routing, segmented-control semantics, combobox commands, virtualization, framework adaptation, and known ownership moves;
- installer tests for first install, accidental-overwrite refusal, backup upgrade, `doctor`, help, version, and invalid commands.

GitHub Actions runs those checks plus `npm pack --dry-run` on Windows, Linux, and macOS with Node.js 18 and 22.

## Forward-evaluation fixtures

[behavior-cases.md](behavior-cases.md) contains 24 semantic selection and composition prompts. [framework-cases.md](framework-cases.md) contains eight framework-adaptation prompts. They are fixtures for independent model evaluation, not assertions executed by Node's test runner.

A valid evaluation should record:

- date, model, skill commit, and raw output;
- selected bilingual subtype and decision facts;
- rejected sibling variants;
- exact reference file and heading;
- dependency, framework, accessibility, and SSR decisions where applicable.

Historical independent runs informed the current regression rules, including fixes for virtualized collections, resizable inline panels, global search, segmented-control ARIA, command-palette combobox semantics, Ant Design contextual messaging, and unknown local-wrapper APIs. Historical pass counts are not presented as current automated results.

## Known validation boundary

Structural validation cannot prove that a model will make the right decision for every prompt. Run the forward-evaluation fixtures after material changes to routing, subtype definitions, or framework adaptation, and retain the raw evaluation artifacts when publishing a claim about model behavior.
