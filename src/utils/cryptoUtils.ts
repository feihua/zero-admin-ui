// utils/crypto.ts
import CryptoJS from 'crypto-js'
import {JSEncrypt} from 'jsencrypt'

export interface BaseReqVo {
    channelId: string;
    appId: string;
    nonce: string;
    data: string;
    sign: string;
    timestamp: string;
}

const PUBLIC_KEY = "-----BEGIN RSA PUBLIC KEY-----\n" +
    "MIIBCgKCAQEAs7tF5N9X4uzrcKzYue5WYopv9b4otk4ws0FHxe4OXLd3L2lfScx/\n" +
    "iL9cUsbM3OzU7wbHjZXQ28peUwM5CfMfqSpYxhBN8L0N4XylZAvUaZ1U/nm91W4p\n" +
    "vIM46OJgzrIwN1Lk0j7uBqWjyKcukQ71NrEcWxmFb2s7z1R5VZvN93ZFl/QnzI00\n" +
    "Xmm9nSbkwwQSdwcZvMg1beSrprbC3DVdKg+xIg6bz1U9qIKjemb/ShErT+gOlylt\n" +
    "Y2RFsUXFt1bZBKx1ih818jSeuxAWkR8WC+k+z8Lo6r0j8taTMLHg4J2HVQ+VLEV1\n" +
    "O3IRDzNlCF9BLr0WnKr4PuxkGhF9kA4ETQIDAQAB\n" +
    "-----END RSA PUBLIC KEY-----\n";
const PRIVATE_KEY = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIIEowIBAAKCAQEAs7tF5N9X4uzrcKzYue5WYopv9b4otk4ws0FHxe4OXLd3L2lf\n" +
    "Scx/iL9cUsbM3OzU7wbHjZXQ28peUwM5CfMfqSpYxhBN8L0N4XylZAvUaZ1U/nm9\n" +
    "1W4pvIM46OJgzrIwN1Lk0j7uBqWjyKcukQ71NrEcWxmFb2s7z1R5VZvN93ZFl/Qn\n" +
    "zI00Xmm9nSbkwwQSdwcZvMg1beSrprbC3DVdKg+xIg6bz1U9qIKjemb/ShErT+gO\n" +
    "lyltY2RFsUXFt1bZBKx1ih818jSeuxAWkR8WC+k+z8Lo6r0j8taTMLHg4J2HVQ+V\n" +
    "LEV1O3IRDzNlCF9BLr0WnKr4PuxkGhF9kA4ETQIDAQABAoIBACNTTpSCdVKrwEbA\n" +
    "IkTBHId3sDO7sWLLkXTaAtJbTMVaZfmSm2D06agl/G5kloVhoyRrz7L7XDam2s00\n" +
    "F/TlrTZhlVswfzEu51iHWDaGwLQVcUwm/3HAmkFsBTZ4sBBQI3vsNf9A0SXLTpq0\n" +
    "iUmHiBi8zNb2+CwDBplkgAice+oEJ52gLHbDpxesbiXBeEjH7QHtDzLFFDXaS6pw\n" +
    "Yfxe+qbCEl//TigkP0PeoHuQzyb7pNHI1kAapHSdgIQShWI22sF5eiLXWYN1iPxA\n" +
    "lmK43+2t/stovoRaBXP3Ll8Pxx9Ieukp2ttnmKgCi8Kal/qEzDqEEztmOYTobs8V\n" +
    "RdHu/v0CgYEAzmp9OoAQCQgYdWDfiKjiaHIPwy26Q6jdPnHq1MCYuAby+/sNrKJr\n" +
    "C+igfjuptrTU4KXKbaBy7EGSopwjHnWFePm2v+X90rg2681XPmmFUZa0F91HzL62\n" +
    "B0m078EzZX7jbyf/bG4bq7FVOPVdXecP82Ot/T7T4/aOj6PiUtUGJQcCgYEA3ufU\n" +
    "VYU/V+iZ8igN7CVBw+YKYArOSaKOmc8tvh3RkdgxGI/YucO2ZN0e2rFobRiWn7zT\n" +
    "ABU96pRlCqfYofS4kp2/CxL6r3fHbvaD07yIcauvNdMwKnCVS814AVELNS9LRZiC\n" +
    "BKp6jhBRwQELvIAI6hPznjdk8XDFlDzdhoaL6wsCgYA0cBcaKnhoYvcbsp128Th7\n" +
    "QibA9bfxAlAaUgRPQhJKBfHqk6+4oJZDMzi6eNu3f57o5xVS3kTzwgDHcJT3YvGi\n" +
    "dwW3IG1n/8ZsBwFX6KSmwntD6MIZwIUruszNb65n5WFP1sBrwlkjN+yniKXMeiuy\n" +
    "MCt+P1zC99rloMOZOWbTNwKBgQDB50Vsh5cMr8iLQJCr5dUJxqkr1vqQT5pg7jrK\n" +
    "cUIG7tv2k9th7YBSyY+3ijBfBs6wch/SqKfN0fz7gfsPF8UftZ2k0oPD9BxGyKbw\n" +
    "n8bJqyGlXus9X+ZfpINKEegAAf4msn4X9PzbbBLSJEjDV1Vp2qVH8sQay5D0XOYP\n" +
    "yicY9QKBgDL1MXI0XWlTYqhs+TiJhOz+x7p9D9jQaKqDhM+kRdOXLJzmx3cUuJbf\n" +
    "cPVtyOJzPUi1DSWd7y24+eaxwpNSgB1C787c5rXY8+NnIZkEjXmmZvFgPDS509Qb\n" +
    "VBRQMral8C3ghIFhEmG58EnUp0irSPsGMv7+njnDP/+2omE+CVJw\n" +
    "-----END RSA PRIVATE KEY-----";


const encryptor = new JSEncrypt()
encryptor.setPublicKey(PUBLIC_KEY)
encryptor.setPrivateKey(PRIVATE_KEY)


function stringToBase64(str: string): string {
    const bytes = new TextEncoder().encode(str); // 字符串 → UTF-8 字节数组
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary); // 字节数组 → Base64
}

const key = CryptoJS.enc.Base64.parse("MTIzNDU2Nzg5MGFiY2RlZjEyMzQ1Njc4OTBhYmNkZWY=");


/**
 * 使用AES加密数据
 * @param data 要加密的数据
 * @param aesKey AES密钥
 * @returns 包含加密数据和IV的对象
 */
export function encryptWithAes(data: any): { cipherText: string; iv: string } {
    // const iv = CryptoJS.lib.WordArray.random(128 / 8)
    const iv1 = 'abcdef1234567890';   // 16字节
    const iv = CryptoJS.enc.Base64.parse(stringToBase64(iv1));

    const text = CryptoJS.enc.Utf8.parse(JSON.stringify(data));

    const encrypted = CryptoJS.AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return {
        cipherText: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
        iv: stringToBase64(iv1)
    }
}

export function encryptWithAesAndSign(data: any): BaseReqVo {
    // const iv = CryptoJS.lib.WordArray.random(128 / 8)
    const iv1 = 'abcdef1234567890';   // 16字节
    const iv = CryptoJS.enc.Base64.parse(stringToBase64(iv1));

    const text = CryptoJS.enc.Utf8.parse(JSON.stringify(data));

    const encrypted = CryptoJS.AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    const cipherText = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    const sign=encryptor.signSha256(cipherText)

    return {
        channelId: "antd-pro-v5",
        appId: "202609210001",
        nonce: stringToBase64(iv1),
        data: cipherText,
        sign: sign || '',
        timestamp: new Date().getTime().toString(),
    }
}
/**
 * 使用AES解密数据
 * @param cipherText 加密文本
 * @param iv 初始化向量
 * @returns 解密后的原始数据
 */
export function decryptWithAes(cipherText: string, iv: string): string {
    const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
        iv: CryptoJS.enc.Base64.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(decrypted)
}
export function decryptWithAesVerify(cipherText: string, iv: string, sign: string): string {
    const isSignVerified = encryptor.verifySha256(cipherText, sign)
    if (!isSignVerified) {
        throw new Error('Signature verification failed')
    }
    const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
        iv: CryptoJS.enc.Base64.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(decrypted)
}

export function rsaSign(ciphertext: string): string {

    const sign=encryptor.signSha256(ciphertext)

    return sign || ''
}

export function rsaVerify(data: string, sign: string): boolean {
    return encryptor.verifySha256(data, sign)
}
