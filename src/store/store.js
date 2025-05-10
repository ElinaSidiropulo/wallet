// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import transactionsReducer from './transactionsSlice';
import categoriesReducer from './categoriesSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        transactions: transactionsReducer,
        categories: categoriesReducer,
    },
});
