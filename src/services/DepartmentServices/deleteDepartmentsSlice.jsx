// editDepartmentsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteDepartments = createAsyncThunk(
        'api/departments',
        async ({ id }) => {
                try {
                        console.log(`Deleting department with ID: ${id}`);
                        const token = localStorage.getItem('token');
                        console.log('Request Headers:', {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                        });

                        const response = await axios.delete(`http://127.0.0.1:8000/api/departments/${id}`, {
                                headers: {
                                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                        });

                        console.log('Response:', response); // Log the entire response

                        if (response.data && response.data.message) {
                                console.log('Response Message:', response.data.message);
                        }

                        console.log('token:', token);
                        return response;
                } catch (e) {
                        console.error('Error in deleteDepartments:', e);
                        throw e; // Rethrow the error after logging
                }
        }
);



const deleteDepartmentsSlice = createSlice({
        name: 'deleteDepartments',
        initialState: {
                status: 'idle',
                data: null,
                error: null,

        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(deleteDepartments.pending, (state) => {
                                state.status = 'loading';
                        })
                        .addCase(deleteDepartments.fulfilled, (state, action) => {
                                state.status = 'succeeded';
                                state.data = action.payload;
                        })
                        .addCase(deleteDepartments.rejected, (state, action) => {
                                state.status = 'failed';
                                state.error = action.error.message;
                        });
        },
});

export default deleteDepartmentsSlice.reducer;
