var CryptoJS = require('crypto-js');
var base64 = require('base-64');
var KEY = 'alpico';

module.exports = function(value){
    return base64.encode(CryptoJS.AES.encrypt(value,KEY));
};

function decrypt(value){
    return CryptoJS.AES.decrypt(base64.decode(value),KEY).toString(CryptoJS.enc.Utf8);
}

module.exports.decrypt = decrypt;
