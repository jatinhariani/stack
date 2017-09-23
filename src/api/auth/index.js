import { Router } from 'express'

import controller from './auth.controller'

export default () => {
  let auth = Router()
  auth.post('/email', controller.email)
  return auth
}
