import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productsDetailsReducer
    , productsListReducer 
} from './reducers/productsReducers'
import { cartReducer } from './reducers/cartReducer'
import {
     userDetailsReducer, 
     userLoginReducer, 
     userRegisterReducer, 
     userUpdateProfileReducer 
    } from './reducers/usersReducers'
import { ordersCreateReducer } from './reducers/ordersReducers'

const reducer = combineReducers({
    productsList: productsListReducer,
    productsDetails: productsDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    ordersCreate: ordersCreateReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? 
JSON.parse(localStorage.getItem('paymentMethod')) : null

const initialState = {
    cart : {
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage},
    ordersCreate: {paymentMethod: paymentMethodFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store