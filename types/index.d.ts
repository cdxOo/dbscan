declare function DBSCAN<T = any>({
    dataset,
    epsilon,
    epsilonCompare,
    minimumPoints,
    distanceFunction
}: {
    dataset: T[];
    epsilon?: number;
    epsilonCompare?: (distance: number, epsilon: number) => boolean;
    minimumPoints?: number;
    distanceFunction?: (a: T, b: T) => number;
}): {
    clusters: number[][];
    noise: number[];
};

export = DBSCAN;
