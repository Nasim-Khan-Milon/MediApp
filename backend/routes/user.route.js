import express from 'express'
import { bookAppointment, loginUser, registerUser } from '../controllers/user.controller.js'
import authUser from '../middleware/authUser.middleware.js'
import upload from '../middleware/multer.middleware.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/book-appointment', authUser, bookAppointment)

export default userRouter