import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { editUserProfile, getUserDetails } from '../actions/usersActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_EDIT_RESET } from '../constants/usersConstants'

const EditUserScreen = ({match, history}) => {    
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [password, setPassword] = useState(123)
    const [confirmPassword, setConfirmPassword] = useState(123)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const editUser = useSelector(state => state.editUser)
    const {loading:editLoading, error:editError, success:editSuccess} = editUser

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            if (editSuccess) {
                dispatch({type: USER_EDIT_RESET})
                history.push('/admin/userslist')
            } else {
                if (!user.name || user._id !== userId) {
                    dispatch(getUserDetails(userId))
                } else {
                    setName(user.name)
                    setEmail(user.email)
                    setIsAdmin(user.isAdmin)
                }
            }
        } else {
            history.push('/')
        }
    }, [user, dispatch, userId, editSuccess, history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editUserProfile({
            _id: userId, name, email, password, isAdmin
        }))
    }

    return (
        <>
            <Link to='/admin/userslist' className='btn btn-light my-3'>Go Back</Link>

            <FormContainer>
            <h1>Edit User</h1>
            {editLoading && <Loader />}
            {editError && <Message variant='danger'>{editError}</Message>}
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