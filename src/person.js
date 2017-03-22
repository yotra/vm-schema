'use strict';

module.exports = {
  id: {
    type: 'Integer',
    label: 'ИД'
  },

  name: {
    type: 'Text',
    label: 'Имя'
  },

  age: {
    type: 'Age',
    label: 'Возраст, лет'
  },

  birthDate: {
    type: 'Date',
    label: 'Дата рождения'
  },

  // TODO: move to Age type
  isAdult: {
    type: 'Boolean',
    label: 'Совершеннолетний?',
    computed: ['age', function (age) {
      if (age === null) { return null; }
      return age >= 18;
    }]
  }

  // virtual
  // мнимая связь, существующая только в пределах системы
  // insurants: select * from insurants where personId = id
};
