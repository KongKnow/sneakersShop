import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type TypeUrlSettings = {
    page: number,
    filter: string,
    search: string,
    category: string
}

export const getSneakers = createAsyncThunk(
    'products/getSneakers',
    async (settings: TypeUrlSettings) => {
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

export type TypeProduct = {
    id: string,
    imageUrl: string,
    title: string,
    sizes: number[],
    price: number,
    category: string,
    rating: number
}

export type TypeFilter = {
    name: string,
    url: string
}

type TypeInitialState = {
    products: TypeProduct[],
    categories: string[],
    filter: TypeFilter,
    selectedCategory: string,
    loading: boolean,
    error: boolean,
    searchValue: string
}

const initialState: TypeInitialState = {
    products: [],
    categories: [],
    filter: {
        name: '',
        url: ''
    },
    selectedCategory: 'all',
    loading: false,
    error: false,
    searchValue: ''
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        selectCategory: (state, {payload}: PayloadAction<string>) => {
            if(state.selectedCategory === payload) {
                state.selectedCategory = 'all'
            } else {
                state.selectedCategory = payload
            }
        },
        setFilter: (state, {payload}: PayloadAction<TypeFilter>) => {
            state.filter = payload
        },
        setSearchValue: (state, {payload}: PayloadAction<string>) => {
            state.searchValue = payload
        },
        setLoading: (state) => {
            state.loading = !state.loading
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSneakers.fulfilled, (state, {payload}: PayloadAction<TypeProduct[]>) => {
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
            .addCase(getCategories.fulfilled, (state, {payload}: PayloadAction<string[]>) => {
                state.categories = payload
            })

    }
})

export const {selectCategory, setFilter, setSearchValue, setLoading} = productSlice.actions
export default productSlice.reducer