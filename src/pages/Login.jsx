import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data: users } = await axios.get('http://localhost:5001/users');
            const user = users.find((u) => u.email === email && u.password === password);
            if (!user) return alert('Неверный email или пароль');

            dispatch(loginUser({ email, password }));
            alert('Успешный вход!');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Ошибка при входе');
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative z-10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-[90%] sm:max-w-md lg:max-w-lg xl:max-w-xl border border-indigo-400/30"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center mb-6"
                >
                    <FiLogIn className="text-indigo-400 text-5xl drop-shadow-md" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-4xl sm:text-5xl font-bold mb-4 text-center"
                >
                    С возвращением!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-center mb-10"
                >
                    Войдите в ваш кошелёк и продолжайте управлять финансами.
                </motion.p>
                <form onSubmit={handleLogin} className="space-y-6">
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
                    <motion.button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Войти
                    </motion.button>
                </form>
                <div className="text-center mt-6">
                    <p className="text-gray-400">
                        Нет аккаунта?{' '}
                        <Link to="/register" className="text-pink-400 hover:underline">
                            Зарегистрироваться
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;