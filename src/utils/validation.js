import _ from 'lodash'
import moment from 'moment'

module.exports = {
  validateAmong: (val, arr, errorMessage) => {
    if (_.indexOf(arr, val) < 0) {
      throw new Error(errorMessage)
    }
    return true
  },
  validateDateRange: (val, after, before, errorMessage) => {
    if (typeof val !== 'undefined') {
      if (typeof val !== 'string' && typeof val !== 'object') {
        throw new Error('Invalid Date/Time format')
      }
      // todo: fix for type object. please rewrite
      if (typeof val === 'object') {
        var momentObject = moment(val)
        val = momentObject.format()
      }
      if (val.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2}):(\d{2})/) ||
        val.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2}):(\d{2})[+-](\d{2}):(\d{2})/)) {
        if (after.isAfter(val) || before.isBefore(val)) {
          throw new Error(errorMessage)
        }
      } else {
        throw new Error('Invalid Date/Time format')
      }
    }
  }
}
