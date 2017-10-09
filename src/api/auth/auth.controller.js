import checkit from 'checkit'
import bcrypt from 'bcrypt'
import config from 'config'
import uuidV4 from 'uuid/v4'

import User from '../user/user.model'
import AuthService from './auth.service'

exports.email = (req, res) => {
  const emailValidator = checkit(User.prototype.emailRegistrationRules)
  // todo: fix. validator catch. I honestly don't know why this works
  // nested promise thing because catch for custom validator acts weird.
  return emailValidator.run(req.body)
    .then(() => {
      const userData = req.body
      userData.role = 'user'
      userData.provider = 'email'
      userData.verificationCode = uuidV4()
      return User.create(userData)
        .then((user) => {
          res.json(user)
        })
        .catch(checkit.Error, function (err) {
          res.status(422).json(err)
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json(err)
        })
    })
    .catch(function (err) {
      res.status(422).json(err)
    })
}

exports.login = (req, res) => {
  return User.findOne({
    email: req.body.email
  })
    .then((user) => {
      bcrypt.compare(req.body.password, user.get('password')).then((result) => {
        if (!result) {
          res.status(401).send({
            err: 'Invalid email/password combination'
          })
        } else {
          const token = AuthService.signToken(user)
          res.json({
            userId: user.get('id'),
            token: token,
            ttl: config.get('auth.ttl')
          })
        }
      })
    })
    .catch(User.NotFoundError, (err) => {
      res.status(404).json(err)
    })
    .catch(() => {
      // todo: stadardize errors
      res.status(401).send({
        err: 'User not found'
      })
    })
}

exports.verify = (req, res) => {
  return User.findOne({
    verificationCode: req.query.code ? req.query.code : ''
  })
    .then((user) => {
      return user.save({
        verificationCode: null
      })
    })
    .then((user) => {
      return res.json({
        success: true
      })
    })
    .catch(User.NotFoundError, (err) => {
      res.status(404).json(err)
    })
    .catch(function (err) {
      console.log(err)
      res.status(500).json(err)
    })
}
