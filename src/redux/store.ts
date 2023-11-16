import { configureStore} from '@reduxjs/toolkit'
import products from './productsSlice/productsSlice'
import singleProduct from './singleProductSlice/singleProductSlice'
import cart from './cartSlice/cartSlice'
import user from './userSlice/userSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {products, singleProduct, cart, user}
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()