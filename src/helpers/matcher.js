'use strict';

var helper = {};

// Универсальные значения для любого проекта,
//   не зависящие от конкретной бизнес-логики
// Если данные значения не будут соответствовать задачам,
//   то можно использовать альтернативные методы с явными значениями
// от 1 до 50 символов (включительно)
var latinNameRegExp = /^[a-z][a-z\s,.'-]{0,49}$/i;
// от 1 до 150 символов (включительно)
var cyrNameRegExp = /^[а-я][а-я\s,.'-]{0,149}$/i;
var ageMin = 0;
var ageAdultMin = 18;
var ageMax = 120;

/**
 * @returns {Boolean}
 * Если хотя бы одно значение не известно (null) - не достаточно данных для принятия решения (result = null)
 * Если все значения true, то result = true
 * Иначе false
 */
helper.isAnd = function() {
  var arr = Array.prototype.slice.call(arguments);

  var isSomeNull = arr.some(function(item) { return item === null; });

  if (isSomeNull) { return null; }

  return arr.every(function(item) { return item === true; });
};

helper.isTestRegExp = function(str, regExp) {
  if (str === null || regExp === null) { return null; }
  return regExp.test(str);
};

/**
 * @returns {Boolean} Является ли строка именем (фамилией) на латинице
 */
helper.isLatinName = function(str) {
  if (str === null) { return null; }
  return latinNameRegExp.test(str);
};

/**
 * Cyr - упрощённое от cyrillic
 * @returns {Boolean} Является ли строка именем (фио) на кириллице
 */
helper.isCyrName = function(str) {
  if (str === null) { return null; }
  return cyrNameRegExp.test(str);
};

/**
 * @returns {Boolean} Соответствует ли указанный возраст диапазону универсальных значений: от 0 до 120
 */
helper.isAgeValid = function(age) {
  if (age === null) { return null; }
  return ageMin <= age && age <= ageMax;
};

/**
 * @returns {Boolean} Совершеннолетие
 */
helper.isAgeAdult = function(age) {
  if (age === null) { return null; }
  return ageAdultMin <= age && age <= ageMax;
};

/**
 * Если минимальная дата рождения не указана бизнес-требованиями, тогда только технические границы: new Date(-8640000000000000) = 20.04.-271821
 * В данном случае ограничение по ageMax
 * @param {String} initial Дата отсчёта, сегодня
 * @returns {String} Универсальное значение для минимально возможной даты рождения: 120 лет назад
 */
// helper.minBirthday = function(initial) {
//   if (initial === null) { return null; }
//   var isoDuration = 'P-' + ageMax + 'Y';
//   return durationHelper.calculateGostPlusDuration(initial, isoDuration);
// };

// /**
//  * @returns {String} Максимально возможная дата рождения для совершеннолетнего
//  */
// helper.maxAdultBirthday = function(initial) {
//   if (initial === null) { return null; }
//   var isoDuration = 'P-' + ageAdultMin + 'Y';
//   return durationHelper.calculateGostPlusDuration(initial, isoDuration);
// };

helper.isStringBetweenInclusive = function(str, min, max) {
  if (str !== null && min !== null && max !== null) {
    return str.length >= min && str.length <= max;
  }
  return null;
};

helper.isNumberBetweenInclusive = function(num, min, max) {
  if (num !== null && min !== null && max !== null) {
    return num >= min && num <= max;
  }
  return null;
};

helper.lastAvailable = function() {
  var arr = Array.prototype.slice.call(arguments);
  for (var i = arr.length - 1; i >= 0; i -= 1) {
    if (arr[i] !== null) { return arr[i]; }
  }
  return null;
};

var PRIMARY_KEY = 'id'; // Обычно 'id'

/**
 * @returns {Array} Например, ссылки на ещё не выбранные страны
 */
helper.uncoveredList = function(coveredList, originList) {
  // console.log('uncoveredList', coveredList, originList);
  if (originList === null) { return null; }

  var coveredIds = (coveredList || []).map(function(c) {
    return c[PRIMARY_KEY];
  });

  return originList.filter(function(originItem) {
    // TODO: only ids originItem, like Tourist
    return coveredIds.indexOf(originItem[PRIMARY_KEY]) < 0;
  });
};

module.exports = helper;
