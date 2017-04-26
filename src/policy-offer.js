'use strict';

module.exports = {
  url: {
    type: 'URLID',
    label: 'Идентификатор продукта'
  },
  companyId: {
    type: 'Integer',
    label: 'Идентификатор страховой компании'
  },
  companyName: {
    type: 'Text',
    label: 'Название страховой компании'
  },
  currency: {
    // TODO: type Currency (USD, RUB, EUR, etc.)
    type: 'Text',
    label: 'Валюта'
  },
  price: {
    type: 'Number',
    label: 'Цена'
  },
  priceRub: {
    type: 'Number',
    label: 'Цена в рублях'
  },
  infoUrl: {
    type: 'URL',
    label: 'Адрес продукта',
    computed: ['url', function(identifier) {
      if (identifier === null) { return null; }
      return './product/' + identifier;
    }]
  }
};
