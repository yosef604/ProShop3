import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productsDetailsReducer
    , productsListReducer 
} from './reducers/productsReducers'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer, userRegisterReducer } from './reducers/usersReducers'

const reducer = combineReducers({
    productsList: productsListReducer,
    productsDetails: productsDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart : {cartItems: cartItemsFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store