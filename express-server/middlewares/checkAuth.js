'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const secret = '"mR[Q"h"%z]wJ650K[bTj}7r=oqtjp^WtW5muYE;-XY2';

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization){
        return res.status(403).send({message: 'Accés denegat'})
    }

    const token = req.headers.authorization.replace(/['"]+/g,'')
    const payload = jwt.decode(token, secret)

    try {


        if(payload.exp <= moment.unix()){
            return res.status(401).send({
                message: 'El token ha caducat'
            })
        }
    }catch (ex) {
        return res.status(404).send({
            message: 'El token no és vàlid'
        })
    }

    req.user = payload

    next()
}