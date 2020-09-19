# One-Time Pad

A simple and more complete One-Time Pad implementation in NodeJS

![npm (scoped)](https://img.shields.io/npm/v/@bpe/one-time-pad)
![GitHub issues](https://img.shields.io/github/issues/BenEdridge/one-time-pad)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@bpe/one-time-pad)
![npm bundle size](https://img.shields.io/bundlephobia/min/@bpe/one-time-pad)
![NPM](https://img.shields.io/npm/l/@bpe/one-time-pad)


- No limitations on length of data or type of data encrypted
- Supports Strings, Buffers, Files

## Installation

```
npm install @bpe/one-time-pad
```

## Usage

```javascript
const { OneTimePad } = require('one-time-pad');

const otp = OneTimePad.init(); // default 'buffer' based implementation

const plainText = 'Hello World!';
const plainTextBuffer = Buffer.from(plainText, 'utf8')

// Generates a Secure Pad matching the length of plainText (required for decryption and must keep secure!)
const pad = otp.generatePad(plainTextBuffer);

console.log(`Encrypting: ${plainText} with One Time Pad: ${Buffer.from(pad).toString('base64')}`);
const encryptedData = otp.encrypt(pad, plainTextBuffer);
console.log(`${Buffer.from(encryptedData).toString('base64')}`);

console.log(`Decrypting: ${Buffer.from(encryptedData).toString('base64')} with One Time Pad: ${Buffer.from(pad).toString('base64')}`);
const decryptedData = otp.decrypt(pad, encryptedData);
console.log(`Decrypted Data: ${Buffer.from(decryptedData).toString('utf8')}`);
```

See: `example/example.js`

Test png file:
https://en.wikipedia.org/wiki/JPEG#/media/File:Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png

## License

ISC

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