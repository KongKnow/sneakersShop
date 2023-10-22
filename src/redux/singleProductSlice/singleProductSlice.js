import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSneakersById = createAsyncThunk(
    'product/getSneakersById',
    async (id) => {
        const res = await axios(`https://6528113c931d71583df1d45b.mockapi.io/products/${id}`)
        return res.data
    }
)

const initialState = {
    product: [],
    loading: false,
    error: false
}

const singleProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSneakersById.fulfilled, (state, action) => {
                state.product = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(getSneakersById.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getSneakersById.rejected, (state) => {
                state.loading = false
                state.error = true
            })
    }
})

export default singleProductSlice.reducer