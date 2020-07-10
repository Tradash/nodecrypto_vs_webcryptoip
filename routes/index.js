const express = require('express');
const router = express.Router();
const crypto = require("crypto")
const testString2 = "Hello from BackEnd!"
const testString = "Hello from FrontEnd!"
const keys = require("../crypto/createKeys")

// const {publicKey, privateKey} = require("../crypto/keys")

/* GET home page. */
router.get('/', function(req, res, next) {
// проверка кодировки/раскодировки локальной
  const secretData = crypto.publicEncrypt(keys.publicKey, Buffer.from(testString2))
  const decriptedData = crypto.privateDecrypt(keys.privateKey, secretData)
  if (testString === decriptedData.toString()) {
    console.log("Ура прошло!!!!")
  }

  res.render('index', { title: 'Express', publicKey: keys.publicKey, privateKey: keys.privateKey, crypto : crypto.getCiphers(), testString, hash:"SHA-1", testString2,testData:secretData.toString("base64") });
});

module.exports = router;
