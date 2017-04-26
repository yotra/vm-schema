'use strict';

var extend = require('extend');
var ajaxLoader = require('./helpers/ajax-loader');
var config = require('../config');

var personSchema = require('./person');
var insuredPlaceSchema = require('./insured-place');
var insuredEventSchema = require('./insured-event');
var insurantSchema = require('./insurant');
var policyOfferSchema = require('./policy-offer');

var insurerSchema = {};
extend(insurerSchema, personSchema, {});

// http://schema.org/FinancialService
module.exports = {
  url: { type: 'URLID', label: 'ID' },

  name: {
    type: 'Text',
    // Полис ВЗР
    label: 'Название услуги'
  },

  description: {
    type: 'Text',
    label: 'Описание услуги'
  },

  dateVisa: {
    type: 'Date',
    // Дата получения визы (если несколько стран требует полис для визы, то это наименьшая дата)
    label: 'Дата получения визы'
  },

  // выбранные страны
  insuredPlaces: {
    type: 'ItemList',
    label: 'Страны',
    schema: 'Country',
    ref: insuredPlaceSchema
  },

  // страны, доступные для быстрого выбора: Шенген, Тайланд - top3pop
  // страны, доступные для основного выбора: 200 стран

  insurants: {
    type: 'ItemList',
    label: 'Туристы',
    schema: 'Person',
    ref: insurantSchema
  },

  insurer: {
    type: 'Item',
    label: 'Услуги',
    schema: 'Person',
    ref: insurerSchema
  },

  insuredEvent: {
    type: 'Item',
    label: 'Даты',
    schema: 'Event',
    ref: insuredEventSchema
  },

  // policyVendor
  // policyAgency
  // products

  // virtual
  // insurants: select * from insurants where policyId = id;
  // insurer: select * from insurers where policyId = id Limit 1;
  //  or insurers[0]: 1 to 1 relation
  // policyPlaces: select * from policyPlaces where policyId = id;

  insuredPlacesWarning: {
    type: 'Text',
    label: 'Валидация стран',
    computed: ['url', 'insuredPlaces', function(identifier, insuredPlaces) {
      if (identifier === null) { return null; }

      if (insuredPlaces.length < 1) {
        return 'Выберите хотя бы одну страну';
      }

      return '';
    }]
  },

  insuredEventWarning: {
    type: 'Text',
    label: 'Валидация дат поездки',
    computed: ['url', 'insuredEvent', function(identifier, insuredEvent) {
      if (identifier === null ||
          insuredEvent === null) {
        return null;
      }

      if (insuredEvent.isFixed !== true) {
        return 'Укажите корректные даты поездки';
      }

      return '';
    }]
  },

  insurantsWarning: {
    type: 'Text',
    label: 'Валидация застрахованных лиц',
    computed: ['url', 'insurants', function(identifier, insurants) {
      if (identifier === null) { return null; }

      // all insurants must be filled
      // at least one insurant must be
      var isAllInsurantsValid = insurants.every(function(t) {
        return t.age > 0 || t.age === 0;
      });

      if (isAllInsurantsValid === false) {
        return 'Укажите возраст всех туристов';
      }

      if (insurants.length < 1) {
        return 'Добавьте хотя бы одного туриста';
      }

      return '';
    }]
  },

  calculableWarning: {
    type: 'Text',
    label: 'необходимо заполнить',
    computed: ['url', 'insuredPlacesWarning', 'insurantsWarning', function (identifier, insuredPlacesWarning, insurantsWarning) {
      if (identifier === null) { return null; }
      if (insuredPlacesWarning) { return insuredPlacesWarning; }

      if (insurantsWarning) { return insurantsWarning; }

      return ''; // no warning
    }]
  },

  // calculates when any array is changed
  isCalculable: {
    type: 'Boolean',
    label: 'Возможен ли расчёт?',
    computed: [
      'url',
      'insuredPlacesWarning',
      'insuredEventWarning',
      'insurantsWarning',
      function(identifier, w1, w2, w3) {
        if (identifier === null ||
            w1 === null ||
            w2 === null ||
            w3 === null) {
          return null;
        }
        // no messages - then valid
        return !w1 && !w2 && !w3;
      }
    ]
  },

  offersWarning: {
    type: 'Text',
    label: 'Сообщение о результатах',
    computed: ['isCalculable', function(isCalculable) {
      if (isCalculable === null) { return null; }

      if (isCalculable === true) {
        // показать кол-во продуктов
        return 'Показать список продуктов';
      }

      return '';
    }]
  },

  offersEndpoint: {
    // URL must exist always (Search Engine rule)
    // type URL replaced by simple Text
    type: 'Text',
    label: 'URL предложений',
    computed: [
      'isCalculable',
      'insuredEvent',
      function(isCalculable,
               tour) {
        if (isCalculable === null ||
            isCalculable === false ||
            tour === null) {
          return null;
        }

        var apiProps = {
          currency: 'eur',
          // TODO: convert from ISO to GOST
          dateStart: tour.startDate, // '24.12.2017',
          dateEnd: tour.endOutput, // '25.12.2017',
          // TODO: convert to days from duration
          insuredDays: tour.insuredDuration || null, // can be null
          'service%5Bmedicine%5D': 30000,
          'key': config.API_KEY
        };

        var parts = [];

        Object.keys(apiProps).forEach(function(key) {
          var val = apiProps[key];
          if (val !== null && val !== undefined) {
            parts.push(key + '=' + val);
          }
        });

        return config.API_ENDPOINT + '/quote?' + parts.join('&');
      }]
  },

  offers: {
    type: 'ItemList',
    label: 'Предложения',
    schema: 'Offer',
    ref: policyOfferSchema,
    computedAsync: ['offersEndpoint', ajaxLoader.load]
  }
};

// easync: {
//   type: 'Text',
//   label: 'SomeAsync',
//   computedAsync: ['offersEndpoint', function(endpoint, resolve) {
//     if (endpoint === null) { return null; }
//     var t = setTimeout(function() {
//       resolve('supertext');
//     }, 2000);
//     return clearTimeout.bind(null, t);
//   }]
// }
