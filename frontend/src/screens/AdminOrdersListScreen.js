import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Table} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { adminOrdersListAction } from '../actions/oedersActions'

const AdminOrdersListScreen = ({history}) => {
    const dispatch = useDispatch()

    const adminOrdersList = useSelector(state => state.adminOrdersList)
    const {loading, error, orders} = adminOrdersList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin){
            dispatch(adminOrdersListAction())
            history.push('/admin/orderslist')
        } else {
            history.push('/')
        }
    }, [dispatch, userInfo, history])
    return (

        <>
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'></Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>TOTAL</th>
                            <th>DATE</th>
                            <th>IS PAID</th>
                            <th>IS DELIVERD</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.isPaid ? 'PAID' : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                                <td>{order.isDeliverd ? 'DELIVERD' : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                                <td>
                                    <a href={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default AdminOrdersListScreen
