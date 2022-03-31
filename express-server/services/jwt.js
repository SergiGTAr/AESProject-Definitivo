'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = '"mR[Q"h"%z]wJ650K[bTj}7r=oqtjp^WtW5muYE;-XY2';

exports.createToken = function(user) {
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.encode(payload, secret)
}