var SHA256 = require("crypto-js/sha256");
var jwt = require('jsonwebtoken');

var message = "prueba de encriptacion";
var msghash = SHA256(message).toString();
let msjObject = {
    nombre : "jhon",
    apellido: "millan"
};

var token = jwt.sign(msjObject,'victoria');
console.log(token);

var decoded = jwt.verify(token, 'victoria');

console.log('decodec',decoded)

// let msgobjecthash = SHA256(JSON.stringify(msjObject)).toString();
// console.log(message);
// console.log(msghash);
// console.log(msgobjecthash);
// console.log(msjObject);