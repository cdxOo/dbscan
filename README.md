# @cdxoo/dbscan

Customizable DBSCAN clustering for arbirary datasets.

## Installation

    npm install --save @cdxoo/dbscan
    
## Usage

```javascript
const dbscan = require('@cdxoo/dbscan');
    
let simpleResult = dbscan({
    dataset: [21,22,23,24, 27,28,29,30, 9001],
    epsilon: 1.01,
});
// => {
//    clusters: [ [0,1,2,3], [4,5,6,7] ],
//    noise: [ 8 ]
//}

let objectResult = dbscan({
    dataset: [{ foo: 21 }, { foo: 22 }, { foo: 27 }, { foo: 28 }],
    epsilon: 1.1,
    distanceFunction: (a,b) => Math.abs(a.foo - b.foo)
});
// => {
//    clusters: [ [0,1], [2,3] ],
//    noise: []
//}
```

## Parameters
```javascript
dbscan({
    dataset: [],  // An array of datapoints.
                  // Datapojnts can be anything when you
                  // use a custom distance function.
    epsilon: 1.3, // Maximum distance between datapoints.
                  // Determine if a datapoint is in a cluster or not.
                  // Default is 1.0
    epsilonCompare: (distance, epsilon) => ( /*...*/ ),
                  // Custom function to compare calculated
                  // distance and epsilon. Must return true/false.
                  // Default is (dist, e) => (dist < e)
    distanceFunction: (a, b) => ( /*...*/ ),
                  // Custom function to calculate the distance
                  // between two datapoints. Must be given when
                  // working with higher dimensional datasets,
                  // or datasets whose items are objects.
                  // The default function only works on
                  // one-dimensional data points.
                  // Defaults is (a, b) => Math.abs(a - b)
    minimumPoints: 2,
                  // Threshold of how many points are needed
                  // in the same neighborhood to form a cluster.
                  // Default is 2
             
})
```
