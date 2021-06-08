import axios from "axios"
import { CARD_ADD_ITEM, CARD_REMOVE_ITEM } from "../constants/cartConstatnts"

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CARD_ADD_ITEM,
        payload: {
            productId: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CARD_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}