'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const cli = path.join(root, 'bin', 'precise-ui-components.js');

function run(...args) {
  return spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: 'utf8' });
}

test('installs, refuses accidental overwrite, and performs backup upgrade', t => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'precise-ui-components-'));
  const target = path.join(temp, 'codex', 'skills', 'precise-ui-components');
  t.after(() => fs.rmSync(temp, { recursive: true, force: true }));

  const first = run('install', '--target', target);
  assert.equal(first.status, 0, first.stderr);
  assert.match(first.stdout, /Installed precise-ui-components/);
  assert.ok(fs.existsSync(path.join(target, 'SKILL.md')));
  assert.ok(fs.existsSync(path.join(target, 'references', 'framework-adaptation.md')));
  assert.ok(!fs.existsSync(path.join(target, 'package.json')));

  fs.writeFileSync(path.join(target, 'local-marker.txt'), 'preserve in backup');
  const refused = run('install', '--target', target);
  assert.notEqual(refused.status, 0);
  assert.match(refused.stderr, /Already installed/);
  assert.ok(fs.existsSync(path.join(target, 'local-marker.txt')));

  const upgraded = run('install', '--force', '--target', target);
  assert.equal(upgraded.status, 0, upgraded.stderr);
  const backupLine = upgraded.stdout.split('\n').find(line => line.startsWith('Backup: '));
  assert.ok(backupLine, upgraded.stdout);
  const backup = backupLine.slice('Backup: '.length);
  assert.equal(fs.readFileSync(path.join(backup, 'local-marker.txt'), 'utf8'), 'preserve in backup');
  assert.ok(!fs.existsSync(path.join(target, 'local-marker.txt')));
  assert.ok(fs.existsSync(path.join(target, 'references', 'component-decision-matrix.md')));
});

test('supports help, version, and rejects unknown commands', () => {
  const help = run('--help');
  assert.equal(help.status, 0);
  assert.match(help.stdout, /Usage:/);

  const version = run('--version');
  assert.equal(version.status, 0);
  assert.match(version.stdout, /^1\.1\.0\n$/);

  const invalid = run('remove');
  assert.notEqual(invalid.status, 0);
  assert.match(invalid.stderr, /Unknown command/);
});
