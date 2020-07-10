const express = require('express');
const router = express.Router();
// const {privateKey, publicKey} = require("../crypto/keys")
const crypto = require("crypto");
const keys = require("../crypto/createKeys")

/* GET users listing. */
router.post('/', function(req, res, next) {
  const secret = req.body.fclipher;
  const original = req.body.fname;
  const privateKey = req.body.privateKey.replace(/\\n/gm, '\n');
  try {

    const decSecret = crypto.privateDecrypt(
        keys.privateKey,
        Buffer.from(secret, 'base64'))


    res.send(`<h2>Успешно декодировано</h2>` + `<p>Строка отправленная :` + decSecret+`</p>`);
  } catch (e) {
    res.send(`<h1>Ошибка при разборе</h1><p>${e.message}</p><p>Исходная :${original}</p><br><p style="width: 600px; word-wrap: break-word">Закодированная :${secret}</p>`);
  }

});

module.exports = router;
