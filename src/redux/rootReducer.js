import { combineReducers } from '@reduxjs/toolkit';
import jobSlice from './slices/jobSlice';

const rootReducer = combineReducers({
    jobSlice
});

export default rootReducer;