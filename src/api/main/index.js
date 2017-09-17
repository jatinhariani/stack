import { Router } from 'express'

import controller from './main.controller'

export default () => {
  let main = Router()
  main.get('/', controller.index)
  return main
}
