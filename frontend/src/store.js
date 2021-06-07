import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productsDetailsReducer
    , productsListReducer 
} from './reducers/productsReducers'

const reducer = combineReducers({
    productsList: productsListReducer,
    productsDetails: productsDetailsReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store