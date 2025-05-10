import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5001/transactions';

export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async () => {
        const response = await axios.get(API);
        return response.data;
    }
);

export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (transaction) => {
        const response = await axios.post(API, transaction);
        return response.data;
    }
);

export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async (id) => {
        await axios.delete(`${API}/${id}`);
        return id;
    }
);

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        items: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.items = state.items.filter(t => t.id !== action.payload);
            });
    }
});

export default transactionsSlice.reducer;
