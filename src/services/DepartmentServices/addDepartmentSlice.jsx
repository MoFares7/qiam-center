import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addDepartments = createAsyncThunk(
        'api/departments',
        async ({ body }) => {
                try {
                        console.log('Credentials:', body);
                        const response = await axios.post('http://127.0.0.1:8000/api/departments', body, {
                                headers: {
                                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                        });
                        console.log('Department ' + response.data);
                        return response.data.data;
                } catch (e) {
                        throw e;
                }
        }
);

const addDepartmentSlice = createSlice({
        name: 'addDepartment',
        initialState: {
                isLoading: false,
                error: null,
        },
        reducers: {
                addDepartmentsStart: (state) => {
                        state.isLoading = true;
                        state.error = null;
                },
                addDepartmentsSuccess: (state) => {
                        state.isLoading = false;
                        state.error = null;
                },
                addDepartmentsFailure: (state, action) => {
                        state.isLoading = false;
                        state.error = action.payload;
                },
        },
});

export const { addDepartmentsStart, addDepartmentsSuccess, addDepartmentsFailure } = addDepartmentSlice.actions;

export default addDepartmentSlice.reducer;
