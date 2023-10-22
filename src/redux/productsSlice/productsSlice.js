import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSneakers = createAsyncThunk(
    'products/getSneakers',
    async () => {
        const res = await axios('https://6528113c931d71583df1d45b.mockapi.io/products')
        return res.data
    }
)

const initialState = {
    products: [],
    loading: false,
    error: false
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSneakers.fulfilled, (state, action) => {
                state.products = action.payload
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
    }
})

export default productSlice.reducer