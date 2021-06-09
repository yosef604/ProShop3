import React, { useEffect} from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/oedersActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    //Calculate prices
    cart.itemsPrice = (cart.cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)).toFixed(2)
    cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 50)
    cart.taxPrice = (0.18 * Number(cart.itemsPrice)).toFixed(2)
    cart.totalPrice = Math.floor(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))

    const ordersCreate = useSelector(state => state.ordersCreate)
    const {order, success, error} = ordersCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city},
                                {cart.shippingAddress.postalCode},
                                {cart.shippingAddress.country},
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col >
                                                    <Link to={`/products/${item.productId}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroupItem>

                            <ListGroupItem>
                                <Button type='submit' className='btn-block'
                                disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                                    Place Order
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            
        </>
    )
}

export default PlaceOrderScreen
