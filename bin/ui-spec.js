#!/usr/bin/env node

'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const packageJson = require('../package.json');

const SKILL_NAME = 'ui-spec';
const SOURCE_ROOT = path.resolve(__dirname, '..');
const RUNTIME_ENTRIES = ['SKILL.md', 'agents', 'references', 'scripts'];
const DISTRIBUTION_ONLY_ENTRIES = ['README.md', 'LICENSE', 'package.json', 'bin', 'tests'];

function printHelp() {
  process.stdout.write(`UI Spec ${packageJson.version}\n\nUsage:\n  ui-spec install [--force] [--target <skill-directory>]\n  ui-spec doctor [--target <skill-directory>]\n  ui-spec --help\n  ui-spec --version\n\nOptions:\n  --force             Replace an existing installation after creating a backup.\n  --target <path>     Install or inspect an explicit skill directory.\n                      Default: \${CODEX_HOME:-~/.codex}/skills/${SKILL_NAME}\n`);
}

function parseArgs(argv) {
  const options = { command: 'install', force: false, target: undefined };
  const args = [...argv];

  if (args[0] && !args[0].startsWith('-')) {
    options.command = args.shift();
  }

  while (args.length) {
    const arg = args.shift();
    if (arg === '--force') {
      options.force = true;
    } else if (arg === '--target') {
      const value = args.shift();
      if (!value || value.startsWith('-')) throw new Error('--target requires a directory path.');
      options.target = path.resolve(value);
    } else if (arg === '--help' || arg === '-h') {
      options.command = 'help';
    } else if (arg === '--version' || arg === '-v') {
      options.command = 'version';
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function defaultTarget() {
  const codexHome = process.env.CODEX_HOME
    ? path.resolve(process.env.CODEX_HOME)
    : path.join(os.homedir(), '.codex');
  return path.join(codexHome, 'skills', SKILL_NAME);
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function copyRuntime(stage) {
  for (const entry of RUNTIME_ENTRIES) {
    const source = path.join(SOURCE_ROOT, entry);
    if (!fs.existsSync(source)) throw new Error(`Package is incomplete: missing ${entry}.`);
    fs.cpSync(source, path.join(stage, entry), { recursive: true, errorOnExist: true });
  }

  const installedSkill = fs.readFileSync(path.join(stage, 'SKILL.md'), 'utf8');
  if (!/^name:\s+ui-spec$/m.test(installedSkill)) {
    throw new Error('Package validation failed: SKILL.md has an unexpected name.');
  }
}

function install(options) {
  const target = options.target || defaultTarget();
  const parent = path.dirname(target);
  const stage = path.join(parent, `.${SKILL_NAME}.install-${process.pid}-${Date.now()}`);
  const backupRoot = options.target
    ? path.join(parent, '.skill-backups')
    : path.join(path.dirname(parent), 'skill-backups');
  let backup;

  fs.mkdirSync(parent, { recursive: true });

  if (fs.existsSync(target) && !options.force) {
    throw new Error(`Already installed at ${target}. Re-run with --force to back up and replace it.`);
  }

  try {
    fs.mkdirSync(stage);
    copyRuntime(stage);

    if (fs.existsSync(target)) {
      fs.mkdirSync(backupRoot, { recursive: true });
      backup = path.join(backupRoot, `${path.basename(target)}.backup-${timestamp()}`);
      fs.renameSync(target, backup);
    }

    fs.renameSync(stage, target);
  } catch (error) {
    if (fs.existsSync(stage)) fs.rmSync(stage, { recursive: true, force: true });
    if (backup && !fs.existsSync(target) && fs.existsSync(backup)) {
      fs.renameSync(backup, target);
    }
    throw error;
  }

  process.stdout.write(`Installed ${SKILL_NAME} ${packageJson.version}\nTarget: ${target}\n`);
  if (backup) process.stdout.write(`Backup: ${backup}\n`);
  process.stdout.write('Restart Codex or start a new task, then invoke $ui-spec.\n');
}

function doctor(options) {
  const target = options.target || defaultTarget();
  if (!fs.existsSync(target)) {
    throw new Error(`Skill is not installed at ${target}. Run ui-spec install first.`);
  }

  const missing = RUNTIME_ENTRIES.filter(entry => !fs.existsSync(path.join(target, entry)));
  if (missing.length) {
    throw new Error(`Installed Skill is incomplete at ${target}. Missing: ${missing.join(', ')}.`);
  }

  const skillText = fs.readFileSync(path.join(target, 'SKILL.md'), 'utf8');
  if (!/^name:\s+ui-spec$/m.test(skillText)) {
    throw new Error(`SKILL.md at ${target} does not declare name: ui-spec.`);
  }

  const distributionFiles = DISTRIBUTION_ONLY_ENTRIES.filter(entry => fs.existsSync(path.join(target, entry)));
  if (distributionFiles.length) {
    throw new Error(`Found distribution-only files in the Skill runtime: ${distributionFiles.join(', ')}. Install with npx instead of cloning the repository into the skills directory.`);
  }

  process.stdout.write(`Valid Codex Skill runtime\nName: ${SKILL_NAME}\nTarget: ${target}\nEntries: ${RUNTIME_ENTRIES.join(', ')}\n`);
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.command === 'help') return printHelp();
    if (options.command === 'version') return process.stdout.write(`${packageJson.version}\n`);
    if (options.command === 'install') return install(options);
    if (options.command === 'doctor') return doctor(options);
    throw new Error(`Unknown command: ${options.command}`);
  } catch (error) {
    process.stderr.write(`Error: ${error.message}\n`);
    process.exitCode = 1;
  }
}

main();
