import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { login } from '../actions/usersActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const LoginScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
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
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Custumer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Rgister</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
