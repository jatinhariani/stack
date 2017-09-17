import { Router } from 'express'

import controller from './thing.controller'

export default () => {
  let thing = Router()
  thing.get('/', controller.index)
  return thing
}
