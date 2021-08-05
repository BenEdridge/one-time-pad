# One-Time Pad

A simple and more complete One-Time Pad implementation in NodeJS

![npm (scoped)](https://img.shields.io/npm/v/@bpe/one-time-pad)
![GitHub issues](https://img.shields.io/github/issues/BenEdridge/one-time-pad)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@bpe/one-time-pad)
![npm bundle size](https://img.shields.io/bundlephobia/min/@bpe/one-time-pad)
![NPM](https://img.shields.io/npm/l/@bpe/one-time-pad)


- No limitations on length of data or type of data encrypted
- Supports any data type as long as you convert it to a Buffer
- No dependencies required

## Installation

```
npm install @bpe/one-time-pad
```

## Usage

### Strings
```javascript
const { OneTimePad } = require('one-time-pad');

const plainText = 'Hello World!';
const plainTextBuffer = Buffer.from(plainText, 'utf8')

// Secure Pad the length of plainText (Keep Secure!)
const pad = OneTimePad.generatePad(plainTextBuffer);

const encryptedData = OneTimePad.encrypt(pad, plainTextBuffer);
console.log(`${Buffer.from(encryptedData).toString('base64')}`);

const decryptedData = OneTimePad.decrypt(pad, encryptedData);
console.log(`Decrypted Data: ${Buffer.from(decryptedData).toString('utf8')}`);
```
### Binary Data

```javascript
const { OneTimePad } = require('one-time-pad');
const fs = require('fs');

const pngBuffer = new Uint8Array(fs.readFileSync('./tests/test_image.png'));
const pad = OneTimePad.generatePad(pngBuffer);

fs.writeFileSync('./tests/scratch/encrypted.png', OneTimePad.encrypt(pad, pngBuffer));

const encryptedPng = new Uint8Array(fs.readFileSync('./tests/scratch/encrypted.png'));
const decryptedData = OneTimePad.decrypt(pad, encryptedPng);
```

```javascript
const { OneTimePad } = require('one-time-pad');
const fs = require('fs');

const plainTextBuffer = new Uint8Array(fs.readFileSync('./tests/file.txt'));
const pad = OneTimePad.generatePad(plainTextBuffer);

const encryptedData = OneTimePad.encrypt(pad, plainTextBuffer);
const decryptedData = OneTimePad.decrypt(pad, encryptedData);
```

See more examples in [tests](https://github.com/BenEdridge/one-time-pad/blob/master/tests/test.js)


## License

ISC

## Acknowledgements

`test_image.png` file retrieved from: [en.wikipedia.org](https://en.wikipedia.org/wiki/JPEG#/media/File:Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png).

[npm-image]: https://img.shields.io/npm/v/path-to-regexp.svg?style=flat
[npm-url]: https://npmjs.org/package/path-to-regexp
[travis-image]: https://img.shields.io/travis/pillarjs/path-to-regexp.svg?style=flat
[travis-url]: https://travis-ci.org/pillarjs/path-to-regexp
[coveralls-image]: https://img.shields.io/coveralls/pillarjs/path-to-regexp.svg?style=flat
[coveralls-url]: https://coveralls.io/r/pillarjs/path-to-regexp?branch=master
[david-image]: http://img.shields.io/david/pillarjs/path-to-regexp.svg?style=flat
[david-url]: https://david-dm.org/pillarjs/path-to-regexp
[license-image]: http://img.shields.io/npm/l/path-to-regexp.svg?style=flat
[license-url]: LICENSE.md
[downloads-image]: http://img.shields.io/npm/dm/path-to-regexp.svg?style=flat
[downloads-url]: https://npmjs.org/package/path-to-regexp