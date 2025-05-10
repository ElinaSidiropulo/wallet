// src/pages/LoginTest.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/userSlice';

const LoginTest = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Redux Test</h1>

            {user.isLoggedIn ? (
                <div>
                    <p>Привет, {user.user.email}!</p>
                    <button
                        onClick={() => dispatch(logout())}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Выйти
                    </button>
                </div>
            ) : (
                <button
                    onClick={() =>
                        dispatch(login({ user: { email: 'elina@example.com' }, token: 'abc123' }))
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Войти
                </button>
            )}
        </div>
    );
};

export default LoginTest;