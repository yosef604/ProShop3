import { CARD_ADD_ITEM, CARD_REMOVE_ITEM } from "../constants/cartConstatnts";

export const cartReducer = (state = {cartItems: []}, action) => {
    switch(action.type) {
        case CARD_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find(x => x.productId === item.productId)

            if (!existItem) {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                } 
            } else {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.productId === existItem.productId ? item : x)
                }
            }
        case CARD_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.productId !== action.payload)
            }
        default:
            return state
    }
}