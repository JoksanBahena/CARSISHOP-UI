import CryptoJS from "crypto-js";

const key = import.meta.env.VITE_CRYPTOJS_KEY;
const iv = import.meta.env.VITE_CRYPTOJS_IV;

const crypto_key = CryptoJS.enc.Latin1.parse(key);
const crypto_iv = CryptoJS.enc.Latin1.parse(iv);


if (!crypto_key) {
  throw new Error("No se ha proporcionado una clave secreta.");
}

//Encripta valores de texto con AES
export function encryptAES(value) {
  if (typeof value !== "string") {
    throw new Error("El valor a encriptar debe ser una cadena de texto.");
  }

  return CryptoJS.AES.encrypt(value, crypto_key, {
    iv: crypto_iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  }).toString();
}

// Desencripta AES
// Recibe una cadena de texto encriptada con AES
export function decryptValue(encryptedValue) {
  if (typeof encryptedValue !== "string") {
    throw new Error("El valor encriptado debe ser una cadena de texto.");
  }
  return CryptoJS.AES.decrypt(encryptedValue, crypto_key, {
    iv: crypto_iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Latin1);
}

// Encripta valores de texto con SHA256
// Recibe una cadena de texto
export function encryptSHA256(value) {
  if (typeof value !== "string") {
    throw new Error("El valor a encriptar debe ser una cadena de texto.");
  }

  return CryptoJS.SHA256(value).toString();
}

// Encripta valores de texto con SHA256 de manera progresiva generando un solo hash final
// Recibe un array de valores a encriptar
export function progressiveHash(data) {
  const sha256 = CryptoJS.algo.SHA256.create();
  data.forEach((element) => {
    sha256.update(element);
  });
  const hash = sha256.finalize();
  return hash.toString(CryptoJS.enc.Hex);
}
