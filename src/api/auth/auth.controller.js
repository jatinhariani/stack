import checkit from 'checkit'

import User from '../user/user.model'

exports.email = (req, res) => {
  const emailValidator = checkit(User.prototype.emailRegistrationRules)
  // todo: fix. validator catch. I honestly don't know why this works
  // nested promise thing because catch for custom validator acts weird.
  return emailValidator.run(req.body)
    .then(() => {
      const userData = req.body
      userData.role = 'user'
      userData.provider = 'email'
      return User.create(userData)
        .then((user) => {
          res.json(user)
        })
        .catch(checkit.Error, function (err) {
          res.status(422).json(err)
        })
        .catch((err) => {
          res.status(500).json(err)
        })
    })
    .catch(function (err) {
      res.status(422).json(err)
    })
}

exports.login = (req, res) => {

}
