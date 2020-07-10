const crypto = require("crypto")

// Класс для создания и хранения ключей

let singlton = Symbol();
let singletonEnforcer = Symbol();

class SecretKey {
    constructor(enforce) {
        this.keys = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048
        });
        this.publicKey = this.keys.publicKey.export({
            type: 'spki',
            format: 'pem'
        });
        this.privateKey = this.keys.privateKey.export({
            type: 'pkcs8',
            format: 'pem',
            // cipher: 'aes-256-cbc',
            // passphrase: 'top_secret'
        });
        if (enforce !== singletonEnforcer)
            throw new Error(
                "Instantiation failed"
            );
    }

    static get instance() {
        if (!this[singlton]) {
            this[singlton] = new SecretKey(singletonEnforcer);
        }
        return this[singlton]
    }
}

module.exports = SecretKey.instance
