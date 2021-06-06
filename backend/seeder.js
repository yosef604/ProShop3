import mongoose from 'mongoose'
import connectDB from "./config/db.js"
import Order from "./models/OrdersModel.js"
import Product from "./models/ProductsModel.js"
import User from "./models/UsersModel.js"
import dotenv from 'dotenv'
import users from "./data/users.js"
import products from "./data/products.js"
import colors from 'colors'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(p => {
            return {...p, user: adminUser}
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        console.log('Data Distroyed'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d'){
    destroyData()
} else {
    importData()
}