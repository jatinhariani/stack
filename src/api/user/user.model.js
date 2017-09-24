import checkit from 'checkit'
import uuidV4 from 'uuid/v4'
import bcrypt from 'bcrypt'

import model from '../../model'
import validationUtils from '../../utils/validation'

const User = model.extend({
  tableName: 'users',
  hasTimestamps: ['createdAt', 'updatedAt'],
  initialize: function () {
    // validates twice on creation to detect password.
    this.on('creating', this.hashPassword, this)
    this.on('saving', this.validateSave)
  },
  validateSave: function () {
    return checkit(this.rules).run(this.attributes)
  },
  hashPassword: (model) => {
    return new Promise((resolve, reject) => {
      // todo: check password length
      if ((typeof model.attributes.password === 'undefined' ||
        model.attributes.password.length === 0)) {
        if (['google', 'facebook'].includes(model.attributes.provider)) {
          model.attributes.password = uuidV4()
        } else {
          return resolve('')
        }
      }
      bcrypt.hash(model.attributes.password, 10, (err, hash) => {
        if (err) {
          reject(err)
        }
        model.set('password', hash)
        resolve(hash)
      })
    })
  },
  rules: {
    email: ['email', 'required'],
    givenName: ['string', 'maxLength:100'],
    familyName: ['string', 'maxLength:100'],
    role: (val) => {
      return validationUtils.validateAmong(
        val,
        ['admin', 'editor', 'user'],
        'Invalid role'
      )
    },
    provider: (val) => {
      return validationUtils.validateAmong(
        val,
        ['google', 'facebook', 'email'],
        'Invalid role'
      )
    },
    profileImage: ['url']
  },
  emailRegistrationRules: {
    email: ['required', 'email', function (val) {
      return User.findOne({
        email: val
      }).then(function (user) {
        if (user) {
          throw new Error('The email address is already registered.')
        }
        return true
      })
        .catch(User.NotFoundError, () => {
          console.log('not found')
          return true
        })
    }],
    password: ['required', 'minLength:6', 'maxLength:20']
  }
})

module.exports = User
