const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

test('greenfield requests route through an interaction inventory before library choice', () => {
  const skill = read('SKILL.md');
  const workflow = read('references/greenfield-workflow.md');
  assert.match(skill, /greenfield-workflow\.md/);
  assert.match(workflow, /Build an interaction inventory/);
  assert.match(workflow, /Do not design a page by selecting a library first/);
  assert.match(workflow, /every subtype is owned by one component-family file/i);
});

test('segmented and ARIA guidance does not conflate value, view, and pressed semantics', () => {
  const controls = read('references/components/boolean-and-mode-controls.md');
  assert.match(controls, /compact exclusive form value or an alternate display mode/);
  assert.match(controls, /Never combine `role="radiogroup"` with `aria-pressed`/);
});

test('known calibration failures remain corrected', () => {
  const search = read('references/components/search-filtering-and-query.md');
  const collections = read('references/components/lists-tables-trees.md');
  const framework = read('references/framework-adaptation.md');
  assert.match(search, /combobox \+ listbox semantics/);
  assert.match(collections, /one-dimensional chapter, message, or activity collection remains a virtualized list\/collection/);
  assert.match(framework, /static `message` API can render without an enclosing `App`/);
  assert.doesNotMatch(framework, /static `message` API is unusable/);
});

test('moved subtypes live in their semantic owner, not visual neighbors', () => {
  const selection = read('references/components/selection.md');
  const lists = read('references/components/lists-tables-trees.md');
  const motion = read('references/components/motion.md');
  const navigation = read('references/components/navigation.md');
  assert.match(selection, /Editable combobox \/ 可编辑组合框/);
  assert.doesNotMatch(lists, /^\| Editable combobox/m);
  assert.match(motion, /Anchored scale-fade \/ 锚点缩放淡入/);
  assert.doesNotMatch(navigation, /^\| Anchored scale-fade/m);
});
