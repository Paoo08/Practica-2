import express from 'express'
import HomeworkService from '../services/homework.service'
import { Homework } from '../types/homework.type'
import passport from 'passport'
import type { JwtRequestType } from '../types/user.type'
import { ObjectId } from 'mongoose'

const router = express.Router()
const service = new HomeworkService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: JwtRequestType, res) => {
    const {
      user: { sub }
    } = req
    console.log('sub', sub)
    const homework: Homework = req.body
    const newHomework = await service.create(
      homework,
      sub as unknown as ObjectId
    )

    res.status(201).json(newHomework)
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: JwtRequestType, res, next) => {
    try {
      //console.log('boom error handler', next)

      const { user } = req
      console.log(user)
      const homeworks = await service.findAll()
      res.status(200).json(homeworks)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const homework = await service.findById(req.params.id)
      res.status(200).json(homework)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const homework = await service.findById(req.query.name as string)
      res.status(200).json(homework)
    } catch (error) {
      next(error)
    }
  }
)

export default router
