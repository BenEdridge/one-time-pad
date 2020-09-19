const { OneTimePad } = require('../index.js');
const assert = require('assert');

const fs = require('fs');

const otp = OneTimePad.init();

(function run() {
  generatedTestsSmallSize();
  randomTests1();
  edgeCases();
  test2();
  test3();
  text_test();
  textFileEncryption();
  pngFileEncryption();
}());

function generatedTestsSmallSize() {
  for (let i = 0; i <= 2000; i++) {
    // Randomly sized message and pad
    const size = Math.floor(Math.random() * 2000);
    let plainTextBuffer = new Uint8Array(size);

    // Populate message buffer with random bytes
    for (let j = 0; j < size; j++) {
      let randomByte = Math.floor(1 + Math.random() * 255);
      assert.ok(randomByte <= 255 && randomByte > 0, `FAILED: \nRandom Byte was: ${randomByte}`);
      plainTextBuffer[j] = randomByte;
    }

    const pad = otp.generatePad(plainTextBuffer);
    const encryptedData = otp.encrypt(pad, plainTextBuffer);
    const decryptedData = otp.decrypt(pad, encryptedData);

    assert.deepStrictEqual(
      plainTextBuffer, decryptedData,
      `Plain Text Buffer: ${Buffer.from(plainTextBuffer).toString('hex')} does not match Decrypted Data: ${Buffer.from(decryptedData).toString('hex')}`
    );
    console.log(`Test ${i} passed with pad of length: ${size} encrypted length: ${encryptedData.length} and decryptedData length: ${decryptedData.length}`);
  }
}

function randomTests1() {
  for (let i = 0; i <= 10; i++) {
    // Randomly sized message and pad
    const size = Math.floor(Math.random() * 100000);
    let plainTextBuffer = new Uint8Array(size);

    // Populate message buffer with random bytes
    for (let j = 0; j < size; j++) {
      let randomByte = Math.floor(1 + Math.random() * 255);
      assert.ok(randomByte <= 255 && randomByte > 0, `FAILED: \nRandom Byte was: ${randomByte}`);
      plainTextBuffer[j] = randomByte;
    }

    const pad = otp.generatePad(plainTextBuffer);
    const encryptedData = otp.encrypt(pad, plainTextBuffer);
    const decryptedData = otp.decrypt(pad, encryptedData);

    assert.deepStrictEqual(
      plainTextBuffer, decryptedData,
      `Plain Text Buffer: ${Buffer.from(plainTextBuffer).toString('hex')} does not match Decrypted Data: ${Buffer.from(decryptedData).toString('hex')}`
    );
    console.log(`Test ${i} passed with pad of length: ${size} encrypted length: ${encryptedData.length} and decryptedData length: ${decryptedData.length}`);
  }
}

function edgeCases() {
  let plainTextBuffer = Uint8Array.from([0, 255, 0, 255, 1, 0, 0, 255, 255, 1, 1, 1, 255, 255, 255]);

  const pad = otp.generatePad(plainTextBuffer);
  const encryptedData = otp.encrypt(pad, plainTextBuffer);
  const decryptedData = otp.decrypt(pad, encryptedData);

  assert.deepStrictEqual(
    plainTextBuffer, decryptedData,
    `Plain Text Buffer: ${Buffer.from(plainTextBuffer).toString('hex')} does not match Decrypted Data: ${Buffer.from(decryptedData).toString('hex')}`
  );
}

function test2() {
  let plainTextBuffer = Uint8Array.from([0]);

  const pad = otp.generatePad(plainTextBuffer);
  const encryptedData = otp.encrypt(pad, plainTextBuffer);
  const decryptedData = otp.decrypt(pad, encryptedData);

  assert.deepStrictEqual(
    plainTextBuffer, decryptedData,
    `Plain Text Buffer: ${Buffer.from(plainTextBuffer).toString('hex')} does not match Decrypted Data: ${Buffer.from(decryptedData).toString('hex')}`
  );
}

function test3() {
  let plainTextBuffer = Uint8Array.from([255]);

  const pad = otp.generatePad(plainTextBuffer);
  const encryptedData = otp.encrypt(pad, plainTextBuffer);
  const decryptedData = otp.decrypt(pad, encryptedData);

  assert.deepStrictEqual(
    plainTextBuffer, decryptedData,
    `Plain Text Buffer: ${Buffer.from(plainTextBuffer).toString('hex')} does not match Decrypted Data: ${Buffer.from(decryptedData).toString('hex')}`
  );
}

function text_test() {
  const plainText = 'Hello World!';
  const pad = otp.generatePad(Buffer.from(plainText, 'utf8'));

  const encryptedData = otp.encrypt(pad, Buffer.from(plainText, 'utf8'));
  const decryptedData = otp.decrypt(pad, encryptedData)

  assert.deepStrictEqual(
    Uint8Array.from(Buffer.from(plainText, 'utf8')), decryptedData,
    `Plain Text Buffer: ${Buffer.from(plainText).toString('hex')} does not match Decrypted Data: ${Buffer.from(decryptedData).toString('hex')}`
  );
}

function textFileEncryption() {
  const plainTextBuffer = new Uint8Array(fs.readFileSync('./tests/file.txt'));
  const pad = otp.generatePad(plainTextBuffer);

  const encryptedData = otp.encrypt(pad, plainTextBuffer);
  const decryptedData = otp.decrypt(pad, encryptedData)

  assert.ok(plainTextBuffer.length > 0, 'Test file should have loaded!')

  assert.deepStrictEqual(
    plainTextBuffer, decryptedData,
    `Plain Text Buffer: ${Buffer.from(plainTextBuffer).toString('hex')} does not match Decrypted Data: ${Buffer.from(decryptedData).toString('hex')}`
  );
}

function pngFileEncryption() {
  const pngBuffer = new Uint8Array(fs.readFileSync('./tests/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png'));
  const pad = otp.generatePad(pngBuffer);

  fs.writeFileSync('./tests/scratch/encrypted.png', otp.encrypt(pad, pngBuffer));

  const encryptedPng = new Uint8Array(fs.readFileSync('./tests/scratch/encrypted.png'));
  const decryptedData = otp.decrypt(pad, encryptedPng);

  fs.unlinkSync('./tests/scratch/encrypted.png');

  assert.deepStrictEqual(
    pngBuffer, decryptedData,
    `Plain Text Buffer: ${Buffer.from(pngBuffer).toString('hex')} does not match Decrypted Data: ${Buffer.from(decryptedData).toString('hex')}`
  );
}