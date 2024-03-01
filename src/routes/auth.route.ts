import express from 'express'
import passport from 'passport'
import UserService from '../services/user.service'

const router = express.Router()
const service = new UserService()

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (_req, res, next) => {
    console.log('login')
    try {
      res.status(200).json({ message: 'Todo bien (Y)' })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

export default router
