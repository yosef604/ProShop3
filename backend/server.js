import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import router from './routes/productsRoute.js'
import { errorHandler, notFound } from './middleare/errorMiddlewares.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is runnig')
})

app.use('/api/products', router)

app.use(notFound)

app.use(errorHandler)




const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`.yellow.bold))