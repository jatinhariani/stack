import model from '../../model'
import checkit from 'checkit'
import uuidV4 from 'uuid/v4'
import bcrypt from 'bcrypt'

const User = model.extend({
  tableName: 'users',
  hasTimestamps: ['createdAt', 'updatedAt'],
  initialize: function () {
    this.on('creating', this.hashPassword, this)
    this.on('saving', this.validateSave)
  },
  validateSave: function () {
    console.log('validte save')
    return checkit(this.rules).run(this.attributes)
  },
  hashPassword: (model) => {
    console.log('hash password')
    return new Promise((resolve, reject) => {
      // todo: check password length
      if (typeof model.attributes.password === 'undefined' || model.attributes.password.length === 0) {
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
    givenName: ['string', 'maxLength:100'],
    familyName: ['string', 'maxLength:100'],
    provider: ['string', 'maxLength:100'],
    profileImage: ['url']
  }
})

module.exports = User
