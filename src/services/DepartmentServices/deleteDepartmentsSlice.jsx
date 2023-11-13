// editDepartmentsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteDepartments = createAsyncThunk(
        'api/departments',
        async ({ id }) => {
                try {
                        const response = await axios.put(`http://127.0.0.1:8000/api/departments/${id}`, null, {
                                headers: {
                                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                        });
                        console.log("Department", response.data);
                        return response.data.data;
                } catch (e) {
                        throw e;
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
        reducers: {
                deleteDepartmentsStart: (state) => {
                        state.isLoading = true;
                        state.error = null;
                },
                deleteDepartmentsSuccess: (state) => {
                        state.isLoading = false;
                        state.error = null;
                },
                editDepartmentsFailure: (state, action) => {
                        state.isLoading = false;
                        state.error = action.payload;
                },
        },
});

export const { deleteDepartmentsStart, deleteDepartmentsSuccess, deleteDepartmentsFailure } = deleteDepartmentsSlice.actions;

export default deleteDepartmentsSlice.reducer;
