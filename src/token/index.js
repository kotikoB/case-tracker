const fs = require('fs');
const jwt = require('jsonwebtoken');

const privKey = fs.readFileSync(__dirname + '/certs/private.pem');
const pubKey = fs.readFileSync(__dirname + '/certs/public.pem');

function createToken(claims) {
    const token = jwt.sign(
        claims,
        { key: privKey.toString(), passphrase: 'authbot' },
        { algorithm: 'RS256', expiresIn: '1d' }
    );
    return token;
}

function verifyToken(token) {
    try {
        const payload = jwt.verify(token, pubKey, { algorithms: ['RS256'] });
        return payload;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    createToken,
    verifyToken
};
