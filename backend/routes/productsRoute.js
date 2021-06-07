import express from 'express'
import Product from '../models/ProductsModel.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

//@desc   Fetch all products
//@route   GET /api/products
//@daccess   public
router.get('/', asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

//@desc   Fetch a single product
//@route   GET /api/products/:id
//@daccess   public
router.get('/:id', asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if (product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not Found')
    }
}))

export default router