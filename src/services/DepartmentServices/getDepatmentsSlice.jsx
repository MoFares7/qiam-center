import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDepartments = createAsyncThunk(
        'api/departments',
        async () => {
                try {
                        const response = await axios.get('http://127.0.0.1:8000/api/departments', {
                                headers: {
                                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                        });
                        console.log("Department " + response.data);
                        return response.data.data; 
                } catch (e) {
                        throw e;
                }
        }
);

const getDepartmentsSlice = createSlice({
        name: 'getDepartment',
        initialState: {
                status: 'idle',
                data: [], // Ensure that the initial state is an array
                error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(getDepartments.pending, (state) => {
                                state.status = 'loading';
                        })
                        .addCase(getDepartments.fulfilled, (state, action) => {
                                state.status = 'succeeded';
                                state.data = action.payload;
                        })
                        .addCase(getDepartments.rejected, (state, action) => {
                                state.status = 'failed';
                                state.error = action.error.message;
                        });
        },
});

export default getDepartmentsSlice.reducer;
