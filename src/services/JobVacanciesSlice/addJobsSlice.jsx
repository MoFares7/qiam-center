import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addJobsVacancies = createAsyncThunk(
        'api/job-vacancies',
        async ({ body }) => {
                try {
                        const response = await axios.post('http://127.0.0.1:8000/api/job-vacancies', body, {
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

const addJobVacanciesSlice = createSlice({
        name: 'addJobVacancies',
        initialState: {
                isLoading: false,
                error: null,
        },
        reducers: {
                addJobVacanciesStart: (state) => {
                        state.isLoading = true;
                        state.error = null;
                },
                addJobVacanciesSuccess: (state) => {
                        state.isLoading = false;
                        state.error = null;
                },
                addJobVacanciesFailure: (state, action) => {
                        state.isLoading = false;
                        state.error = action.payload;
                },
        },
});

export const { addJobVacanciesStart, addJobVacanciesSuccess, addJobVacanciesFailure } = addJobVacanciesSlice.actions;

export default addJobVacanciesSlice.reducer;
