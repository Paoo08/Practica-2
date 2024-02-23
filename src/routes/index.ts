import express from 'express';
import HomeworkRouter from './homework.route';

const routerApi = (app) => {
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/homeworks', HomeworkRouter)
}

export default routerApi