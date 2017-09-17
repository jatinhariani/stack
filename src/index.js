import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import api from './api'

const app = express()

// express middleware
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use('/api', api())

app.listen(3000, function () {
  console.log('App listening on port 3000')
})
