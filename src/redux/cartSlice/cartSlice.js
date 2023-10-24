import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalPrice: 0,
    favorites: []
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, {payload}) => {
            const item = state.cart.filter(item => item.id === payload.id)

            if (item.length !== 0) {
                const cartItem = {...item[0], quantity: item[0].quantity += 1} 
                state.cart = state.cart.filter(item => item.id !== payload.id)
                state.totalPrice += cartItem.price
                state.cart.push(cartItem)
            } else {
                state.cart.push(payload)
                state.totalPrice += payload.price
            }
        },
        addItemsFromLocalStorage: (state, {payload}) => {
            state.cart = JSON.parse(payload.cart)
            state.favorites = JSON.parse(payload.favorites)
            state.totalPrice = +payload.totalPrice
        },
        removeItemFromCart: (state, {payload}) => {
            state.cart = state.cart.filter(item => item.id !== payload.id)
            state.totalPrice -= payload.quantity ? payload.quantity*payload.price : payload.price
        },
        addQuantityToCart: (state, {payload}) => {
            state.cart.map(item => {
                if(item.id === payload.id) {
                    return {...item, quantity: item.quantity += 1}
                } else {
                    return item
                }
            })
            state.totalPrice += payload.price
        },
        removeQuantityFromCart: (state, {payload}) => {
            state.cart.map(item => {
                if(item.id === payload.id && item.quantity > 1) {
                    return {...item, quantity: item.quantity -= 1}
                } else {
                    return item
                }
            })
            if (payload.quantity > 1) state.totalPrice -= payload.price
        },
        toggleItemToFavorites: (state, {payload}) => {
            if(state.favorites.filter(item => item.id === payload.id).length) {
                state.favorites = state.favorites.filter(item => item.id !== payload.id)
            } else {
                state.favorites.push(payload)
            }
        }
    }
})

export default cartSlice.reducer
export const {addItemToCart, removeItemFromCart, addQuantityToCart, removeQuantityFromCart, toggleItemToFavorites, addItemsFromLocalStorage} = cartSlice.actions