import { configureStore} from '@reduxjs/toolkit'
import products from './productsSlice/productsSlice'
import singleProduct from './singleProductSlice/singleProductSlice'
import cart from './cartSlice/cartSlice'
import user from './userSlice/userSlice'

export const store = configureStore({
    reducer: {products, singleProduct, cart, user},
    devtools: true
})