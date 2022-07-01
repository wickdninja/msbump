#!/usr/bin/env node
const Bump = require('./bump');
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const path = argv.path
  ? argv.path
  : argv.p
  ? argv.p
  : argv.project
  ? argv.project
  : null;
if (!path) {
  console.error('\n--[path|project|p] required');
  console.error(
    '\nusage:\nmsbump --p path/to/project.csproj [major|minor|patch|build] [--current] [--dry] [--tag]\n\n'
  );
  process.exit(-1);
}
const current = !!argv.current;
const dryRun = !!argv.dry;
const tag = !!argv.tag;

const action = argv._.length > 0 ? argv._[0] : 'build';
const result = new Bump(path, action).bump(current, dryRun, tag) ? 0 : -1;
if (result) {
  console.error(`failed to ${action} ${path}`);
}
process.exit(result);
