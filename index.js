const crypto = require('crypto');

module.exports = {
  OneTimePad: {
    init(type = 'buffer') {
      return Object.create(this.config[type]);
    },
    config: {
      buffer: {
        generatePad(uint8Array) {
          let randomBytes = crypto.randomBytes(uint8Array.length);
          randomBytes.forEach((value, index) => {
            if (value === 0) {
              randomBytes[index] += 1;
            }
          });
          return Uint8Array.from(randomBytes);
        },
        encrypt(padBuffer, plainTextBuffer) {
          let resultBuffer = new Uint8Array(plainTextBuffer.length);
          if (plainTextBuffer.length != padBuffer.length) {
            throw new Error(`Pad of length:${padBuffer.length} must match plainText of length: ${plainTextBuffer.length}`);
          };
          plainTextBuffer.forEach((value, index) => {
            resultBuffer[index] = (value + padBuffer[index]) % 256;
          });
          return resultBuffer;
        },
        decrypt(padBuffer, encryptedBuffer) {
          let resultBuffer = new Uint8Array(encryptedBuffer.length);
          if (encryptedBuffer.length != padBuffer.length) {
            throw new Error(`Pad of length:${padBuffer.length} must match encryptedBuffer of length: ${encryptedBuffer.length}`);
          };
          /*
            byteToEncrypt = 34
            padValue = 227

            Encryption:
            (34 + 227) % 256 = 5

            Decryption:
            5 - 227 = -222
            -222 = 1111 1111 0010 0010 in 2's complement

            ResultBuffer is a unsigned integer array therefore
            the upper 2 bytes are truncated resulting in: 0010 0010 = 34
          */
          encryptedBuffer.forEach((value, index) => {
            // This also works
            // const temp = value - padBuffer[index];
            // resultBuffer[index] = temp - 256 * Math.floor(temp / 256);;

            resultBuffer[index] = value - padBuffer[index];
          });
          return resultBuffer;
        }
      }
    }
  }
}