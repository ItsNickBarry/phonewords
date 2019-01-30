let assert = require('assert');

let phonewords = require('./index.js');

describe('numbersToWords', function () {
  describe('when lazy is false', function () {
    it('parses input number', function () {
      assert.deepStrictEqual(phonewords.numbersToWords(2), ['A', 'B', 'C']);
    });

    it('parses input string', function () {
      assert.deepStrictEqual(phonewords.numbersToWords('2'), ['A', 'B', 'C']);
    });

    it('parses two-digit input number', function () {
      assert.deepStrictEqual(phonewords.numbersToWords(22), ['AA', 'AB', 'AC', 'BA', 'BB', 'BC', 'CA', 'CB', 'CC']);
    });

    it('parses input number with 0s and 1s', function () {
      assert.deepStrictEqual(phonewords.numbersToWords(210), ['A__', 'B__', 'C__']);
    });

    it('parses input string with spaces and special characters', function () {
      assert.deepStrictEqual(phonewords.numbersToWords('+1 (201) ...'), ['_A__', '_B__', '_C__']);
    });
  });

  describe('when lazy is true', function () {
    it('returns an array of appropriate length for large input', function () {
      let number = '2'.repeat(20);
      let length = Math.pow(3, 20);
      assert.equal(phonewords.numbersToWords(number, true).length, length);
    });

    describe('returns the same result at each index as when lazy is false', function () {
      let inputs = [111, 222, 333, 777, 987, 9228145]

      inputs.forEach(function (input) {
        it(`for input ${ input }`, function () {
          let normal = phonewords.numbersToWords(input);
          let lazy = phonewords.numbersToWords(input, true);

          assert.equal(JSON.stringify(normal), JSON.stringify(lazy));
        });
      });
    });
  });
});

describe('wordsToNumbers', function () {
  it('parses test string', function () {
    assert.equal(phonewords.wordsToNumbers('phonewords'), '7466396737');
  });

  it('ignores case', function () {
    assert.equal(phonewords.wordsToNumbers('pHoNewoRDs'), '7466396737');
  });

  it('ignores spaces', function () {
    assert.equal(phonewords.wordsToNumbers('P H O N E W O R D S'), '7466396737');
  });

  it('does not modify numerals', function () {
    assert.equal(phonewords.wordsToNumbers('ph0new0rd5'), '7406390735');
  });

  it('ignores special characters', function () {
    assert.equal(phonewords.wordsToNumbers('!@#$%^&*()'), '');
  });
});
