import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductsDetails } from '../actions/productsActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'


const ProductScreen = ({match}) => {

    const dispatch = useDispatch()

    const productsDetails = useSelector(state => state.productsDetails)
    
    const {loading, error, product} = productsDetails

    useEffect(() => {
        dispatch(listProductsDetails(match.params.id))
    }, [dispatch, match])

    
    return (
        <>
           <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
           {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
           <Row>
               <Col md={6}>
                   <Image src={product.image} alt={product.name} fluid />
               </Col>
               <Col md={3}>
                   <ListGroup variant='flush'>
                       <ListGroupItem>
                           <h3>{product.name}</h3>
                       </ListGroupItem>
                       <ListGroupItem>
                           <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                       </ListGroupItem>
                       <ListGroupItem>
                           price ${product.price}
                       </ListGroupItem>
                       <ListGroupItem>
                           Description: {product.description}
                       </ListGroupItem>
                   </ListGroup>
               </Col>
               <Col md={3}>
                   <Card>
                       <ListGroup variant='flush'>
                           <ListGroupItem>
                               <Row>
                                   <Col>
                                        Price:
                                   </Col>
                                   <Col>
                                        ${product.price}
                                   </Col>
                               </Row>
                           </ListGroupItem>
                           <ListGroupItem>
                               <Row>
                                   <Col>
                                        Status:
                                   </Col>
                                   <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock' }
                                   </Col>
                               </Row>
                           </ListGroupItem>
                           <ListGroupItem>
                               <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                           </ListGroupItem>
                       </ListGroup>
                   </Card>
               </Col>
           </Row>
           }
        </>
    )
}

export default ProductScreen
