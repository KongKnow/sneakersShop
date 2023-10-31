import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSneakers = createAsyncThunk(
    'products/getSneakers',
    async (settings) => {
        let url = `https://6528113c931d71583df1d45b.mockapi.io/products?page=${settings.page}&limit=8${settings.filter}${settings.search ? `&search=${settings.search}` : ''}`
        if (settings.category !== 'all') {
            url = `https://6528113c931d71583df1d45b.mockapi.io/products?${settings.category === 'all' ? '' : `&category=${settings.category}`}&page=${settings.page}&limit=8${settings.filter}${settings.search ? `&search=${settings.search}` : ''}`
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
    filter: {},
    selectedCategory: 'all',
    loading: false,
    error: false,
    searchValue: ''
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
        },
        setFilter: (state, {payload}) => {
            state.filter = payload
        },
        setSearchValue: (state, {payload}) => {
            state.searchValue = payload
        },
        setLoading: (state) => {
            state.loading = !state.loading
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

export const {selectCategory, setFilter, setSearchValue, setLoading} = productSlice.actions
export default productSlice.reducer