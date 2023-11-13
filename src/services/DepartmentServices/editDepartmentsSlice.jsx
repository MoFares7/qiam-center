import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const editDepartments = createAsyncThunk(
        'api/departments',
        async ({ id, body }) => {
                try {
                        console.log("edit body", body, "id", id);
                        const response = await axios.put(`http://127.0.0.1:8000/api/departments/${id}`, body, {
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

const editDepartmentsSlice = createSlice({
        name: 'editDepartments',
        initialState: {
                status: 'idle',
                data: null,
                error: null,

        },
        reducers: {
                editDepartmentsStart: (state) => {
                        state.isLoading = true;
                        state.error = null;
                },
                editDepartmentsSuccess: (state) => {
                        state.isLoading = false;
                        state.error = null;
                },
                editDepartmentsFailure: (state, action) => {
                        state.isLoading = false;
                        state.error = action.payload;
                },
        },
});
export const { editDepartmentsStart, editDepartmentsSuccess, editDepartmentsFailure } = editDepartmentsSlice.actions;

export default editDepartmentsSlice.reducer;
