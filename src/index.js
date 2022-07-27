module.exports = ({
    dataset,
    epsilon,
    epsilonCompare,
    minimumPoints,
    distanceFunction
}) => {
    epsilon = epsilon || 1; // aka maxDistance
    epsilonCompare = epsilonCompare || ((dist, e) => dist < e);
    minimumPoints = minimumPoints || 2;
    distanceFunction = distanceFunction || ((a, b) => Math.abs(a - b));

    var visitedIndices = {},
        isVisited = (i) => ( visitedIndices[i] ),
        markVisited = (i) => { visitedIndices[i] = true };

    var clusteredIndices = {},
        isClustered = (i) => ( clusteredIndices[i] ),
        markClustered = (i) => { clusteredIndices[i] = true };

    var uniqueMerge = (targetArray, sourceArray) => {
        for (var i = 0; i < sourceArray.length; i += 1) {
            var item = sourceArray[i];
            if (targetArray.indexOf(item) < 0) {
                targetArray.push(item);
            }
        }
    };

    var findNeighbors = (index) => {
        var neighbors = [];
        for (var other = 0; other < dataset.length; other += 1) {
            var distance = distanceFunction(dataset[index], dataset[other]);
            if (epsilonCompare(distance, epsilon)) {
                neighbors.push(other);
            }
        }
        return neighbors;
    };

    var noise = [],
        addNoise = (i) => noise.push(i); 

    var clusters = [],
        createCluster = () => ( clusters.push([]) - 1 ),
        addIndexToCluster = (c, i) => {
            clusters[c].push(i);
            markClustered(i);
        };

    var expandCluster = (c, neighbors) => {
        for (var i = 0; i < neighbors.length; i += 1) {
            var neighborIndex = neighbors[i];
            if (!isVisited(neighborIndex)) {
                markVisited(neighborIndex);
                
                var secondaryNeighbors = findNeighbors(neighborIndex);
                if (secondaryNeighbors.length >= minimumPoints) {
                    uniqueMerge(neighbors, secondaryNeighbors);
                }
            }

            if (!isClustered(neighborIndex)) {
                addIndexToCluster(c, neighborIndex);
            }
        }
    };

    dataset.forEach((unused, index) => {
        if (!isVisited(index)) {
            markVisited(index);

            var neighbors = findNeighbors(index);
            if (neighbors.length < minimumPoints) {
                noise.push(index);
            }
            else {
                var clusterIndex = createCluster();
                addIndexToCluster(clusterIndex, index);
                expandCluster(clusterIndex, neighbors);
            }
            
        }
    });
    
    return ({ clusters, noise });
}
