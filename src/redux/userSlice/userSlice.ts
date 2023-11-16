import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TypeInitialStateUser = {
    email: string | null
    token: string | null
    id: string | null
}

const initialState: TypeInitialStateUser = {
    email: null,
    token: null,
    id: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<TypeInitialStateUser>) => {
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id
        },
        removeUser: (state) => {
            state.email = null
            state.token = null
            state.id = null
        }
    }
})

export default userSlice.reducer
export const {setUser, removeUser} = userSlice.actions