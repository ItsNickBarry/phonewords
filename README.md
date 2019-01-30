# Phonewords

Two-way number-letter conversion as found on most phone dialers, according to [ITU-T E.161](https://en.wikipedia.org/wiki/E.161).

## Usage

Install the library:

```
npm install --save phonewords
```

Require the module and call one of its functions, depending on the desired direction of conversion:

```javascript
let phonewords = require('phonewords');
```

### Words to Numbers

Convert a string to a number:

```javascript
phonewords.wordsToNumbers('phonewords');
// => '7466396737'

phonewords.wordsToNumbers('pHoNewoRDs');
// => '7466396737'

phonewords.wordsToNumbers('P H O N E W O R D S');
// => '7466396737'

phonewords.wordsToNumbers('ph0new0rd5');
// => '7406390735'

phonewords.wordsToNumbers('!@#$%^&*()');
// => ''
```

Spaces and special characters are removed.  Numerals are left unchanged.

### Numbers to Words

Convert a number to an array of possible character combinations:

```javascript
phonewords.numbersToWords(2);
// => [ 'A', 'B', 'C' ]

phonewords.numbersToWords('2');
// => [ 'A', 'B', 'C' ]

phonewords.numbersToWords(22);
// => [ 'AA', 'AB', 'AC', 'BA', 'BB', 'BC', 'CA', 'CB', 'CC' ]

phonewords.numbersToWords(210);
// => [ 'A__', 'B__', 'C__' ]

phonewords.numbersToWords('+1 (201) ...');
// => [ '_A__', '_B__', '_C__' ]
```

Because `0` and `1` do no correspond to any characters, they are replaced with underscores.

By default, this function has a quadratic time complexity with respect to the number of input digits, and may run out of memory when passed especially long numbers.  To avoid these issues, particularly when the output is streamed or paginated, set the second argument, `lazy`, to `true`.  This will cause the function to return an array `Proxy` that will only calculate each result when its index is explicitly accessed.  Some `Array` functions will break the functionality of the `Proxy`; therefore, only direct indexing and the use of the `length` property are supported.  The maximum input length is constrained such that the number of results must not exceed the maximum length of an array, `Math.pow(2, 32) - 1`.

```javascript

let result = phonewords.numbersToWords('2'.repeat(20), true);

result;
// => [ <3486784401 empty items> ]

result[0];
// => 'AAAAAAAAAAAAAAAAAAAA'

result;
// => [ 'AAAAAAAAAAAAAAAAAAAA', <3486784400 empty items> ]

phonewords.numbersToWords('2'.repeat(21), true);
// => RangeError: Invalid array length
```
