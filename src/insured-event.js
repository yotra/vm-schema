var extend = require('extend');
var event = require('./event');

// data from (event + policy)
var insuredEvent = {};
extend(insuredEvent, event, {
  insuredDuration: {
    type: 'Duration',
    label: 'Период страхования, кол-во дней'
  }
});

module.exports = insuredEvent;
