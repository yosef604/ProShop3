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


//@desc   Create a product
//@route   POST /api/products
//@daccess   Privet/Admin
const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


//@desc   Update a product
//@route   POST /api/products/:id
//@daccess   Privet/Admin
const updateProduct = asyncHandler(async(req, res) => {
    const {
        name, price, description, brand, category, countInStock, image
    } = req.body

    const product = await Product.findById(req.params.id)
    
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.image = image

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

export {getProducts, getProductsById, deleteProduct, createProduct, updateProduct}