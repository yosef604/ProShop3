import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { editProductAction, listProductsDetails } from '../actions/productsActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_EDIT_RESET } from '../constants/productsConstants'

const EditProductScreen = ({match, history}) => {    
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()

    const productsDetails = useSelector(state => state.productsDetails)
    const {loading, error, product} = productsDetails

    const editProduct = useSelector(state => state.editProduct)
    const {loading:editLoading, error:editError, success:editSuccess} = editProduct

    useEffect(() => {
        if(editSuccess) {
            dispatch({type: PRODUCT_EDIT_RESET})
            history.push('/admin/productslist')
            dispatch(listProductsDetails(productId))
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductsDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setDescription(product.description)
                setCountInStock(product.countInStock)
            }
        }
           
    }, [dispatch, productId, product, history, editSuccess])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                'Content-Type': 'multipart/form-data'
            }

            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editProductAction({
            _id: productId, name, price, category, brand, countInStock, image, description
        }))
    }

    return (
        <>
            <Link to='/admin/productslist' className='btn btn-light my-3'>Go Back</Link>

            <FormContainer>
            <h1>Edit Product</h1>
            {editLoading && <Loader />}
            {editError && <Message variant='danger'>{editError}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

                <Form onSubmit={submitHandler}>
                    <FormGroup controlId='name'>
                        <FormLabel>Name</FormLabel>
                        <FormControl type='name' placeholder='Enter Name'
                        value={name} onChange={(e) => setName(e.target.value)}></FormControl>
                    </FormGroup>

                    <FormGroup controlId='price'>
                        <FormLabel>price</FormLabel>
                        <FormControl type='number' placeholder='Enter price'
                        value={price} onChange={(e) => setPrice(e.target.value)}></FormControl>
                    </FormGroup>

                    <FormGroup controlId='image'>
                        <FormLabel>Image</FormLabel>
                        <FormControl type='text' placeholder='Enter Image url'
                        value={image} onChange={(e) => setImage(e.target.value)}></FormControl>
                        <Form.File id='image-file' label='Choose a File' custom onChange={
                            uploadFileHandler}></Form.File>

                        {uploading && <Loader />}
                    </FormGroup>

                    <FormGroup controlId='brand'>
                        <FormLabel>Brand</FormLabel>
                        <FormControl type='text' placeholder='Enter Brand'
                        value={brand} onChange={(e) => setBrand(e.target.value)}></FormControl>
                    </FormGroup>

                    <FormGroup controlId='countInStock'>
                        <FormLabel>Count In Stock</FormLabel>
                        <FormControl type='number' placeholder='Enter count in stock'
                        value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></FormControl>
                    </FormGroup>

                    <FormGroup controlId='category'>
                        <FormLabel>Category</FormLabel>
                        <FormControl type='text' placeholder='Enter category'
                        value={category} onChange={(e) => setCategory(e.target.value)}></FormControl>
                    </FormGroup>

                    <FormGroup controlId='description'>
                        <FormLabel>Description</FormLabel>
                        <FormControl type='text' placeholder='Enter description'
                        value={description} onChange={(e) => setDescription(e.target.value)}></FormControl>
                    </FormGroup>

                    <Button type='submit' variant='primary'>Update</Button>
            </Form>
            )}
        </FormContainer>
        </>
        
    )
}

export default EditProductScreen