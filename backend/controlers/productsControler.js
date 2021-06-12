import asyncHandler from 'express-async-handler'
import Product from '../models/ProductsModel.js'


//@desc   Fetch all products
//@route   GET /api/products
//@daccess   Public
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})

    res.json(products)
})


//@desc   Fetch a single product
//@route   GET /api/products/:id
//@daccess   Public
const getProductsById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if (product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not Found')
    }
})


//@desc   Delete a product
//@route   DELETE /api/products/:id
//@daccess   Privet/Admin
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if (product){
        await product.remove()
        res.json({message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not Found')
    }
})

export {getProducts, getProductsById, deleteProduct}