import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Экшн для регистрации пользователя
        registerUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
