var extend = require('extend');
var person = require('./person');

var insurant = {};
extend(insurant, person, {
  // override person.id (Integer)
  identifier: {
    type: 'Decade',
    label: 'ИД застрахованного'
  },

  orderNumber: {
    type: 'Text',
    label: 'Застрахованное лицо №',
    computed: ['identifier', function(identifier) {
      return identifier + ''; // or id + 1 (for 0-based ids)
    }]
  },

  specialConditions: {
    type: 'Text',
    label: 'Специальные условия застрахованного лица к полису'
  }
});

module.exports = insurant;
