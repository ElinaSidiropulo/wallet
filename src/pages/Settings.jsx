import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, deleteCategory } from '../store/categoriesSlice';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
        dispatch(deleteCategory(id));
    };

    // Преобразование категорий в данные для диаграммы с учетом их долей
    const pieData = categories.map((cat) => ({
        name: cat.name,
        value: Math.floor(Math.random() * 40) + 10, // Сделаем диапазон от 10 до 50 для каждого значения
        color: cat.color || '#FF5733',
    }));

    // Рассчитываем сумму всех категорий, чтобы все делилось на 100%
    const total = pieData.reduce((sum, cat) => sum + cat.value, 0);
    pieData.forEach(cat => cat.value = (cat.value / total) * 100);  // Преобразуем в проценты

    return (
        <div className="container mx-auto p-8 max-w-4xl bg-gray-800 rounded-2xl shadow-2xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-white">Управление категориями расходов</h1>

            {/* Форма для добавления категории */}
            <form onSubmit={handleCreateCategory} className="bg-gray-700 p-8 rounded-2xl shadow-lg space-y-6">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название категории"
                    className="w-full p-4 border border-gray-500 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    required
                />
                <div className="flex space-x-4">
                    <select
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        className="w-full p-4 border border-gray-500 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                        {['💰', '🛒', '🍽️', '🚗', '🏠'].map((i) => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full h-12 border border-gray-500 rounded-xl shadow-sm focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300"
                >
                    Добавить категорию
                </button>
            </form>

            {/* Загрузка и ошибки */}
            {status === 'loading' && <p className="text-center text-gray-300 mt-4">Загрузка...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}

            {/* Диаграмма распределения категорий */}
            <div className="mb-12 mt-8">
                <h2 className="text-3xl font-semibold text-center mb-6 text-white">Распределение расходов по категориям</h2>
                {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={140} label>
                                {pieData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#2d2d2d', borderRadius: '8px' }}
                                labelStyle={{ color: 'white' }}
                                itemStyle={{ color: 'white' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-gray-500">Нет данных для отображения</p>
                )}
            </div>

            {/* Список категорий */}
            <ul className="space-y-6">
                {categories.map((cat) => (
                    <li key={cat.id} className="flex justify-between items-center p-6 bg-gray-700 shadow-lg rounded-xl">
                        <div className="flex items-center space-x-4">
                            <span className="text-3xl">{cat.icon}</span>
                            <span style={{ color: cat.color }} className="text-xl font-semibold text-white">{cat.name}</span>
                        </div>
                        <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="text-red-500 hover:text-red-700 transition-all duration-300"
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Settings;
