import express from 'express'
import authDoctor from '../middleware/authDoctor.middleware.js'
import upload from '../middleware/multer.middleware.js'
import { loginDoctor } from '../controllers/doctor.controller.js'

const doctorRouter = express.Router()

doctorRouter.post('/login', loginDoctor)

export default doctorRouter