import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../store/transactionsSlice';
import { fetchCategories } from '../store/categoriesSlice';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiBarChart2, FiSettings, FiGrid } from 'react-icons/fi';

const Stats = () => {
    const dispatch = useDispatch();
    const { items: transactions = [] } = useSelector((state) => state.transactions);
    const { items: categories } = useSelector((state) => state.categories);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchCategories());
    }, [dispatch]);

    // Фильтрация по датам
    const filtered = transactions.filter((t) => {
        const date = new Date(t.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || date >= start) && (!end || date <= end);
    });

    // Данные для круговой диаграммы
    const pieData = categories
        .map((cat) => {
            const totalExpenses = filtered
                .filter((t) => t.categoryId === cat.id && t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);
            return { name: cat.name, value: totalExpenses, color: cat.color };
        })
        .filter((d) => d.value > 0);

    // Данные для столбчатой диаграммы
    const barData = categories
        .map((cat) => {
            const income = filtered
                .filter((t) => t.categoryId === cat.id && t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0);
            const expense = filtered
                .filter((t) => t.categoryId === cat.id && t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);
            return { name: cat.name, income, expense };
        })
        .filter((d) => d.income > 0 || d.expense > 0);

    // Данные для линейной диаграммы за последние 6 месяцев
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const incomePerMonth = Array.from({ length: 6 }, (_, i) => {
        const month = new Date(sixMonthsAgo.getFullYear(), sixMonthsAgo.getMonth() + i, 1);
        const label = month.toLocaleString('default', { month: 'short' });
        const total = transactions
            .filter((t) => {
                const date = new Date(t.date);
                return (
                    t.type === 'income' &&
                    date.getFullYear() === month.getFullYear() &&
                    date.getMonth() === month.getMonth()
                );
            })
            .reduce((sum, t) => sum + t.amount, 0);
        return { month: label, income: total };
    });

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-16">
            {/* Навигационная панель */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-xl shadow-lg border-b border-indigo-400/30"
            >
                <div className="container mx-auto px-4 py-4 flex justify-center gap-4">
                    <Link to="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl"
                        >
                            <FiGrid /> Dashboard
                        </motion.button>
                    </Link>
                    <Link to="/stats">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl"
                        >
                            <FiBarChart2 /> Stats
                        </motion.button>
                    </Link>
                    <Link to="/settings">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-xl"
                        >
                            <FiSettings /> Settings
                        </motion.button>
                    </Link>
                </div>
            </motion.nav>

            {/* Основной контент */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="container mx-auto max-w-6xl mt-20" // Добавлен отступ, чтобы избежать наложения с навигацией
            >
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-white text-center mb-8"
                >
                    Статистика
                </motion.h1>

                {/* Фильтры дат */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
                >
                    <motion.input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full sm:w-auto bg-white/20 text-white p-3 rounded-xl outline-none placeholder-gray-300 transition focus:ring-2 focus:ring-indigo-500"
                        whileFocus={{ scale: 1.02 }}
                    />
                    <motion.input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full sm:w-auto bg-white/20 text-white p-3 rounded-xl outline-none placeholder-gray-300 transition focus:ring-2 focus:ring-indigo-500"
                        whileFocus={{ scale: 1.02 }}
                    />
                </motion.div>

                {/* Графики */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Круговая диаграмма */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-indigo-400/30"
                    >
                        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Круговая диаграмма</h2>
                        {pieData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={100} label>
                                        {pieData.map((entry, index) => (
                                            <Cell key={index} fill={entry.color || '#8884d8'} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '8px' }} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-gray-300">Нет данных для отображения</p>
                        )}
                    </motion.div>

                    {/* Столбчатая диаграмма */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-indigo-400/30"
                    >
                        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Столбчатая диаграмма</h2>
                        {barData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barData}>
                                    <XAxis dataKey="name" stroke="#fff" />
                                    <YAxis stroke="#fff" />
                                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '8px' }} />
                                    <Legend />
                                    <Bar dataKey="income" fill="#4CAF50" name="Доход" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="expense" fill="#F44336" name="Расход" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-gray-300">Нет данных для отображения</p>
                        )}
                    </motion.div>

                    {/* Линейная диаграмма */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-indigo-400/30 md:col-span-2"
                    >
                        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Линейная диаграмма доходов (6 месяцев)</h2>
                        {incomePerMonth.some((d) => d.income > 0) ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={incomePerMonth}>
                                    <XAxis dataKey="month" stroke="#fff" />
                                    <YAxis stroke="#fff" />
                                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '8px' }} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#4CAF50"
                                        strokeWidth={2}
                                        name="Доход"
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-gray-300">Нет данных за последние 6 месяцев</p>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Stats;