import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { Card, Col, Image, ListGroup, ListGroupItem, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deliverOrderAction, getOrdersDetails, payOrder } from '../actions/oedersActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDERS_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/ordersConstants'

const OrderScreen = ({match, history}) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const ordersDetails = useSelector(state => state.ordersDetails)
    const {order, loading, error} = ordersDetails

    const ordersPay = useSelector(state => state.ordersPay)
    const {success:successPay, loading:loadingPay} = ordersPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {success:successDeliver, loading:loadingDeliver} = orderDeliver

    useEffect(() => {
        if (!userInfo){
            history.push('/')
        }
        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || successDeliver) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDERS_DELIVER_RESET})
            dispatch(getOrdersDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal){
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, order, successPay, successDeliver, userInfo, history])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrderAction(order))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>
                                {order.user.email}
                            </a></p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {' '}
                                {order.shippingAddress.city}, {' '}
                                {order.shippingAddress.postalCode}, {' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDeliverd ? <Message variant='success'>Deliverd on {order.deliverdAt}</Message> :
                                <Message variant='danger'>Not Deliverd</Message>}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
                                <Message variant='danger'>Not Paid</Message>}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            {!order.isPaid && (
                                <ListGroupItem>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (<Loader />) : (
                                        <PayPalButton amount={order.totalPrice}
                                        onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroupItem>
                            )}

                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDeliverd && (
                                <ListGroupItem>
                                    <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                        Mark As Deliverd
                                    </Button>
                                </ListGroupItem>
                            )}

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen
