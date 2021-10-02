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
    '\nusage:\nmsbump --p path/to/project.csproj [major|minor|patch|build]\n\n'
  );
  process.exit(-1);
}
const action = argv._.length > 0 ? argv._[0] : 'build';
console.log(action, path);
const result = new Bump(path, action).bump() ? 0 : -1;
if (result) {
  console.error(`failed to ${action} ${path}`);
}
process.exit(result);
