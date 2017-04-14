const typeCountry = require('./types').Country;

// место действия полиса: страна, группа стран
module.exports = {
  identifier: {
    type: 'Country',
    label: 'ИД'
  },

  name: {
    type: 'Text',
    label: 'Страна',
    computed: ['identifier', function(identifier) {
      return typeCountry.allowed.filter(function(c) {
        return c.id === identifier;
      })[0].name;
    }]
  },

  visitDate: {
    type: 'Date',
    // если предполагается несколько посещений, то первая дата
    label: 'Дата предполагаемого посещения места по данному полису'
  },

  restrictions: {
    type: 'Text',
    // например: не действует в каких-то городах страны
    label: 'Ограничения полиса, действующие на территории места/страны'
  },

  // на данный момент эти поля вычисляемые, так как нет нужных данных в источнике, например {id:italy, isDateVisaRequired: true, isShengen: true}
  // при появлении этих полей в источнике - данные будут подгружаться напрямую без вычислений
  isDateVisaRequired: {
    type: 'Boolean',
    label: 'Требуется ли указание даты получения визы',
    computed: ['identifier', function(identifier) {
      return identifier === 'estonia' || identifier === 'finland';
    }]
  },

  isShengen: {
    type: 'Boolean',
    label: 'Входит ли страна в Шенген',
    computed: ['identifier', function(identifier) {
      // TODO
      return identifier === 'italy' || identifier === 'spain';
    }]
  }
};
