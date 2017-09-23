import { Router } from 'express'

import controller from './user.controller'

export default () => {
  let thing = Router()

  thing.get('/', controller.index)
  thing.post('/', controller.create)
  thing.get('/:id', controller.findOne)
  thing.delete('/:id', controller.delete)

  return thing
}
