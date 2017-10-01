import { Router } from 'express'

import controller from './thing.controller'
import AuthService from '../auth/auth.service'

export default () => {
  let thing = Router()

  thing.get('/', AuthService.isAuthenticated(), controller.index)
  thing.post('/', AuthService.isAuthenticated(), controller.create)
  thing.get('/:id', AuthService.isAuthenticated(), controller.findOne)
  thing.delete('/:id', AuthService.isAuthenticated(), controller.delete)

  return thing
}
