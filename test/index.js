const test = require('tape-async');
const debugMenu = require('..');

test('add details files', function *(t) {
  const result = yield debugMenu();
  t.equal(result, 42);
});
