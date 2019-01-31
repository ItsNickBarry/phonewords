let assert = require('assert');

let phonewords = require('./index.js');

const MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

describe('numbersToWords', function () {
  describe('by default', function () {
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

    it('throws error for a 21-digit input composed of 3-character digits', function () {
      assert.throws(() => phonewords.numbersToWords('2'.repeat(21)));
    });

    it('throws error for a 16-digit input composed of 4-character digits', function () {
      assert.throws(() => phonewords.numbersToWords('7'.repeat(16)));
    });
  });

  describe('when lazy is true', function () {
    it('returns an array with length close to maximum array length', function () {
      let number = '2'.repeat(20);
      let length = Math.pow(3, 20);
      assert(length <= MAX_ARRAY_LENGTH);
      assert.equal(phonewords.numbersToWords(number, true).length, length);
    });

    it('returns an array with length greater than maximum array length', function () {
      let number = '2'.repeat(21);
      let length = Math.pow(3, 21);
      assert(length > MAX_ARRAY_LENGTH);
      assert.equal(phonewords.numbersToWords(number, true).length, length);
    });

    it('returns an array with safe integer length for a 33-digit input composed of 3-character digits', function () {
      assert(phonewords.numbersToWords('2'.repeat(33), true).length < Number.MAX_SAFE_INTEGER);
    });

    it('returns an array with safe integer length for a 26-digit input composed of 4-character digits', function () {
      assert(phonewords.numbersToWords('7'.repeat(26), true).length < Number.MAX_SAFE_INTEGER);
    });

    it('throws error for a 34-digit input composed of 3-character digits', function () {
      assert.throws(() => phonewords.numbersToWords('2'.repeat(34), true));
    });

    it('throws error for a 27-digit input composed of 4-character digits', function () {
      assert.throws(() => phonewords.numbersToWords('7'.repeat(27), true));
    });

    describe('returns the same result at each index as when lazy is false', function () {
      let inputs = [111, 222, 333, 777, 987, 9228145];

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
