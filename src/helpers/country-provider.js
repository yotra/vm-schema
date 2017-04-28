/* eslint-disable */

'use strict';

// data + translator
const data = [
  {"id":"france","name":"Франция"},
  {"id":"finland","name":"Финляндия"},
  {"id":"estonia","name":"Эстония"}
];

module.exports = {
  getNameById: function(id) {
    const country = data.filter(function(c) {
      return c.id === id;
    })[0];
    
    return country ? country.name : null;
  }
};
