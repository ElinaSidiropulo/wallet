import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/userSlice'; // Действие для регистрации пользователя
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        // Запрос на создание нового пользователя
        try {
            await axios.post('http://localhost:5001/users', { email, password });
            dispatch(registerUser({ email, password })); // Логика регистрации через Redux
            alert('Регистрация успешна!');
        } catch (error) {
            console.error('Ошибка при регистрации', error);
        }
    };


    return (
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Пароль:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Подтвердите пароль:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;
