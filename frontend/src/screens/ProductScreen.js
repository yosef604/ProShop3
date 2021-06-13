import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createReviewAction, listProductsDetails } from '../actions/productsActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productsConstants'


const ProductScreen = ({match, history}) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productsDetails = useSelector(state => state.productsDetails)
    const {loading, error, product} = productsDetails

    const createReview = useSelector(state => state.createReview)
    const {error:errorReview, success:successReview} = createReview

    useEffect(() => {
        if(successReview) {
            alert('Review Added')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductsDetails(match.params.id))
    }, [dispatch, match, successReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createReviewAction(match.params.id, {
            rating, comment
        }))
    }

    
    return (
        <>
           <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
           {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
           <>
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

                                {product.countInStock > 0 && 
                                        <ListGroupItem>
                                            <Row>
                                                <Col>QTY</Col>
                                                <Col>
                                                    <Form.Control as='select' vlaue={qty} onChange={(e) => {
                                                        setQty(e.target.value)}}>

                                                        {[...Array(product.countInStock).keys()].map(
                                                            x => (<option key={x + 1} value={x + 1}>{x + 1}</option>)
                                                        )}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    }

                                <ListGroupItem>
                                    <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant='flush'>
                            {product.reviews.map(review => (
                                <ListGroupItem key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroupItem>
                            ))}
                            <ListGroupItem>
                                <h2>Write costumer review</h2>
                                {errorReview && <Message variant='danger'>{errorReview}</Message>}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as='select' vlaue={rating} onChange={(e) => setRating(e.target.value)}>
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control as='textarea' row='3' value={comment}
                                            onChange={(e) => setComment(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Button type='submit' variant='primary'>Submit</Button>
                                    </Form>
                                ) : <Message>Please <Link to='/login'>Sign in </Link>to write a review</Message>}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </>

           }
        </>
    )
}

export default ProductScreen
