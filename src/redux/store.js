import { configureStore} from '@reduxjs/toolkit'
import products from './productsSlice/productsSlice'
import singleProduct from './singleProductSlice/singleProductSlice'

export const store = configureStore({
    reducer: {products, singleProduct},
    devtools: true
})