import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import db from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/user.route.js'

//app config
const app = express()
const port = process.env.PORT || 4000
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user', userRouter)


app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log("Server started", port)
})

