import jwt from 'jsonwebtoken'
import config from 'config'
import expressJwt from 'express-jwt'
import compose from 'composable-middleware'

import User from '../user/user.model'

var validateJwt = expressJwt({
  secret: process.env.SESSION_SECRET
})

exports.isAuthenticated = (req, res, next) => {
  return compose().use(function (req, res, next) {
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token
    }
    if (req.headers.authorization) {
      validateJwt(req, res, next)
    } else {
      return res.status(401).send('Unauthorized')
    }
  })
    // Attach user to request
    .use(function (req, res, next) {
      if (typeof req.user.id === 'undefined') {
        return res.status(401).send('Unauthorized')
      }
      return new User({
        id: req.user.id
      }).fetch()
        .then(function (user) {
          if (!user) {
            return res.status(401).send('Unauthorized')
          }
          req.user = user
          return next()
        })
        .catch(function (err) {
          return next(err)
        })
    })
}

exports.signToken = (user) => {
  return jwt.sign({ id: user.get('id'), role: user.get('role') }, process.env.SESSION_SECRET, {
    expiresIn: config.get('auth.ttl')
  })
}
