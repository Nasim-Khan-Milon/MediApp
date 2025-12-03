import express from 'express'
import { registerUser } from '../controllers/user.controller.js'
import authUser from '../middleware/authUser.middleware.js'
import upload from '../middleware/multer.middleware.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)

export default userRouter