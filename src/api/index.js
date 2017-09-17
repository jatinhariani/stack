import { Router } from 'express'

import main from './main'
import thing from './thing'

export default () => {
  const api = Router()
  api.use('/', main())
  api.use('/thing', thing())
  return api
}
