var expect = require('chai').expect;
var matcher = require('./matcher');

describe('matcher', function() {
  it('isAnd', function() {
    expect(matcher.isAnd(false, true)).to.false;
    expect(matcher.isAnd(true, true)).to.true;
    expect(matcher.isAnd(false, null)).to.null;
  });

  it('isNumberBetweenInclusive', function() {
    expect(matcher.isNumberBetweenInclusive(1, 2, 3)).to.false;
    expect(matcher.isNumberBetweenInclusive(2, 2, 3)).to.true;
    expect(matcher.isNumberBetweenInclusive(3, 2, 3)).to.true;
    expect(matcher.isNumberBetweenInclusive(3, 2, null)).to.null;
  });

  it('isAgeAdult', function() {
    expect(matcher.isAgeAdult(17)).to.false;
    expect(matcher.isAgeAdult(null)).to.null;
    expect(matcher.isAgeAdult(18)).to.true;
  });

  it('minBirthday', function() {
    var today = '01.01.2017';
    expect(matcher.minBirthday(today)).to.equal('01.01.1897');
  });

  it('maxAdultBirthday', function() {
    var today = '01.01.2017';
    expect(matcher.maxAdultBirthday(today)).to.equal('01.01.1999');
  });

  it('isTestRegexp', function() {
    var re = /^[a-z]{2,20}$/;
    var f = matcher.isTestRegExp;
    expect(f('asdf', re)).to.true;
    expect(f('asdf', null)).to.null;
    expect(f('123s', re)).to.false;
  });

  it('isTestRegexp name', function() {
    var re = /^[a-z][a-z ,.'-]{1,49}$/i;
    var f = matcher.isTestRegExp;
    expect(f('Aurelia', re)).to.true;
    expect(f('-Aurelia', re)).to.false;
    expect(f('Hector Sausage-Hausen', re)).to.true;
    expect(f('Martin Luther King, Jr.', re)).to.true;
    expect(f('Mathias d\'Arras', re)).to.true;
  });

  it('isLatinName', function() {
    var f = matcher.isLatinName;
    expect(f('Aurelia')).to.true;
    expect(f('Hector Sausage-Hausen')).to.true;
    expect(f('Martin Luther King, Jr.')).to.true;
    expect(f('Mathias d\'Arras')).to.true;

    expect(f('-Aurelia')).to.false;
    expect(f('Aurelia2')).to.false;
    expect(f('abcdefghijklmnopqrstuvwzyzabcdefghijklmnopqrstuvwzyz')).to.false;
  });

  it('isCyrName', function() {
    var f = matcher.isCyrName;
    expect(f('Елена')).to.true;
    expect(f('Мария-Софья')).to.true;
    expect(f('Пантелеймон')).to.true;
    expect(f('Де Бальзак')).to.true;
    expect(f('А')).to.true;

    expect(f('asdf')).to.false;
    expect(f('фыва1234')).to.false;
    expect(f('ячсм0ыва')).to.false;
  });

  it('isStringBetweenInclusive', function() {
    expect(matcher.isStringBetweenInclusive('asdf', 1, 4)).to.true;
    expect(matcher.isStringBetweenInclusive('asdf', null, 3)).to.null;
  });
});
