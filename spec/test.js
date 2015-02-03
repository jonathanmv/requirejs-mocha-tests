/* global describe, it */

(function () {
  'use strict';
  
  var appId = '{{APPLICATION_ID}}',
    appKey = '{{APPLICATION_KEY}}',
    client = new AlgoliaSearch(appId, appKey); 

  describe('Search on index', function  () {
    var indexName = 'INDEX_NAME',
      index = client.initIndex(indexName);
    
    it('should retrieve results', function (done){
      index.search('', function (success, results) {
        assert.isTrue(success, 'Query was not successful');
        assert.isTrue(results.hits.length > 0, 'No results were retrieved');
        done();
      });
    });
  });
})();
