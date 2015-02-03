define(function () {
  'use strict';

  function QueryInterpreter () {
    if (!(this instanceof QueryInterpreter)) {
      throw new TypeError('Please use the new keyword to create a QueryInterpreter');
    }
  }

  QueryInterpreter.prototype = {
    constructor: QueryInterpreter,

    translations: [
      // operators like > <
      [ /less than/gi, '<'],
      [ /more than/gi, '>'],
      [ /between (\d+) and (\d+)/gi, ':$1 to $2'],
      // numbers in the form of 10k
      [ /\s(\d+)k(?=\s)*/gi, ' $1000'],
      // TODO Try to merge previous and next regular expressions into a single one
      [ /\s(\d+)M(?=\s)*/gi, ' $1000000']
    ],

    translate: function (text) {
      var i = 0,
          l = this.translations.length;
      for (; i < l; i++) {
        text = String.prototype.replace.apply(text, this.translations[i]);
      }
      return text;
    }
  };

  return QueryInterpreter;
});
