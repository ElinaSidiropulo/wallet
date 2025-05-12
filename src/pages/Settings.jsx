import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories, createCategory, deleteCategory } from '../store/categoriesSlice';
import { motion } from 'framer-motion';
import { FiGrid, FiBarChart2, FiSettings } from 'react-icons/fi';

const Settings = () => {
    const dispatch = useDispatch();
    const { items: categories, status, error } = useSelector((state) => state.categories);

    const [name, setName] = useState('');
    const [icon, setIcon] = useState('💰');
    const [color, setColor] = useState('#FF5733');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    const handleCreateCategory = (e) => {
        e.preventDefault();
        if (name.trim()) {
            dispatch(createCategory({ name, icon, color }));
            setName('');
            setIcon('💰');
            setColor('#FF5733');
        }
    };

    const handleDeleteCategory = (id) => {
        if (confirm('Удалить эту категорию?')) {
            dispatch(deleteCategory(id));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-8"
        >
            <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto space-y-10">
                {/* Navigation Bar */}
                <div className="flex justify-center gap-4">
                    <Link to="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg"
                        >
                            <FiGrid /> Dashboard
                        </motion.button>
                    </Link>
                    <Link to="/stats">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg"
                        >
                            <FiBarChart2 /> Stats
                        </motion.button>
                    </Link>
                    <Link to="/settings">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-xl shadow-lg"
                        >
                            <FiSettings /> Settings
                        </motion.button>
                    </Link>
                </div>

                {/* Content */}
                <div className="bg-white/10 backdrop-blur-lg border border-indigo-400/30 rounded-2xl p-6 sm:p-8 shadow-xl">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">
                        Управление категориями расходов
                    </h1>

                    {/* Форма для добавления категории */}
                    <form
                        onSubmit={handleCreateCategory}
                        className="bg-gray-800/50 p-6 rounded-2xl shadow-lg space-y-6 mb-8"
                    >
                        <div>
                            <label className="block text-sm font-medium text-indigo-200 mb-2">
                                Название категории
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Название категории"
                                className="w-full p-3 bg-gray-800/50 border border-indigo-400/30 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-indigo-200 mb-2">
                                    Иконка
                                </label>
                                <select
                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                    className="w-full p-3 bg-gray-800/50 border border-indigo-400/30 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
                                >
                                    {['💰', '🛒', '🍽️', '🚗', '🏠'].map((i) => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-indigo-200 mb-2">
                                    Цвет
                                </label>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-full h-12 border border-indigo-400/30 rounded-lg bg-gray-800/50"
                                />
                            </div>
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-3 rounded-lg font-semibold hover:opacity-90 shadow-lg transition duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Добавить категорию
                        </motion.button>
                    </form>

                    {/* Загрузка и ошибки */}
                    {status === 'loading' && (
                        <p className="text-center text-indigo-300 mt-4">Загрузка...</p>
                    )}
                    {error && <p className="text-center text-red-400 mt-4">{error}</p>}

                    {/* Список категорий */}
                    <div className="space-y-4">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex justify-between items-center p-4 bg-gray-800/50 border border-indigo-400/30 rounded-lg shadow-md"
                            >
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl">{cat.icon}</span>
                                    <span
                                        style={{ color: cat.color }}
                                        className="text-lg font-semibold text-white"
                                    >
                                        {cat.name}
                                    </span>
                                </div>
                                <motion.button
                                    onClick={() => handleDeleteCategory(cat.id)}
                                    className="text-red-400 hover:text-red-600 font-semibold px-3 py-1 rounded-lg transition duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Удалить
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;