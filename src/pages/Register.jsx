import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/userSlice'; // Действие для регистрации пользователя
import axios from 'axios';
import { createDefaultCategories } from '../utils/createDefaultCategories';


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

        try {
            const response = await axios.get('http://localhost:5001/users');
            const users = response.data;

            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                alert('Пользователь с такой почтой уже существует');
                return;
            }

            await axios.post('http://localhost:5001/users', { email, password });
            dispatch(registerUser({ email, password }));
            await createDefaultCategories(email); // ← вот здесь
            alert('Регистрация успешна!');
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            alert('Произошла ошибка при регистрации');
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
