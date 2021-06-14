import asyncHandler from 'express-async-handler'
import Product from '../models/ProductsModel.js'


//@desc   Fetch all products
//@route   GET /api/products
//@daccess   Public
const getProducts = asyncHandler(async(req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))

    res.json({products, page, pages: Math.ceil(count / pageSize)})
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


//@desc   Create new review
//@route   POST /api/products/:id/reviews
//@daccess   Privet
const createProductReview = asyncHandler(async(req, res) => {
    const {
        rating, comment
    } = req.body

    const product = await Product.findById(req.params.id)
    
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        } 
        const review = {
            user: req.user._id,
            rating: Number(rating),
            comment,
            name: req.user.name
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, cur) => cur.rating + acc, 0) / product.reviews.length

        product.save()
        res.status(201).json({message: 'review added'})
        

    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

export {
    getProducts, 
    getProductsById, 
    deleteProduct, 
    createProduct, 
    updateProduct,
    createProductReview
}