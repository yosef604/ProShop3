import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productsRouter from './routes/productsRoute.js'
import usersRouter from './routes/usersRoutes.js'
import { errorHandler, notFound } from './middleare/errorMiddlewares.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is runnig')
})

app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)

app.use(notFound)

app.use(errorHandler)




const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`.yellow.bold))