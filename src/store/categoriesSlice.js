import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5001/categories';

// Получение категорий
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { getState }) => {
        const { user } = getState().user; // Предполагается, что token хранится в userSlice
        const response = await axios.get(API, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        return response.data;
    }
);

// Создание категории
export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (category, { getState }) => {
        const { user } = getState().user;
        const response = await axios.post(API, category, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        return response.data;
    }
);

// Удаление категории
export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id, { getState }) => {
        const { user } = getState().user;
        await axios.delete(`${API}/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        return id;
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        items: [], // Твое название поля (было items вместо categories)
        status: 'idle',
        error: null, // Добавим поле для обработки ошибок
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Обработка fetchCategories
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Обработка createCategory
            .addCase(createCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Обработка deleteCategory
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.items = state.items.filter((cat) => cat.id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default categoriesSlice.reducer;