import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
        name: 'token',
        initialState: {
                token: null,
                isAuthenticated: false,
        },
        reducers: {
                setToken: (state, action) => {
                        state.token = action.payload;
                        state.isAuthenticated = !!action.payload;

                },
        },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
