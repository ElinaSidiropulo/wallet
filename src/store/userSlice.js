// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const localUser = localStorage.getItem('user'); // Загружаем пользователя при старте

const initialState = {
    isAuthenticated: !!localUser,
    user: localUser ? JSON.parse(localUser) : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Сохраняем
        },
        loginUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Сохраняем
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('user'); // Удаляем при выходе
        },
    },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
