'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const { version: packageVersion } = require('../package.json');

const root = path.resolve(__dirname, '..');
const cli = path.join(root, 'bin', 'ui-spec.js');

function runWithEnv(env, ...args) {
  return spawnSync(process.execPath, [cli, ...args], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, ...env }
  });
}

function run(...args) {
  return runWithEnv({}, ...args);
}

test('installs, refuses accidental overwrite, and performs backup upgrade', t => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ui-spec-'));
  const target = path.join(temp, 'codex', 'skills', 'ui-spec');
  t.after(() => fs.rmSync(temp, { recursive: true, force: true }));

  const first = run('install', '--target', target);
  assert.equal(first.status, 0, first.stderr);
  assert.match(first.stdout, /Installed ui-spec/);
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
  assert.ok(fs.existsSync(path.join(target, 'references', 'component-index.md')));
  assert.ok(fs.existsSync(path.join(target, 'references', 'components', 'navigation.md')));
  assert.ok(fs.existsSync(path.join(target, 'references', 'components', 'overlays.md')));
  assert.ok(fs.existsSync(path.join(target, 'references', 'components', 'motion.md')));
  assert.ok(fs.existsSync(path.join(target, 'references', 'components', 'loading-and-progress.md')));

  const doctor = run('doctor', '--target', target);
  assert.equal(doctor.status, 0, doctor.stderr);
  assert.match(doctor.stdout, /Valid Codex Skill runtime/);
  assert.match(doctor.stdout, /Entries: SKILL.md, agents, references, scripts/);
});

test('supports help, version, and rejects unknown commands', () => {
  const help = run('--help');
  assert.equal(help.status, 0);
  assert.match(help.stdout, /Usage:/);

  const version = run('--version');
  assert.equal(version.status, 0);
  assert.equal(version.stdout, `${packageVersion}\n`);

  const invalid = run('remove');
  assert.notEqual(invalid.status, 0);
  assert.match(invalid.stderr, /Unknown command/);
});

test('doctor rejects a distribution repository used as the runtime directory', () => {
  const doctor = run('doctor', '--target', root);
  assert.notEqual(doctor.status, 0);
  assert.match(doctor.stderr, /distribution-only files/);
  assert.match(doctor.stderr, /Install with npx/);
});
