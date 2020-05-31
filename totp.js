const crypto = require('crypto');
const constants = require('./constants');

function CurrentTime(date) {
    if (!date) { date = new Date(); }
    if (date instanceof Date) { date = date.getTime(); }
    return date;
}

function GetCodeInterval(date) {
    return Math.floor((CurrentTime(date) + constants.ServerTimeDiff) / (constants.Period * 1000));
}

function GetSecretBytes(secret) {
    return Buffer.from(secret, 'base64')
}

function ConvertIntegerToByteArray(integer) {
    var result = Buffer.alloc(8);
    for (var i = 0; i < result.length; i++) {
        result[i] = integer & 255;
        integer = integer >> 8;
    }
    return result.reverse();
}

function GetCode(secret, date) {
    const CodeInterval = GetCodeInterval(date);
    const codeIntervalArray = ConvertIntegerToByteArray(CodeInterval);
    const SecretBytes = GetSecretBytes(secret);

    const mac = crypto.createHmac('sha1', SecretBytes).update(codeIntervalArray).digest();

    const start = mac[19] & 0x0F;
    var bytes = Buffer.alloc(4);
    mac.copy(bytes, 0, start)
    bytes = bytes.reverse();

    let fullCode = bytes.readUInt32LE() & 0x7fffffff;

    const finalResult = [];

    for (var i = 0; i < constants.CodeDigits; i++) {
        const charPosition = fullCode % constants.SteamChars.length;
        const char = constants.SteamChars[charPosition]
        finalResult[i] = char
        fullCode = Math.floor(fullCode / constants.SteamChars.length);
    }

    return finalResult.join('')
}

function NewSecret() {
    return crypto.randomBytes(20).toString('base64');
}

module.exports = { GetCode, NewSecret }