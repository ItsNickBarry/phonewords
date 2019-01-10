let letterToNumber = {
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

let numberToLetter = {
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
  numberToWords: function (n) {
    let digits = n.toString().replace(/\D/g, '').split('');

    let characters = digits.map(d => numberToLetter[d]);

    return characterPermutations(characters);
  },

  wordsToNumber: function (s) {
    let characters = s.toUpperCase().replace(/\W/g, '').split('');

    return characters.map(c => letterToNumber[c]).join('');
  },
}

module.exports = phonewords;
