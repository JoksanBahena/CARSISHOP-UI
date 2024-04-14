import CryptoJS from "crypto-js";

const key = import.meta.env.VITE_CRYPTOJS_KEY;
const iv = import.meta.env.VITE_CRYPTOJS_IV;

const crypto_key = CryptoJS.enc.Latin1.parse(key);
const crypto_iv = CryptoJS.enc.Latin1.parse(iv);


if (!crypto_key) {
  throw new Error("No se ha proporcionado una clave secreta.");
}

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
