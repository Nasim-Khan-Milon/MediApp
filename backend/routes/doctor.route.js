import express from 'express'
import authDoctor from '../middleware/authDoctor.middleware.js'
import upload from '../middleware/multer.middleware.js'
import { doctorAppointments, loginDoctor } from '../controllers/doctor.controller.js'

const doctorRouter = express.Router()

doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, doctorAppointments)

export default doctorRouter