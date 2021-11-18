import * as crypto from "crypto";

export class CryptoService {
  constructor() {}

  encrypt(message: string) {
    const algo = process.env.ALGO!;
    const key = process.env.CRYPTO_KEY!;

    // initialization vector
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(algo, key, iv);

    let enc = cipher.update(message, "utf8", "base64");
    enc += cipher.final("base64");

    return {
      enc,
      iv,
      // @ts-ignore
      authTag: cipher.getAuthTag(),
    };
  }

  decrypt(enc: string, iv: Buffer, authTag: Buffer) {
    const algo = process.env.ALGO!;
    const key = process.env.CRYPTO_KEY!;
    const decipher = crypto.createDecipheriv(algo, key, iv);

    // @ts-ignore
    decipher.setAuthTag(authTag);

    let str = decipher.update(enc, "base64", "utf8");
    str += decipher.final("utf8");
    return str;
  }
}

export default new CryptoService();
