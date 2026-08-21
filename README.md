# Precise UI Components

A Codex skill that translates vague frontend requests into precise Chinese and English component terminology, selects the correct interaction pattern, and implements it in the current project's stack.

## What it covers

- Selection: select, multi-select, searchable select, combobox, autocomplete, cascader, tree select, transfer list, menus
- Input: text, search, number, currency, OTP, tag input, slider, switch, inline edit
- Date and time: date, range, month, week, time, date-time, calendar, presets
- Navigation: sidebars, navigation drawers, tabs, breadcrumbs, pagination, steppers, command palettes
- Feedback and overlays: progress, spinner, skeleton, toast, alert, dialog, drawer, tooltip, popover
- Data and content: tables, lists, trees, cards, timelines, charts, upload, media, editors
- Prompt recipes that turn phrases such as “做一个下拉框” into implementation-ready UI specifications

The references include bilingual names, usage boundaries, interaction requirements, accessibility notes, and matching TSX/HTML examples.

## Install

Copy this repository into your Codex skills directory:

```bash
git clone https://github.com/charonwwang/precise-ui-components.git ~/.codex/skills/precise-ui-components
```

Then invoke it explicitly or let Codex discover it from the request:

```text
使用 $precise-ui-components，把“做一个可以搜索人员的下拉框”改写为精确组件规格，并按照当前项目技术栈实现。
```

## Structure

```text
precise-ui-components/
├── SKILL.md
├── agents/openai.yaml
└── references/
    ├── selection-and-input.md
    ├── date-time-and-navigation.md
    ├── feedback-overlays-data.md
    ├── layout-media-actions.md
    └── prompt-recipes.md
```

## Design principles

- Reuse the project's existing framework, component library, and design tokens.
- Prefer semantic HTML and established accessible interaction patterns.
- Name component roles and value models, not only their visual appearance.
- Define loading, empty, error, disabled, overflow, keyboard, and responsive behavior.
- Use determinate progress only when a meaningful value is available.

The original terminology exploration was inspired by the Douyin series “web前端UI组件大白话”; the skill normalizes transcription variants to established frontend terminology and expands the catalog substantially.
