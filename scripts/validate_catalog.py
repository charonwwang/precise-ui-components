#!/usr/bin/env python3
"""Deterministic integrity checks for the UI Spec skill."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "SKILL.md"
INDEX = ROOT / "references" / "component-index.md"
COMPONENTS = ROOT / "references" / "components"

EXPECTED_FAMILIES = [
    "selection.md",
    "boolean-and-mode-controls.md",
    "text-and-numeric-inputs.md",
    "date-and-time.md",
    "buttons-and-commands.md",
    "navigation.md",
    "disclosure.md",
    "overlays.md",
    "notifications-and-feedback.md",
    "help-and-onboarding.md",
    "motion.md",
    "loading-and-progress.md",
    "lists-tables-trees.md",
    "cards-identity-and-status.md",
    "search-filtering-and-query.md",
    "file-upload.md",
    "media-and-content.md",
    "layout-and-containers.md",
    "forms-and-validation.md",
    "data-visualization.md",
]

RETIRED_COMBINED_FILES = [
    "component-decision-matrix.md",
    "selection-and-input.md",
    "date-time-and-navigation.md",
    "feedback-overlays-data.md",
    "layout-media-actions.md",
    "motion-and-loading.md",
]


def fail(message: str) -> None:
    print(f"FAIL: {message}", file=sys.stderr)
    raise SystemExit(1)


def markdown_cells(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def main() -> None:
    skill_text = SKILL.read_text(encoding="utf-8")
    index_text = INDEX.read_text(encoding="utf-8")

    if not re.search(r"^name:\s+ui-spec$", skill_text, re.M):
        fail("SKILL.md name is missing or changed")
    for required in ["references/component-index.md", "references/framework-adaptation.md"]:
        if required not in skill_text:
            fail(f"SKILL.md does not route to {required}")

    actual_families = sorted(path.name for path in COMPONENTS.glob("*.md"))
    if actual_families != sorted(EXPECTED_FAMILIES):
        fail(f"component family files differ: expected {len(EXPECTED_FAMILIES)}, found {len(actual_families)}")

    for retired in RETIRED_COMBINED_FILES:
        if (ROOT / "references" / retired).exists():
            fail(f"retired combined component file still exists: {retired}")

    for family in EXPECTED_FAMILIES:
        link = f"components/{family}"
        if link not in index_text:
            fail(f"component index does not route to {family}")

    markdown_files = [SKILL, INDEX, *sorted(COMPONENTS.glob("*.md"))]
    for optional in [ROOT / "README.md", ROOT / "references" / "framework-adaptation.md", ROOT / "references" / "prompt-recipes.md"]:
        if optional.is_file():
            markdown_files.append(optional)
    for path in markdown_files:
        text = path.read_text(encoding="utf-8")
        if text.count("```") % 2:
            fail(f"unbalanced code fences in {path.relative_to(ROOT)}")
        if re.search(r"\b(?:TODO|TBD|FIXME)\b|\[TODO", text, re.I):
            fail(f"unfinished placeholder in {path.relative_to(ROOT)}")

    subtype_owner: dict[str, str] = {}
    detail_owner: dict[str, str] = {}
    family_counts: dict[str, int] = {}
    subtype_rows = 0
    detailed_examples = 0

    for family in EXPECTED_FAMILIES:
        path = COMPONENTS / family
        text = path.read_text(encoding="utf-8")
        if len(re.findall(r"^# ", text, re.M)) != 1:
            fail(f"{family} must have exactly one component-family title")
        if "defines exactly one component family" not in text:
            fail(f"{family} does not declare single-family ownership")
        if "| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |" not in text:
            fail(f"{family} is missing the standard decision table")

        rows = []
        for line in text.splitlines():
            if not line.startswith("|"):
                continue
            cells = markdown_cells(line)
            if cells[0] == "Subtype" or all(re.fullmatch(r"[-: ]+", cell) for cell in cells):
                continue
            if len(cells) != 4 or any(not cell for cell in cells):
                fail(f"invalid decision row in {family}: {line}")
            if " / " not in cells[0]:
                fail(f"subtype is not bilingual in {family}: {cells[0]}")
            if "`" not in cells[3]:
                fail(f"subtype lacks a corresponding code example in {family}: {cells[0]}")
            subtype_key = cells[0].split(" / ", 1)[0].strip().lower()
            previous = subtype_owner.get(subtype_key)
            if previous and previous != family:
                fail(f"subtype {cells[0]} is defined in both {previous} and {family}")
            subtype_owner[subtype_key] = family
            rows.append(cells)

        if len(rows) < 5:
            fail(f"{family} has fewer than five detailed subtypes")
        family_counts[family] = len(rows)
        subtype_rows += len(rows)

        for heading in re.findall(r"^### (.+)$", text, re.M):
            detail_key = re.split(r"\s+[—-]\s+", heading, maxsplit=1)[0].strip().lower()
            previous = detail_owner.get(detail_key)
            if previous and previous != family:
                fail(f"detailed subtype {heading} appears in both {previous} and {family}")
            detail_owner[detail_key] = family
        detailed_examples += text.count("```tsx") + text.count("```html")

    if subtype_rows < 210:
        fail(f"expected at least 210 family-owned subtypes, found {subtype_rows}")
    if detailed_examples < 200:
        fail(f"expected at least 200 detailed TSX/HTML examples, found {detailed_examples}")

    required_examples = {
        "navigation.md": ["Route tabs", "Modal navigation drawer", "Skip link"],
        "overlays.md": ["Selection popup", "Modal task dialog", "Side sheet"],
        "motion.md": ["Expand/collapse reveal", "Shared-axis navigation transition"],
        "loading-and-progress.md": ["Blocking overlay loader", "Streaming response indicator"],
        "forms-and-validation.md": ["Error summary", "Helper text"],
        "data-visualization.md": ["Line chart", "Heatmap"],
    }
    for family, terms in required_examples.items():
        text = (COMPONENTS / family).read_text(encoding="utf-8")
        for term in terms:
            if term not in text:
                fail(f"{family} is missing required subtype: {term}")

    framework_text = (ROOT / "references" / "framework-adaptation.md").read_text(encoding="utf-8")
    required_frameworks = ["React / Next.js", "Vue / Nuxt", "Angular", "Svelte / SvelteKit", "Vanilla HTML/JS"]
    for framework in required_frameworks:
        if framework not in framework_text:
            fail(f"missing framework adaptation coverage: {framework}")
    for token in ["package.json", "UI library", "SSR", "existing", "allowCustomValue={false}"]:
        if token not in framework_text:
            fail(f"framework adaptation is missing required invariant: {token}")

    print("PASS: single-family component catalog integrity")
    print(f"families={len(EXPECTED_FAMILIES)} subtypes={subtype_rows} detailed_examples={detailed_examples} frameworks={len(required_frameworks)}")
    for family, count in family_counts.items():
        print(f"- {family}: {count}")


if __name__ == "__main__":
    main()
