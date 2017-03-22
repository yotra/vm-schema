'use strict';

module.exports = {
  id: {
    type: 'Integer',
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
    computed: ['id', function(id) {
      if (id === null) { return null; }
      return './product/' + id;
    }]
  }
};
