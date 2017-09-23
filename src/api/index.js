import { Router } from 'express'

import main from './main'
import thing from './thing'
import auth from './auth'

export default () => {
  const api = Router()
  api.use('/', main())
  api.use('/auth', auth())
  api.use('/thing', thing())
  return api
}
