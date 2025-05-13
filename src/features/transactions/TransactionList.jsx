import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteTransaction } from '../../store/transactionsSlice';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const TransactionList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const transactions = useSelector(state => state.transactions.items || []);
    const categories = useSelector(state => state.categories.items || []);

    // Логирование для отладки
    console.log('Транзакции в списке:', transactions);

    // Сортировка по дате: новые сверху
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Получение названия категории по ID
    const getCategoryName = (categoryId) => {
        if (categoryId == null) return '—';
        const found = categories.find(cat => cat.id === categoryId);
        return found ? found.name : '—';
    };

    const handleDelete = (id) => {
        if (confirm('Удалить эту транзакцию?')) {
            dispatch(deleteTransaction(id));
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-200">Последние транзакции</h2>

            {sortedTransactions.length === 0 ? (
                <p className="text-indigo-300 text-center">Нет добавленных транзакций.</p>
            ) : (
                <div className="space-y-4">
                    {sortedTransactions.map((tx, index) => (
                        <motion.div
                            key={tx.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center justify-between p-4 rounded-lg shadow-md border ${
                                tx.type === 'income'
                                    ? 'bg-green-500/10 border-green-400/30'
                                    : 'bg-red-500/10 border-red-400/30'
                            } backdrop-blur-lg`}
                        >
                            <div className="flex items-center space-x-4">
                                <div className={`p-2 rounded-full ${
                                    tx.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                                }`}>
                                    {tx.type === 'income' ? (
                                        <ArrowUpIcon className="w-5 h-5 text-green-400" />
                                    ) : (
                                        <ArrowDownIcon className="w-5 h-5 text-red-400" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-white font-medium">
                                        {tx.type === 'income' ? 'Доход' : 'Расход'}: {tx.amount} $
                                    </p>
                                    <p className="text-indigo-300 text-sm">
                                        Категория: {getCategoryName(tx.categoryId)}
                                    </p>
                                    {tx.comment && (
                                        <p className="text-indigo-400 text-sm">Комментарий: {tx.comment}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-indigo-300 text-sm">
                                        {new Date(tx.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link
                                        to={`/edit-transaction/${tx.id}`}
                                        className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white font-semibold px-3 py-1 rounded-lg shadow transition duration-300"
                                    >
                                        Редактировать
                                    </Link>
                                    <motion.button
                                        onClick={() => handleDelete(tx.id)}
                                        className="flex items-center bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white font-semibold px-3 py-1 rounded-lg shadow transition duration-300"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Удалить
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionList;