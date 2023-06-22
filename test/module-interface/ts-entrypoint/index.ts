// vim: shiftwidth=4
import assert from 'assert';
import dbscan from '@cdxoo/dbscan';

assert.strictEqual(typeof dbscan, 'function');

var default_args_out = dbscan({
    dataset: [0.1, 0.2, 0.3,  9.1, 9.2, 9.3, 100.0 ]
});
assert.deepEqual(default_args_out, {
    clusters: [ [0,1,2], [3,4,5] ],
    noise: [ 6 ]
});

var full_args_out = dbscan({
    dataset: [
        { x: 0.1 }, { x: 0.2 }, { x: 0.3 }, 
        { x: 9.1 }, { x: 9.2 }, { x: 9.3 },
        { x: 100.0 }
    ],
    epsilon: 1.0,
    epsilonCompare: (dist, e) => (dist < e),
    distanceFunction: (a,b) => Math.abs(a.x - b.x),
    minimumPoints: 2,
});
assert.deepEqual(full_args_out, {
    clusters: [ [0,1,2], [3,4,5] ],
    noise: [ 6 ]
});
console.log('TypeScript entrypoint test passed');
