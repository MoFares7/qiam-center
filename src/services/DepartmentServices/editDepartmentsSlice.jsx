import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const editDepartments = createAsyncThunk(
        'api/departments',
        async ({ id, body }) => { 
                try {
                        const response = await axios.put(`http://127.0.0.1:8000/api/departments/${id}`, body, {
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

const editDepartmentsSlice = createSlice({
        name: 'editDepartments',
        initialState: {
                status: 'idle',
                data: null,
                error: null,
                editDialogOpen: false,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(editDepartments.pending, (state) => {
                                state.status = 'loading';
                        })
                        .addCase(editDepartments.fulfilled, (state, action) => {
                                state.status = 'succeeded';
                                state.data = action.payload;
                        })
                        .addCase(editDepartments.rejected, (state, action) => {
                                state.status = 'failed';
                                state.error = action.error.message;
                        });
        },
});
export const { setEditDialogOpen } = editDepartmentsSlice.actions;
export default editDepartmentsSlice.reducer;
