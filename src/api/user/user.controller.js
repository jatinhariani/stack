import User from './user.model'

exports.me = (req, res) => {
  User.findById(req.user.get('id'), {
    require: true
  })
    .then((user) => {
      res.json(user)
    })
    .catch(User.NotFoundError, (err) => {
      res.status(404).json(err)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}
