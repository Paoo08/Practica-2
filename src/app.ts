import express from 'express'
import mongoose from 'mongoose'
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from './middlewares/error.handler'
import RouterApi from './routes'
import router from './routes/homework.route'
import routerApi from './routes'
import { config } from './config/config'

const { mongoUri, port } = config

const app = express()

const connectDB = () => {
  mongoose.connect(mongoUri)
}

app.use(express.json())
routerApi(app)

app.get('/', (req, res) => {
  res.send('Bye Bye World')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  connectDB()
})

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)
