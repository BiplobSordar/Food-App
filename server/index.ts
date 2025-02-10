import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute'
import restaurantRoute from './routes/restaurantRoute'
import menuRoute from './routes/menuRoute'
import orderRoute from './routes/orderRoute'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { createTables } from './DB/connect'

dotenv.config()

const PORT = process.env.PORT || 3000
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
  credentials: true
}







const app = express()

// default middleware for any mern project
app.use(bodyParser.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))







// API List 

app.use('/api/v1/restaurant', restaurantRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/menu', menuRoute)
app.use('/api/v1/order', orderRoute)





createTables()
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

