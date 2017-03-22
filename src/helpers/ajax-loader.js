'use strict';

// var xhr = require('request');
// var xhr = require('xhr');
var offersResponse = require('./offers-response');

var helper = {};

var transformCards = function(initialCardsResponse) {
  return initialCardsResponse.data.map(function(card) {
    var cname;
    var territory = card.territory;
    if (territory && territory.countryGroup) {
      if (Array.isArray(territory.countryGroup)) {
        cname = territory.countryGroup.join('; ');
      }
    }

    return {
      id: card.productId,
      companyId: card.companyId,
      currency: card.currency,
      price: card.price,
      priceRub: card.priceRub,
      companyName: cname || 'empty'
    };
  });
};

helper.load = function(endpoint, resolve, reject) {
  if (endpoint === null) { return null; }

  // callback will be called once with the arguments ( Error, response , body ) where the response is an object:
  var callback = function(err, resp, body) {
    if (err) { reject(err); return; }

    if (resp.statusCode === 200) {
      // console.log('body', body);
      var cards = transformCards(JSON.parse(body));
      resolve(cards);
    } else {
      console.log('resp', resp);
      reject(body);
    }
  };

  // var req = xhr({
  //   uri: endpoint
  // }, callback);

  // return function() {
  //   req.abort();
  // };

  var timeoutInstance = setTimeout(function() {
    callback(null, { statusCode: 200 }, JSON.stringify(offersResponse));
  }, 1500);

  return clearTimeout.bind(null, timeoutInstance);
};

module.exports = helper;
