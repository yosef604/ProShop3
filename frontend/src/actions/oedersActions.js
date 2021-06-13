import axios from "axios"
import { 
    ORDERS_LIST_FAIL,
    ORDERS_LIST_REQUEST,
    ORDERS_LIST_SUCCESS,
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../constants/ordersConstants"

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post('/api/orders', order, config)
        localStorage.setItem('order', JSON.stringify(data))

        dispatch ({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}


export const getOrdersDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders/${id}`, config)

        dispatch ({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}


export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_PAY_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch ({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}


export const myOrdersListAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_MY_LIST_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders/myorders`, config)

        dispatch ({
            type: ORDER_MY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_MY_LIST_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}


export const adminOrdersListAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDERS_LIST_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders`, config)

        dispatch ({
            type: ORDERS_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDERS_LIST_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }
}