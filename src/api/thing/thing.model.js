import model from '../../model'

var Thing = model.extend({
  tableName: 'things',
  hasTimestamps: ['createdAt', 'updatedAt']
})

module.exports = Thing
