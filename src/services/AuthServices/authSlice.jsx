// apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const login = createAsyncThunk('api/login', async (credentials) => {
        try {
                console.log('Credentials:', credentials);
                const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
                const token = localStorage.setItem('token', response.data.token)
                console.log("token " + token)
                console.log(response);

                return response.data;
        } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                        const { status } = error.response;

                        if (status === 401) {
                                // Handle 401 (Unauthorized) error
                                console.log('Unauthorized: Incorrect credentials');
                                // You can display a message to the user indicating that their credentials are incorrect
                        } else if (status === 422) {
                                // Handle 422 (Unprocessable Entity) error
                                const { data } = error.response;
                                if (data && data.errors) {
                                        // Display error messages to the user based on the validation errors
                                        console.log('Validation Errors:', data.errors);
                                        // You can handle the validation errors and display messages to the user here
                                }
                        }
                }
                throw error;
        }
});


const authSlice = createSlice({
        name: 'auth',
        initialState: {
                status: 'idle', // idle | loading | succeeded | failed
                data: null,
                error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(login.pending, (state) => {
                                state.status = 'loading';
                        })
                        .addCase(login.fulfilled, (state, action) => {
                                state.status = 'succeeded';
                                state.data = action.payload;
                        })
                        .addCase(login.rejected, (state, action) => {
                                state.status = 'failed';
                                state.error = action.error.message;
                        });
        },
});

export default authSlice.reducer;
