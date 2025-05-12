import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchTransactions } from '../store/transactionsSlice';
import { fetchCategories } from '../store/categoriesSlice';
import { logoutUser } from '../store/userSlice';
import AddTransactionForm from '../features/transactions/AddTransactionForm';
import TransactionList from '../features/transactions/TransactionList';
import Balance from '../features/transactions/Balance';
import { ArrowLeftOnRectangleIcon, Cog6ToothIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const transactions = useSelector(state => state.transactions.transactions);

    useEffect(() => {
        if (user) {
            dispatch(fetchTransactions(user.email));
            dispatch(fetchCategories(user.email));
        }
    }, [dispatch, user]);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full px-4 sm:px-6 lg:px-8 mx-auto space-y-10"
            >
                {/* Header */}
                <header className="flex justify-between items-center gap-4 w-full">
                    <h1 className="text-3xl sm:text-4xl font-bold flex items-center text-white">
                        <span className="mr-2">💼</span> Онлайн-кошелёк
                    </h1>
                    <motion.button
                        onClick={handleLogout}
                        className="flex items-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition duration-300"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        aria-label="Log out"
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                        Выйти
                    </motion.button>
                </header>

                {/* Navigation */}
                <nav className="flex space-x-6">
                    <Link
                        to="/settings"
                        className="flex items-center text-indigo-300 hover:text-white transition"
                        aria-label="Go to settings"
                    >
                        <Cog6ToothIcon className="w-5 h-5 mr-1" />
                        Настройки
                    </Link>
                    <Link
                        to="/stats"
                        className="flex items-center text-indigo-300 hover:text-white transition"
                        aria-label="View statistics"
                    >
                        <ChartBarIcon className="w-5 h-5 mr-1" />
                        Статистика
                    </Link>
                </nav>

                {/* Content Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-10 w-full"
                >
                    {/* Balance */}
                    <div className="bg-white/10 backdrop-blur-lg border border-indigo-400/30 rounded-2xl p-6 shadow-xl">
                        <h2 className="text-2xl font-semibold mb-4 text-indigo-200">Баланс</h2>
                        <Balance />
                    </div>

                    {/* Add Transaction */}
                    <div className="bg-white/10 backdrop-blur-lg border border-indigo-400/30 rounded-2xl p-6 shadow-xl">
                        <h2 className="text-2xl font-semibold mb-4 text-indigo-200">Добавить транзакцию</h2>
                        <AddTransactionForm />
                    </div>

                    {/* Transaction List */}
                    <div className="bg-white/10 backdrop-blur-lg border border-indigo-400/30 rounded-2xl p-6 shadow-xl">
                        <h2 className="text-2xl font-semibold mb-4 text-indigo-200">Транзакции</h2>
                        <TransactionList transactions={transactions} />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Dashboard;