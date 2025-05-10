import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5001/transactions';

// Асинхронные экшены
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async (userEmail) => {
        const response = await axios.get(`${API}?userId=${userEmail}`);
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

// Новый экшен для редактирования транзакции
export const editTransaction = createAsyncThunk(
    'transactions/editTransaction',
    async (transaction) => {
        const response = await axios.put(`${API}/${transaction.id}`, transaction);
        return response.data;
    }
);

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        items: [],
        status: 'idle',
    },
    reducers: {
        // Синхронные экшены для работы с состоянием (добавление, удаление, редактирование)
        addTransactionLocally: (state, action) => {
            state.items.push(action.payload);
        },
        deleteTransactionLocally: (state, action) => {
            state.items = state.items.filter(transaction => transaction.id !== action.payload);
        },
        editTransactionLocally: (state, action) => {
            const index = state.items.findIndex(transaction => transaction.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        setTransactions: (state, action) => {
            state.items = action.payload;
        }
    },
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
            })
            .addCase(editTransaction.fulfilled, (state, action) => {
                const index = state.items.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    }
});

// Экспорт новых синхронных экшенов
export const { addTransactionLocally, deleteTransactionLocally, editTransactionLocally, setTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
