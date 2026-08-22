#!/usr/bin/env node

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SKILL = path.join(ROOT, 'SKILL.md');
const INDEX = path.join(ROOT, 'references', 'component-index.md');
const COMPONENTS = path.join(ROOT, 'references', 'components');

const EXPECTED_FAMILIES = [
  'selection.md',
  'boolean-and-mode-controls.md',
  'text-and-numeric-inputs.md',
  'date-and-time.md',
  'buttons-and-commands.md',
  'navigation.md',
  'disclosure.md',
  'overlays.md',
  'notifications-and-feedback.md',
  'help-and-onboarding.md',
  'motion.md',
  'loading-and-progress.md',
  'lists-tables-trees.md',
  'cards-identity-and-status.md',
  'search-filtering-and-query.md',
  'file-upload.md',
  'media-and-content.md',
  'layout-and-containers.md',
  'forms-and-validation.md',
  'data-visualization.md'
];

const RETIRED_COMBINED_FILES = [
  'component-decision-matrix.md',
  'selection-and-input.md',
  'date-time-and-navigation.md',
  'feedback-overlays-data.md',
  'layout-media-actions.md',
  'motion-and-loading.md'
];

// These families have completed the one-row/one-detail migration. New entries
// must update both sections, which prevents orphan details and count inflation.
const STRICT_DETAIL_COVERAGE = new Set([
  'navigation.md',
  'forms-and-validation.md'
]);

function read(relative) {
  return fs.readFileSync(path.join(ROOT, relative), 'utf8');
}

function fail(message) {
  throw new Error(message);
}

function matches(text, regex) {
  return [...text.matchAll(regex)];
}

function markdownCells(line) {
  return line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
}

function subtypeKey(label) {
  return label.split(' / ', 1)[0].trim().toLowerCase();
}

function detailKey(heading) {
  return heading.split(/\s+—\s+|\s+-\s+/, 1)[0].split(' / ', 1)[0].trim().toLowerCase();
}

function validate() {
  const skillText = fs.readFileSync(SKILL, 'utf8');
  const indexText = fs.readFileSync(INDEX, 'utf8');

  if (!/^---\r?\n[\s\S]+?\r?\n---\r?\n/.test(skillText)) fail('SKILL.md is missing YAML frontmatter');
  if (!/^name:\s+ui-spec$/m.test(skillText)) fail('SKILL.md name is missing or changed');
  const description = skillText.match(/^description:\s+(.+)$/m)?.[1]?.trim();
  if (!description || description.length < 80) fail('SKILL.md description is missing or not discriminating');
  if (!/Do not use for/.test(description)) fail('SKILL.md description must include a negative activation boundary');

  for (const required of [
    'references/component-index.md',
    'references/greenfield-workflow.md',
    'references/page-patterns.md',
    'references/visual-modifiers.md',
    'references/framework-adaptation.md'
  ]) {
    if (!skillText.includes(required)) fail(`SKILL.md does not route to ${required}`);
  }

  const actualFamilies = fs.readdirSync(COMPONENTS).filter(name => name.endsWith('.md')).sort();
  if (JSON.stringify(actualFamilies) !== JSON.stringify([...EXPECTED_FAMILIES].sort())) {
    fail(`component family files differ: expected ${EXPECTED_FAMILIES.length}, found ${actualFamilies.length}`);
  }

  for (const retired of RETIRED_COMBINED_FILES) {
    if (fs.existsSync(path.join(ROOT, 'references', retired))) fail(`retired combined component file still exists: ${retired}`);
  }

  for (const family of EXPECTED_FAMILIES) {
    if (!indexText.includes(`components/${family}`)) fail(`component index does not route to ${family}`);
  }

  const markdownFiles = [
    'SKILL.md',
    'README.md',
    'references/component-index.md',
    'references/greenfield-workflow.md',
    'references/page-patterns.md',
    'references/visual-modifiers.md',
    'references/framework-adaptation.md',
    'references/prompt-recipes.md',
    ...EXPECTED_FAMILIES.map(family => `references/components/${family}`)
  ].filter(relative => fs.existsSync(path.join(ROOT, relative)));

  for (const relative of markdownFiles) {
    const text = read(relative);
    if ((text.match(/```/g) || []).length % 2) fail(`unbalanced code fences in ${relative}`);
    if (/\b(?:TODO|TBD|FIXME)\b|\[TODO/i.test(text)) fail(`unfinished placeholder in ${relative}`);
  }

  const subtypeOwners = new Map();
  const detailOwners = new Map();
  const familyCounts = {};
  let subtypeRows = 0;
  let detailedExamples = 0;

  for (const family of EXPECTED_FAMILIES) {
    const relative = `references/components/${family}`;
    const text = read(relative);

    if (matches(text, /^# /gm).length !== 1) fail(`${family} must have exactly one component-family title`);
    if (!text.includes('defines exactly one component family')) fail(`${family} does not declare single-family ownership`);
    if (!text.includes('| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |')) {
      fail(`${family} is missing the standard decision table`);
    }

    const rowKeys = [];
    for (const line of text.split(/\r?\n/)) {
      if (!line.startsWith('|')) continue;
      const cells = markdownCells(line);
      if (cells[0] === 'Subtype' || cells.every(cell => /^[-: ]+$/.test(cell))) continue;
      if (cells.length !== 4 || cells.some(cell => !cell)) fail(`invalid decision row in ${family}: ${line}`);
      if (!cells[0].includes(' / ')) fail(`subtype is not bilingual in ${family}: ${cells[0]}`);
      if (!cells[3].includes('`')) fail(`subtype lacks a code or semantic cue in ${family}: ${cells[0]}`);

      const key = subtypeKey(cells[0]);
      if (subtypeOwners.has(key)) fail(`subtype ${cells[0]} is duplicated in ${subtypeOwners.get(key)} and ${family}`);
      subtypeOwners.set(key, family);
      rowKeys.push(key);
    }

    if (rowKeys.length < 5) fail(`${family} has fewer than five detailed subtypes`);
    familyCounts[family] = rowKeys.length;
    subtypeRows += rowKeys.length;

    const detailKeys = [];
    for (const [, heading] of matches(text, /^### (.+)$/gm)) {
      const key = detailKey(heading);
      if (detailOwners.has(key) && (detailOwners.get(key) !== family || STRICT_DETAIL_COVERAGE.has(family))) {
        fail(`detailed subtype ${heading} is duplicated in ${detailOwners.get(key)} and ${family}`);
      }
      detailOwners.set(key, family);
      detailKeys.push(key);
    }

    if (STRICT_DETAIL_COVERAGE.has(family)) {
      const rows = [...rowKeys].sort();
      const details = [...detailKeys].sort();
      if (JSON.stringify(rows) !== JSON.stringify(details)) {
        const missing = rows.filter(key => !details.includes(key));
        const orphaned = details.filter(key => !rows.includes(key));
        fail(`${family} detail coverage differs; missing=[${missing.join(', ')}] orphaned=[${orphaned.join(', ')}]`);
      }
    }

    detailedExamples += matches(text, /```(?:tsx|html)\r?\n/g).length;
  }

  if (subtypeRows < 210) fail(`expected at least 210 family-owned subtypes, found ${subtypeRows}`);
  if (detailedExamples < 200) fail(`expected at least 200 detailed TSX/HTML examples, found ${detailedExamples}`);

  const requiredExamples = {
    'navigation.md': ['Route tabs', 'Off-canvas navigation', 'Skip link'],
    'overlays.md': ['Selection popup', 'Modal task dialog', 'Side sheet'],
    'motion.md': ['Expand/collapse reveal', 'Shared-axis navigation transition'],
    'loading-and-progress.md': ['Blocking overlay loader', 'Streaming response indicator'],
    'forms-and-validation.md': ['Error summary', 'Helper text'],
    'data-visualization.md': ['Line chart', 'Heatmap']
  };

  for (const [family, terms] of Object.entries(requiredExamples)) {
    const text = read(`references/components/${family}`);
    for (const term of terms) {
      if (!text.includes(term)) fail(`${family} is missing required subtype: ${term}`);
    }
  }

  const frameworkText = read('references/framework-adaptation.md');
  for (const framework of ['React / Next.js', 'Vue / Nuxt', 'Angular', 'Svelte / SvelteKit', 'Vanilla HTML/JS']) {
    if (!frameworkText.includes(framework)) fail(`missing framework adaptation coverage: ${framework}`);
  }
  for (const token of ['package.json', 'UI library', 'SSR', 'existing', 'allowCustomValue={false}']) {
    if (!frameworkText.includes(token)) fail(`framework adaptation is missing required invariant: ${token}`);
  }

  return {
    families: EXPECTED_FAMILIES.length,
    subtypes: subtypeRows,
    detailedExamples,
    frameworks: 5,
    familyCounts
  };
}

function printResult(result) {
  process.stdout.write('PASS: single-family component catalog integrity\n');
  process.stdout.write(`families=${result.families} subtypes=${result.subtypes} detailed_examples=${result.detailedExamples} frameworks=${result.frameworks}\n`);
  for (const [family, count] of Object.entries(result.familyCounts)) {
    process.stdout.write(`- ${family}: ${count}\n`);
  }
}

if (require.main === module) {
  try {
    printResult(validate());
  } catch (error) {
    process.stderr.write(`FAIL: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = { validate };
