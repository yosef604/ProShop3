import React, { useEffect } from 'react'
import {Button, Table, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {LinkContainer} from 'react-router-bootstrap'
import { deleteUser } from '../actions/usersActions'
import { listProducts } from '../actions/productsActions'

const ProductsListScreen = ({history}) => {
    const dispatch = useDispatch()

    const productsList = useSelector(state => state.productsList)
    const {loading, error, products} = productsList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        } else {
            history.push('/')
        }
        
    }, [dispatch, history, userInfo])

    const createProductHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(id))
        }
    }

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create a Product
                    </Button>
                </Col>
            </Row>
            {loading ? <Loader /> : error ? <Message variant='danger'></Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => 
                                        deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ProductsListScreen
