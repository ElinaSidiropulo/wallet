import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/userSlice';
import axios from 'axios';
import { createDefaultCategories } from '../utils/createDefaultCategories';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return alert('Пароли не совпадают');

        try {
            const { data: users } = await axios.get('http://localhost:5001/users');
            if (users.find((u) => u.email === email)) return alert('Почта уже занята');

            await axios.post('http://localhost:5001/users', { email, password });
            dispatch(registerUser({ email, password }));
            await createDefaultCategories(email);
            alert('Регистрация успешна!');
        } catch (err) {
            console.error(err);
            alert('Ошибка при регистрации');
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative z-10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-[90%] sm:max-w-md lg:max-w-lg xl:max-w-xl border border-white/20"
            >
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-4xl sm:text-5xl font-bold mb-6 text-center"
                >
                    My Wallet
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-center mb-10"
                >
                    Это уникальный сервис, который поможет вам контролировать свои финансы. Присоединяйтесь сейчас!
                </motion.p>
                <form onSubmit={handleRegister} className="space-y-6">
                    <motion.input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                        className="w-full bg-white/20 text-white p-3 rounded-xl outline-none placeholder-gray-300 transition focus:ring-2 focus:ring-indigo-500"
                        whileFocus={{ scale: 1.02 }}
                    />
                    <motion.input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Пароль"
                        className="w-full bg-white/20 text-white p-3 rounded-xl outline-none placeholder-gray-300 transition focus:ring-2 focus:ring-indigo-500"
                        whileFocus={{ scale: 1.02 }}
                    />
                    <motion.input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Подтвердите пароль"
                        className="w-full bg-white/20 text-white p-3 rounded-xl outline-none placeholder-gray-300 transition focus:ring-2 focus:ring-indigo-500"
                        whileFocus={{ scale: 1.02 }}
                    />
                    <motion.button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition duration-300"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Зарегистрироваться
                    </motion.button>
                </form>
                <div className="text-center mt-6">
                    <p className="text-gray-400">
                        Уже есть аккаунт?{' '}
                        <Link to="/login" className="text-indigo-400 hover:underline">
                            Войти
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;