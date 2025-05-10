import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5001/categories';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await axios.get(API);
        return response.data;
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'succeeded';
        });
    }
});

export default categoriesSlice.reducer;
