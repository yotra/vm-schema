'use strict';

const allowedCountries = require('./data/countries');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
};

const isNumber = function(num) {
  return (isNaN(num) === false) && isFinite(num);
};

module.exports = {
  Boolean: {
    isValid: function(value) {
      return typeof value === 'boolean';
    }
  },
  Text: {
    isValid: function(value) {
      return typeof value === 'string';
    }
  },
  URL: {
    isValid: function(value) {
      // urls can be relative: /some-icon.png
      // hard-coded most used length
      return (typeof value === 'string' && value.length <= 2000);
    }
  },
  // http://some-img.jpeg|alt=Welcome|width=200|height=100
  Image: {
    isValid: function(value) {
      const parts = value.split('|');
      const srcUrl = parts[0];
      // TODO: check other parts
      return typeof value === 'string' && srcUrl && srcUrl.length > 0;
    }
  },
  Number: {
    isValid: function(value) { return isNumber(value); }
  },
  Float: {
    isValid: function(value) { return isNumber(value); }
  },
  Integer: {
    isValid: function(value) { return Number.isInteger(value); }
  },
  Age: {
    min: 0,
    max: 120,
    isValid: function(value) {
      return (Number.isInteger(value) &&
              value >= this.min && value <= this.max);
    }
  },
  Decade: {
    min: 1,
    max: 10,
    isValid: function(value) {
      return (Number.isInteger(value) &&
              value >= this.min && value <= this.max);
    }
  },
  Country: {
    allowed: allowedCountries,
    isValid: function(value) {
      const ids = this.allowed.map(function(c) {
        return c.id;
      });

      return (typeof value === 'string' &&
              ids.indexOf(value) >= 0);
    }
  },
  Date: {
    regExp: /^\d{4}-[01]\d-[0-3]\d$/,
    isValid: function(value) { return this.regExp.test(value); }
  },
  Duration: {
    regExp: /^P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)D)?$/,
    isValid: function(value) { return this.regExp.test(value); }
  }
};

// TODO: Date best validation
// const m = moment(value, isoFormat, true);
// return m.isValid();
