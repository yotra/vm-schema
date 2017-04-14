'use strict';

var moment = require('moment');
var matcher = require('./helpers/matcher');

var isoFormat = 'YYYY-MM-DD';

var isDateBetweenInclusive = function(date, min, max) {
  if (date === null || min === null || max === null) {
    return null;
  }

  var mdate = moment(date);
  return mdate.isSameOrAfter(moment(min)) &&
    mdate.isSameOrBefore(moment(max));
};

// событие, например тур, путешествие, прокат, полёт и т.п.
module.exports = {
  identifier: { type: 'Integer', label: 'ID' },

  durationMax: {
    type: 'Duration', // P1Y2M3D
    label: 'Максимально возможная продолжительность путешествия'
  },

  startDate: {
    type: 'Date',
    label: 'Отправляюсь'
  },

  endDate: {
    type: 'Date',
    label: 'Возвращаюсь'
  },

  startDateMin: {
    type: 'Date',
    label: 'Минимальная дата отправления'
  },

  startDateMax: {
    type: 'Date',
    label: 'Максимальная дата отправления',
    // либо установленной дате окончания, либо мин + 1 год
    computed: ['startDateMin', 'endDate', 'durationMax', function(startDateMin, endDate, durationMax) {
      if (startDateMin === null || durationMax === null) {
        // endDate can be null
        return null;
      }

      var mmDurationMax = moment.duration(durationMax);

      var mmStartDateLatest = moment(startDateMin).add(mmDurationMax);
      var startDateLatest = mmStartDateLatest.format(isoFormat);
      if (endDate === null) {
        return startDateLatest;
      }

      return moment(endDate).isBefore(mmStartDateLatest) ? endDate : startDateLatest;
    }]
  },

  endDateMin: {
    type: 'Date',
    label: 'Минимальная дата возвращения',
    computed: ['startDateMin', 'startDate', matcher.lastAvailable]
  },

  endDateMax: {
    type: 'Date',
    label: 'Максимальная дата возвращения',
    // start + 1 year || startMin + 1 year
    computed: ['endDateMin', 'durationMax', function(endDateMin, durationMax) {
      if (durationMax === null || endDateMin === null) { return null; }

      var mmDurationMax = moment.duration(durationMax);

      return moment(endDateMin).add(mmDurationMax).format(isoFormat);
    }]
  },

  isFixed: {
    type: 'Boolean',
    label: 'Нужен годовой полис?'
  },

  /** Number of days between start and end dates, including both */
  daysBetween: {
    type: 'Integer',
    label: 'Количество дней между датами',
    computed: ['endDate', 'startDate', function(end, start) {
      if (end === null || start === null) { return null; }

      return moment(end).diff(moment(start), 'days') + 1;
    }]
  },

  isStartDateBetween: {
    type: 'Boolean',
    label: '*некорректная дата',
    computed: ['startDate', 'startDateMin', 'startDateMax', isDateBetweenInclusive]
  },

  isEndDateBetween: {
    type: 'Boolean',
    label: '*некорректная дата',
    computed: ['endDate', 'endDateMin', 'endDateMax', isDateBetweenInclusive]
  }
};
