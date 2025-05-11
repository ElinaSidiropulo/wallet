import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5001/transactions';

// Получение транзакций
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async (_, { getState }) => {
        const state = getState();
        const user = state.user.user;

        if (!user?.email) {
            throw new Error('User email is missing');
        }

        try {
            const response = await axios.get(`${API}?userEmail=${user.email}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    }
);

// Добавление транзакции
export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (transaction, { getState }) => {
        const { user } = getState().user;

        // Добавляем email к объекту транзакции
        const transactionWithEmail = {
            ...transaction,
            userEmail: user.email,
        };

        try {
            const response = await axios.post(API, transactionWithEmail, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding transaction:', error);
            throw error;
        }
    }
);


// Удаление транзакции
export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async (id, { getState }) => {
        const { user } = getState().user;
        try {
            await axios.delete(`${API}/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            return id;
        } catch (error) {
            console.error('Error deleting transaction:', error);
            throw error;
        }
    }
);

export const updateTransaction = createAsyncThunk(
    'transactions/updateTransaction',
    async (updatedTransaction, { getState }) => {
        const { user } = getState().user;

        try {
            const response = await axios.put(
                `${API}/${updatedTransaction.id}`,
                { ...updatedTransaction, userEmail: user.email }, // сохраняем email!
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating transaction:', error);
            throw error;
        }
    }
);


const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (transaction) => transaction.id !== action.payload
                );
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const index = state.items.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default transactionsSlice.reducer;
