define(['queryInterpreter'], function (QueryInterpreter) {

  describe('QueryInterpreter unit tests', function () {
    var interpreter = new QueryInterpreter();

    it('should create a QueryInterpreter', function () {
      assert.isNotNull(new QueryInterpreter());
      assert.Throw(QueryInterpreter);
    });

    it('should interpret operators like more than, less than or between', function () {
      var sentences = [
        { natural: 'more than', interpreted: '>' },
        { natural: 'more than more than More thAN', interpreted: '> > >' },
        { natural: 'less than', interpreted: '<' },
        { natural: 'between 1 and 2', interpreted: ':1 to 2' },
        { natural: 'between 1 and 2 between 3 AND 4', interpreted: ':1 to 2 :3 to 4' }
      ],
        i = 0,
        l = sentences.length,
        sentence,
        interpretation;

      for (; i < l; i++) {
        sentence = sentences[i];
        interpretation = interpreter.translate(sentence.natural);
        interpretation.should.equal(sentence.interpreted);
      }
    });

    it('should interpret numbers in the form of 10k', function () {
      var sentences = [
        { natural: ' 3k', interpreted: ' 3000' },
        { natural: 'a 10 b', interpreted: 'a 10 b' },
        { natural: 'a 10k b', interpreted: 'a 10000 b' },
        { natural: 'a 10M b', interpreted: 'a 10000000 b' }
      ],
        i = 0,
        l = sentences.length,
        sentence,
        interpretation;

      for (; i < l; i++) {
        sentence = sentences[i];
        interpretation = interpreter.translate(sentence.natural);
        interpretation.should.equal(sentence.interpreted);
      }
    });

    it('should interpret phrases with operators like > and numbers in the form of 10k', function () {
      var sentences = [
        { natural: 'likes more than 3k', interpreted: 'likes>3000' },
        { natural: 'facebook.likes more than 3k', interpreted: 'facebook.likes>3000' },
        { natural: 'with more than 45k facebook.likes', interpreted: 'with facebook.likes>45000' },
        { natural: 'percentageOfLikes more than 0.706', interpreted: 'percentageOfLikes>0.706' },
        { natural: 'with more than 0.34 percentageOfLikes', interpreted: 'with percentageOfLikes>0.34' },
        { natural: 'with more than 3k likes', interpreted: 'with likes>3000' },
        {
          natural: 'with more than 3k likes and less than 1500 pageReach',
          interpreted: 'with likes>3000,pageReach<1500'
        },
        {
          natural: 'with more than 3k likes in "United States"',
          interpreted: 'with likes>3000,country:"United States"'
        },
        {
          natural: 'with more than 3k likes in "United States" and country.pageReach more than 1k',
          interpreted: 'with likes>3000,country:"United States",country.pageReach>1000'
        }
      ],
        i = 0,
        l = sentences.length,
        sentence,
        interpretation;

      for (; i < l; i++) {
        sentence = sentences[i];
        interpretation = interpreter.translate(sentence.natural);
        interpretation.should.equal(sentence.interpreted);
      }
    });

    it.skip('should replace facebook, youtube, website or twitter to type:"facebook"', function () {
      var sentences = [
        { natural: 'facebook with more than 3k likes', interpreted: 'type:"facebook" with likes>3000' },
        {
          natural: 'facebook twitter youtube website ignored',
          interpreted: 'type:"facebook" type:"twitter" type:"youtube" type:"website" ignored'
        }
      ],
        i = 0,
        l = sentences.length,
        sentence,
        interpretation;

      for (; i < l; i++) {
        sentence = sentences[i];
        interpretation = interpreter.translate(sentence.natural);
        interpretation.should.equal(sentence.interpreted);
      }
    });

    it('should find numeric filters in query', function () {
      var testQuery = 'with facebook.likes>3000,country:"United States",country.pageReach>1000,percentageOfLikes>0.45',
        expectedNumericFilters = [
          'facebook.likes>3000',
          'country.pageReach>1000',
          'percentageOfLikes>0.45'
        ],
        actualNumericFilters,
        i = 0,
        l = expectedNumericFilters.length;

        actualNumericFilters = interpreter.findNumericFilters(testQuery);
        actualNumericFilters.length.should.be.equal(l);

        for (; i < l; i++) {
          actualNumericFilters[i].should.be.equal(expectedNumericFilters[i]);
        }
    });

    it('should find text filters in query', function () {
      var testQuery = 'with facebook.likes>3000,country:"United States",country.pageReach>1000,percentageOfLikes>0.45',
        expectedTextFilters = [
          'country:United States'
        ],
        actualTextFilters,
        i = 0,
        l = expectedTextFilters.length;

        actualTextFilters = interpreter.findTextFilters(testQuery);
        actualTextFilters.length.should.be.equal(l);

        for (; i < l; i++) {
          actualTextFilters[i].should.be.equal(expectedTextFilters[i]);
        }
    });

    it('should find field in the form of likes on facebook', function () {
      var sentences = [
        { natural: 'with more than 3k likes on facebook', interpreted: 'with facebook_likes>3000' },
        {
          natural: 'likes on facebook followers on twitter videos on youtube visits on website ignored',
          interpreted: 'facebook_likes twitter_followers youtube_videos website_visits ignored'
        }
      ],
        i = 0,
        l = sentences.length,
        sentence,
        interpretation;

      for (; i < l; i++) {
        sentence = sentences[i];
        interpretation = interpreter.translate(sentence.natural);
        interpretation.should.equal(sentence.interpreted);
      }
    });
  })
});
