import express from 'express'
import { createProduct, deleteProduct, getProducts, getProductsById, updateProduct } from '../controlers/productsControler.js'
import { admin, protect } from '../middleare/authMiddleware.js'


const router = express.Router()


router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id').get(getProductsById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)


export default router