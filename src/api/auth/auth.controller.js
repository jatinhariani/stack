import checkit from 'checkit'

import User from '../user/user.model'

exports.email = (req, res) => {
  console.log(req.body)
  return User.create(req.body)
    .then((user) => {
      res.json(user)
    })
    .catch(checkit.Error, (err) => {
      res.status(422).json(err)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}
