define(function () {
  'use strict';

  function QueryInterpreter() {
    if (!(this instanceof QueryInterpreter)) {
      throw new TypeError('Please use the new keyword to create a QueryInterpreter');
    }
  }

  QueryInterpreter.prototype = {
    constructor: QueryInterpreter,

    // tranlations to convert natural language to a more query like languege
    translations: [
      // likes on facebook to facebook_likes
      [/(\w+)\son\s(facebook|twitter|youtube|website)/gi, '$2_$1'],
      // operators like > <
      [/less than/gi, '<'],
      [/more than/gi, '>'],
      [/between (\d+) and (\d+)/gi, ':$1 to $2'],
      // numbers in the form of 10k
      [/\s(\d+)k(?=\s)*/gi, ' $1000'],
      // TODO Try to merge previous and next regular expressions into a single one
      [/\s(\d+)M(?=\s)*/gi, ' $1000000'],
      // with {numericField} {operator} {value}
      [/(with|and)\s([><])\s(\d+(\.\d+)*)\s(\w+(\.\w+)*)/gi, '$1 $5$2$3'],
      // and is replaced by ,
      [/\s(and)\s/gi, ','],
      // in is replaced by ,country:
      [/\s*(in)\s/gi, ',country:'],
      // a > b to a>b
      [/(\w+)\s([><])\s(\d+)/gi, '$1$2$3']
      // facebook to type="facebook"
        // Commented because this functionality is not required at the moment
      //[/(facebook|twitter|youtube|website)/gi, 'type:"$1"']
    ],

    // patterns to find queries between strings
    patterns: {
      // numeric a>b
      fieldOperatorNumber: /(\w+(\.\w+)*)[><](\d+(\.\d+)*)/gi,
      fieldText: /(\w+):"(\w+\s*\w*)"/gi
    },

    translate: function (text) {
      var i = 0,
          l = this.translations.length;
      for (; i < l; i++) {
        text = String.prototype.replace.apply(text, this.translations[i]);
      }
      return text;
    },

    findNumericFilters: function (text) {
      return text.match(this.patterns.fieldOperatorNumber);
    },

    findTextFilters: function (text) {
      var matches = text.match(this.patterns.fieldText) || [];
      // matches containes items in the form of country:"country" but those " need to be removed
      return matches.map(function (match) {
        return match.replace(/"/gi, '');
      });
    }
  };

  return QueryInterpreter;
});
