'use strict';
const assert = require('assert');
const dbscan = require('@cdxoo/dbscan');

assert.strictEqual(typeof dbscan, 'function');

var out = dbscan({
    dataset: [0.1, 0.2, 0.3,  9.1, 9.2, 9.3, 100.0 ]
});
assert.deepEqual(out, {
    clusters: [ [0,1,2], [3,4,5] ],
    noise: [ 6 ]
})

console.log('CommonJS entrypoint test passed');
