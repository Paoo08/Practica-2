import express from 'express'
import HomeworkRouter from './homework.route'
import UserRouter from './user.route'

const routerApi = (app) => {
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/homeworks', HomeworkRouter)
    router.use('/users', UserRouter)
}

export default routerApi