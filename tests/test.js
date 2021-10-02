var Bump = require('../lib/bump');

var bump = new Bump('tests/test.csproj', 'major');
const result = bump.bump() ? 0 : 1;
process.exit(result);
