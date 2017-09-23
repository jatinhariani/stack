import model from '../../model'
import checkit from 'checkit'

const Thing = model.extend({
  tableName: 'things',
  hasTimestamps: ['createdAt', 'updatedAt'],
  initialize: function () {
    this.on('saving', this.validateSave)
  },
  validateSave: function () {
    return checkit(this.rules).run(this.attributes)
  },
  rules: {
    name: ['required', 'string', 'maxLength:100']
  }
})

module.exports = Thing
