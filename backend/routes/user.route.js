import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, loginUser, registerUser, userAppointments } from '../controllers/user.controller.js'
import authUser from '../middleware/authUser.middleware.js'
import upload from '../middleware/multer.middleware.js'
import { getDoctorData } from '../controllers/doctor.controller.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/doctor-data', getDoctorData)
userRouter.get('/my-appointments', authUser, userAppointments)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
userRouter.get('/my-profile', authUser, getProfile)

export default userRouter