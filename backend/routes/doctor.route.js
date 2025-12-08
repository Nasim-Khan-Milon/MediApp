import express from 'express'
import authDoctor from '../middleware/authDoctor.middleware.js'
import upload from '../middleware/multer.middleware.js'
import { cancelAppointment, completeAppointment, doctorAppointments, doctorDashboard, loginDoctor } from '../controllers/doctor.controller.js'

const doctorRouter = express.Router()

doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, doctorAppointments)
doctorRouter.post('/cancel-appointment', authDoctor, cancelAppointment)
doctorRouter.post('/complete-appointment', authDoctor, completeAppointment)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)

export default doctorRouter