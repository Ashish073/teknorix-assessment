import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobs: {},
    jobsList: [],
    jobsArray: [],
    departments: [],
    locations: [],
    functions: [],
    searchedJobs: []
};

export const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload;
        },
        setJobsArray: (state, action) => {
            state.jobsArray = action.payload;
        },
        setDepartments: (state, action) => {
            state.departments = action.payload;
        },
        setLocations: (state, action) => {
            state.locations = action.payload;
        },
        setFunctions: (state, action) => {
            state.functions = action.payload;
        },
        setSearchedJobs: (state, action) => {
            state.searchedJobs = action.payload;
        },
        setJobsList: (state, action) => {
            state.jobsList = action.payload;
        },
    },
});

export const { setJobs, setDepartments, setJobsArray, setLocations, setFunctions, setSearchedJobs, setJobsList } = jobSlice.actions;
export default jobSlice.reducer;
