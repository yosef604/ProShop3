import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productsDetailsReducer
    , productsListReducer 
} from './reducers/productsReducers'
import { cartReducer } from './reducers/cartReducer'

const reducer = combineReducers({
    productsList: productsListReducer,
    productsDetails: productsDetailsReducer,
    cart: cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart : {cartItems: cartItemsFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store