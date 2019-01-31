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

Convert a string to a number with `phonewords.wordsToNumbers`.

Spaces and special characters are removed from the input.  Numerals are left unchanged.

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

### Numbers to Words

Convert a number to an array of possible character combinations with `phonewords.numbersToWords`.

Because `0` and `1` do no correspond to any characters, they are replaced with underscores.

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

The maximum input length is constrained such that the number of results must not exceed `Math.pow(2, 32) - 1`, the maximum size of an array.  For inputs composed entirely of 3-character digits, this length is `20`.  For inputs composed entirely of 4-character digits, this length is `15`.  Inputs which exceed these constraints will cause the function to throw an error.

```javascript
phonewords.numbersToWords('2'.repeat(21));
// => RangeError: Invalid array length

phonewords.numbersToWords('7'.repeat(16));
// => RangeError: Invalid array length
```

#### Lazy Loading

By default, this function has a quadratic time and memory complexity.

To avoid any issues this may cause, particularly when the output is to be streamed or paginated, set the second argument, `lazy`, to `true`.  This will cause the function to return an array `Proxy` that will only calculate each result when its index is explicitly accessed.  The `length` property is overridden to allow iterations over the object to exceed the normal `Array` length limit of `Math.pow(2, 32) - 1`.  Some `Array` functions will break the functionality of the `Proxy`; therefore, only direct indexing and the use of the `length` property are supported.

```javascript
let result = phonewords.numbersToWords('2'.repeat(20), true);

result;
// => [ <3486784401 empty items> ]

result[0];
// => 'AAAAAAAAAAAAAAAAAAAA'

result;
// => [ 'AAAAAAAAAAAAAAAAAAAA', <3486784400 empty items> ]
```

The maximum input length is constrained such that the number of results must not exceed `Number.MAX_SAFE_INTEGER`.  For inputs composed entirely of 3-character digits, this length is `33`.  For inputs composed entirely of 4-character digits, this length is `26`.  Inputs which exceed these constraints will cause the function to throw an error.

```javascript
phonewords.numbersToWords('2'.repeat(33), true);
// => [ <5559060566555523 empty items> ]

phonewords.numbersToWords('7'.repeat(26), true);
// => [ <4503599627370496 empty items> ]

phonewords.numbersToWords('2'.repeat(34), true);
// => RangeError: Invalid array length

phonewords.numbersToWords('7'.repeat(27), true);
// => RangeError: Invalid array length
```
