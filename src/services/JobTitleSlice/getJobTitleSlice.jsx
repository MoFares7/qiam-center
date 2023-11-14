import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getJobTitles = createAsyncThunk(
        'api/job-titles',
        async () => {
                try {
                        const response = await axios.get('http://127.0.0.1:8000/api/job-titles', {
                                headers: {
                                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                        });
                        console.log(`job Title ${JSON.stringify(response.data)}`);
                        return response.data.data;
                } catch (e) {
                        throw e;
                }
        }
);


const getJobTitlesSlice = createSlice({
        name: 'getJobTitles',
        initialState: {
                status: 'idle',
                data: [],
                error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(getJobTitles.pending, (state) => {
                                state.status = 'loading';
                        })
                        .addCase(getJobTitles.fulfilled, (state, action) => {
                                state.status = 'succeeded';
                                state.data = action.payload;
                        })
                        .addCase(getJobTitles.rejected, (state, action) => {
                                state.status = 'failed';
                                state.error = action.error.message;
                        });
        },
});

export default getJobTitlesSlice.reducer;
