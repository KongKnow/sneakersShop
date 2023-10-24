import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSneakers = createAsyncThunk(
    'products/getSneakers',
    async (settings) => {
        let url = `https://6528113c931d71583df1d45b.mockapi.io/products?page=${settings.page}&limit=8`
        if (settings.category !== 'all') {
            url = `https://6528113c931d71583df1d45b.mockapi.io/products?${settings.category === 'all' ? '' : `&category=${settings.category}`}&page=${settings.page}&limit=8`
        }
        const res = await axios(url)
        return res.data
    }
)

export const getCategories = createAsyncThunk(
    'products/getCategories',
    async () => {
        const res = await axios('https://6528113c931d71583df1d45b.mockapi.io/categories')
        return res.data   
    }
)

const initialState = {
    products: [],
    categories: [],
    selectedCategory: 'all',
    loading: false,
    error: false
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        selectCategory: (state, {payload}) => {
            if(state.selectedCategory === payload) {
                state.selectedCategory = 'all'
            } else {
                state.selectedCategory = payload
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSneakers.fulfilled, (state, {payload}) => {
                state.products = payload
                state.loading = false
                state.error = false
            })
            .addCase(getSneakers.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getSneakers.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(getCategories.fulfilled, (state, {payload}) => {
                state.categories = payload
            })

    }
})

export const {selectCategory} = productSlice.actions
export default productSlice.reducer