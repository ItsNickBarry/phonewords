let isArrayIndex = require('is-array-index');

const MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

let lettertoNumbers = {
  0: '0',

  1: '1',

  2: '2',
  A: '2',
  B: '2',
  C: '2',

  3: '3',
  D: '3',
  E: '3',
  F: '3',

  4: '4',
  G: '4',
  H: '4',
  I: '4',

  5: '5',
  J: '5',
  K: '5',
  L: '5',

  6: '6',
  M: '6',
  N: '6',
  O: '6',

  7: '7',
  P: '7',
  Q: '7',
  R: '7',
  S: '7',

  8: '8',
  T: '8',
  U: '8',
  V: '8',

  9: '9',
  W: '9',
  X: '9',
  Y: '9',
  Z: '9',
};

let numbersToLetter = {
  0: ['_'],
  1: ['_'],
  2: ['A', 'B', 'C'],
  3: ['D', 'E', 'F'],
  4: ['G', 'H', 'I'],
  5: ['J', 'K', 'L'],
  6: ['M', 'N', 'O'],
  7: ['P', 'Q', 'R', 'S'],
  8: ['T', 'U', 'V'],
  9: ['W', 'X', 'Y', 'Z'],
};

let characterPermutations = function (arrays, index) {
  index = index || 0;

  if (index === arrays.length) {
    return [[]];
  }

  let trailingPermutations = characterPermutations(arrays, index + 1);
  let results = [];

  for (let character of arrays[index]) {
    for (let string of trailingPermutations) {
      results.push(character + string);
    }
  }

  return results;
};

let phonewords = {
  numbersToWords: function (n, lazy) {
    let digits = n.toString().replace(/\D/g, '').split('');

    let characters = digits.map(d => numbersToLetter[d]);

    let length = characters.reduce((acc, el) => acc * el.length, 1);

    if (length > (lazy ? Number.MAX_SAFE_INTEGER : MAX_ARRAY_LENGTH)) {
      // throw standard Array error: 'RangeError: Invalid array length'
      Array(length);
    }

    if (lazy) {
      let target = [];

      let handler = {
        get: function (target, property) {
          if (!(property in target) && isArrayIndex(property, true) && property < length) {
            let result = '';

            let index = property;
            let lastBase = 10;

            for (var i = characters.length - 1; i >= 0; i--) {
              let charOptions = characters[i];

              if (charOptions.length === 1) {
                result = charOptions[0] + result;
              } else {
                let currentBase = charOptions.length;

                if (currentBase !== lastBase) {
                  index = parseInt(index, lastBase).toString(currentBase);
                  lastBase = currentBase;
                }

                result = charOptions[index.slice(-1)] + result;
                index = index.slice(0, -1) || '0';
              }
            }

            target[property] = result;
          } else if (property === 'length') {
            return length;
          }

          return target[property];
        },
      };

      return new Proxy(target, handler);
    } else {
      return characterPermutations(characters);
    }
  },

  wordsToNumbers: function (s) {
    let characters = s.toUpperCase().replace(/\W/g, '').split('');

    return characters.map(c => lettertoNumbers[c]).join('');
  },
};

module.exports = phonewords;
