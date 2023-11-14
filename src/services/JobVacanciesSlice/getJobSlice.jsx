import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getJobVacancies = createAsyncThunk(
        'api/job-vacancies',
        async () => {
                try {
                        const response = await axios.get('http://127.0.0.1:8000/api/job-vacancies', {
                                headers: {
                                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                        });
                        console.log(`job vacancies ${JSON.stringify(response.data)}`);
                        return response.data.data;
                } catch (e) {
                        throw e;
                }
        }
);


const getJobVacanciesSlice = createSlice({
        name: 'getJobVacancies',
        initialState: {
                status: 'idle',
                data: [],
                error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(getJobVacancies.pending, (state) => {
                                state.status = 'loading';
                        })
                        .addCase(getJobVacancies.fulfilled, (state, action) => {
                                state.status = 'succeeded';
                                state.data = action.payload;
                        })
                        .addCase(getJobVacancies.rejected, (state, action) => {
                                state.status = 'failed';
                                state.error = action.error.message;
                        });
        },
});

export default getJobVacanciesSlice.reducer;
