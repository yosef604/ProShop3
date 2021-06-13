import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productsRouter from './routes/productsRoute.js'
import usersRouter from './routes/usersRoutes.js'
import ordersRouter from './routes/ordersRoute.js'
import uploadRouter from './routes/uploadRoutes.js'
import { errorHandler, notFound } from './middleare/errorMiddlewares.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is runnig')
})

const __dirname = path.resolve()
app.use('/upload', express.static(path.join(__dirname, '/upload')))

app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/upload', uploadRouter)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound)

app.use(errorHandler)




const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`.yellow.bold))