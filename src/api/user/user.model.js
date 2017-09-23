import checkit from 'checkit'
import uuidV4 from 'uuid/v4'
import bcrypt from 'bcrypt'

import model from '../../model'
import validationUtils from '../../utils/validation'

const User = model.extend({
  tableName: 'users',
  hasTimestamps: ['createdAt', 'updatedAt'],
  initialize: function () {
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
        model.attributes.password.length === 0) &&
        ['google', 'facebook'].includes(model.attributes.provider)) {
        model.attributes.password = uuidV4()
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
    provider: (val) => {
      return validationUtils.validateAmong(
        val,
        ['google', 'facebook'],
        'Invalid role'
      )
    },
    password: ['required'],
    profileImage: ['url']
  }
})

module.exports = User
