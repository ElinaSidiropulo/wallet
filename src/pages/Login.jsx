import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice';  // Действие для входа пользователя
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // добавь импорт

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // создаём функцию навигации

    const handleLogin = async (e) => {
        e.preventDefault();

        // Запрос на аутентификацию пользователя
        try {
            const response = await axios.get(`http://localhost:5001/users?email=${email}&password=${password}`);
            if (response.data.length > 0) {
                dispatch(loginUser({ email, password }));
                alert('Вход успешен!');
                navigate('/dashboard'); // <<<<<< ДОБАВЬ ЭТО
            } else {
                alert('Неверные данные для входа');
            }
        } catch (error) {
            console.error('Ошибка при входе', error);
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;
