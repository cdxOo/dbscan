var expect = require('chai').expect,
    dbscan = require('../src/');

describe('dbscan()', () => {

    it('clusters stuff as expected', () => {
        var result = dbscan({
            dataset: [1,2,3,4, 7,8,9,10, 20],
            epsilonCompare: (dist, e) => (dist <= e)
        });
        
        //console.log(result);
        expect(result).to.deep.eql({
            clusters: [[0,1,2,3], [4,5,6,7]],
            noise: [8]
        });
    });

});
