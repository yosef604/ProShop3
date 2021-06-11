import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { getUserDetails } from '../actions/usersActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const EditUserScreen = ({match, history}) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [password, setPassword] = useState('XXX')
    const [confirmPassword, setConfirmPassword] = useState('XXX')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    useEffect(() => {
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user, dispatch, userId])

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Link to='/admin/userslist' className='btn btn-light my-3'>Go Back</Link>

            <FormContainer>
            <h1>Edit User</h1>

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

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

                    <FormGroup controlId='isadmin'>
                        <Form.Check type='checkbox' label='ia Admin'
                        checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                    </FormGroup>

                    <Button type='submit' variant='primary'>Update</Button>
            </Form>
            )}
        </FormContainer>
        </>
        
    )
}

export default EditUserScreen