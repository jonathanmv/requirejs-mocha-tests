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

  })
});
