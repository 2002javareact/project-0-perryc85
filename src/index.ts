import * as express from 'express'
import * as bodyparser from 'body-parser'

const app = express()

app.use('/', bodyparser.json())