#!/usr/bin/env python3
"""Deterministic integrity checks for the UI Spec skill."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "SKILL.md"
MATRIX = ROOT / "references" / "component-decision-matrix.md"


def fail(message: str) -> None:
    print(f"FAIL: {message}", file=sys.stderr)
    raise SystemExit(1)


def markdown_cells(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def main() -> None:
    skill_text = SKILL.read_text(encoding="utf-8")
    matrix_text = MATRIX.read_text(encoding="utf-8")

    if not re.search(r"^name:\s+ui-spec$", skill_text, re.M):
        fail("SKILL.md name is missing or changed")
    if "references/component-decision-matrix.md" not in skill_text:
        fail("SKILL.md does not route ambiguous requests to the decision matrix")
    if "references/framework-adaptation.md" not in skill_text:
        fail("SKILL.md does not route repository implementations to framework adaptation")

    referenced = sorted(set(re.findall(r"\((references/[a-z0-9-]+\.md)\)", skill_text)))
    missing = [path for path in referenced if not (ROOT / path).is_file()]
    if missing:
        fail(f"missing linked references: {', '.join(missing)}")

    markdown_files = [SKILL, *sorted((ROOT / "references").glob("*.md"))]
    readme = ROOT / "README.md"
    if readme.is_file():
        markdown_files.append(readme)
    for path in markdown_files:
        text = path.read_text(encoding="utf-8")
        if text.count("```") % 2:
            fail(f"unbalanced code fences in {path.relative_to(ROOT)}")
        if re.search(r"\b(?:TODO|TBD|FIXME)\b|\[TODO", text, re.I):
            fail(f"unfinished placeholder in {path.relative_to(ROOT)}")

    sections = list(re.finditer(r"^## (\d+)\. (.+)$", matrix_text, re.M))
    if len(sections) != 14:
        fail(f"expected 14 numbered decision families, found {len(sections)}")
    if [int(match.group(1)) for match in sections] != list(range(1, 15)):
        fail("decision families are not numbered consecutively from 1 to 14")

    subtype_rows = 0
    family_counts: dict[str, int] = {}
    for index, section in enumerate(sections):
        start = section.end()
        end = sections[index + 1].start() if index + 1 < len(sections) else matrix_text.index("## Official calibration sources")
        body = matrix_text[start:end]
        rows = []
        for line in body.splitlines():
            if not line.startswith("|"):
                continue
            cells = markdown_cells(line)
            if cells[0] == "Subtype" or all(re.fullmatch(r"[-: ]+", cell) for cell in cells):
                continue
            if len(cells) != 4:
                fail(f"table row does not have four cells in family {section.group(1)}: {line}")
            if any(not cell for cell in cells):
                fail(f"empty decision cell in family {section.group(1)}: {line}")
            if " / " not in cells[0]:
                fail(f"subtype is not bilingual in family {section.group(1)}: {cells[0]}")
            rows.append(cells)
        family_counts[section.group(2)] = len(rows)
        subtype_rows += len(rows)
        if len(rows) < 5:
            fail(f"family {section.group(1)} has fewer than five subtypes")

    if subtype_rows < 130:
        fail(f"expected at least 130 decision rows, found {subtype_rows}")

    framework_text = (ROOT / "references" / "framework-adaptation.md").read_text(encoding="utf-8")
    required_frameworks = ["React / Next.js", "Vue / Nuxt", "Angular", "Svelte / SvelteKit", "Vanilla HTML/JS"]
    absent_frameworks = [name for name in required_frameworks if name not in framework_text]
    if absent_frameworks:
        fail(f"missing framework adaptation coverage: {', '.join(absent_frameworks)}")
    for token in ["package.json", "UI library", "SSR", "existing", "allowCustomValue={false}"]:
        if token not in framework_text:
            fail(f"framework adaptation is missing required invariant: {token}")
    for token in ["do not present invented props", "semantic pseudocode", "assumed APIs are never presented as verified"]:
        if token not in framework_text:
            fail(f"framework adaptation is missing wrapper evidence rule: {token}")

    required_detailed_headings = {
        ROOT / "references" / "feedback-overlays-data.md": ["### Virtualized data grid — 虚拟化数据网格"],
        ROOT / "references" / "layout-media-actions.md": ["### Resizable inline side panel — 可调整行内侧面板"],
        ROOT / "references" / "selection-and-input.md": [
            "### Global search — 全局搜索",
            "### Page search — 页面搜索",
            "### Component/table search — 组件内搜索",
        ],
    }
    for path, headings in required_detailed_headings.items():
        text = path.read_text(encoding="utf-8")
        for heading in headings:
            if heading not in text:
                fail(f"missing blind-test repair heading in {path.name}: {heading}")

    detailed = [
        ROOT / "references" / "selection-and-input.md",
        ROOT / "references" / "date-time-and-navigation.md",
        ROOT / "references" / "feedback-overlays-data.md",
        ROOT / "references" / "layout-media-actions.md",
    ]
    example_count = sum(path.read_text(encoding="utf-8").count("```tsx") for path in detailed)
    if example_count < 100:
        fail(f"expected at least 100 TSX examples, found {example_count}")

    print("PASS: skill catalog integrity")
    print(f"families={len(sections)} decision_rows={subtype_rows} tsx_examples={example_count} linked_references={len(referenced)} frameworks={len(required_frameworks)}")
    for family, count in family_counts.items():
        print(f"- {family}: {count}")


if __name__ == "__main__":
    main()
