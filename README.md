# One-Time Pad

A simple and more complete One-Time Pad implementation in NodeJS

- No limitations on length of data or type of data encrypted
- Supports Strings, Buffers, Files

```
npm install @bpe/one-time-pad
```

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