import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row, Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile, } from '../actions/usersActions'
import {myOrdersListAction} from '../actions/oedersActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_UPDATE_PROFILE_RESET } from '../constants/usersConstants'

const ProfileScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const myOrdersList = useSelector(state => state.myOrdersList)
    const {loading:loadingOrders, error:errorOrders, orders} = myOrdersList


    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(myOrdersListAction())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Passwords do not match!!')
        } else {
            dispatch(updateUserProfile({
                id: user._id,
                name,
                password
            }))
        }
    }
    return (
        <Row>
            <Col md={3}>
            <h2>User Profile</h2>
            {loading && <Loader />}
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='name'>
                    <FormLabel>Name</FormLabel>
                    <FormControl type='name' placeholder='Enter Name'
                    value={name} onChange={(e) => setName(e.target.value)}></FormControl>
                </FormGroup>

                <FormGroup controlId='email'>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl type='email' placeholder='Enter Email'
                    value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
                </FormGroup>

                <FormGroup controlId='password'>
                    <FormLabel>Password</FormLabel>
                    <FormControl type='password' placeholder='Enter Password'
                    value={password} onChange={(e) => setPassword(e.target.value)}></FormControl>
                </FormGroup>

                <FormGroup controlId='confirmPassword'>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl type='password' placeholder='Confirm Password'
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></FormControl>
                </FormGroup>

                <Button type='submit' variant='primary'>Update</Button>
            </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERD</th>
                                <th>details</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? 'PAID' : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                                    <td>{order.isDeliverd ? 'DELIVERD' : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light' className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen