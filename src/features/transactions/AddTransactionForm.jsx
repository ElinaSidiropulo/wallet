import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTransaction, updateTransaction } from '../../store/transactionsSlice';
import { fetchCategories } from '../../store/categoriesSlice';
import { motion } from 'framer-motion';

const AddTransactionForm = ({ transactionToEdit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: categories, status: catStatus } = useSelector((state) => state.categories);

    const [type, setType] = useState('expense');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (catStatus === 'idle') {
            dispatch(fetchCategories());
        }
    }, [catStatus, dispatch]);

    useEffect(() => {
        if (transactionToEdit) {
            setType(transactionToEdit.type || 'expense');
            setAmount(transactionToEdit.amount?.toString() || '');
            setCategoryId(transactionToEdit.categoryId?.toString() || '');
            setDate(transactionToEdit.date || '');
            setComment(transactionToEdit.comment || '');
        }
    }, [transactionToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const transaction = {
            type,
            amount: parseFloat(amount),
            categoryId: categoryId.toString(),
            date,
            comment,
        };

        if (transactionToEdit) {
            dispatch(updateTransaction({ ...transaction, id: transactionToEdit.id }));
        } else {
            dispatch(addTransaction(transaction));
        }

        navigate('/dashboard');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full p-4 sm:p-6"
        >
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
                {transactionToEdit ? 'Редактировать транзакцию' : 'Добавить транзакцию'}
            </h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-indigo-400/30"
            >
                {/* Тип транзакции */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-indigo-200 mb-2">
                        Тип {type === 'income' ? ' (Доход)' : ' (Расход)'}
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-indigo-400/30 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                        <option value="expense">Расход</option>
                        <option value="income">Доход</option>
                    </select>
                </div>

                {/* Сумма */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-indigo-200 mb-2">Сумма (₽)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-indigo-400/30 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
                        required
                    />
                </div>

                {/* Категория */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-indigo-200 mb-2">Категория</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-indigo-400/30 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
                        required
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Дата */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-indigo-200 mb-2">Дата</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-indigo-400/30 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
                        required
                    />
                </div>

                {/* Комментарий */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-indigo-200 mb-2">Комментарий</label>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-indigo-400/30 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                </div>

                {/* Кнопки */}
                <div className="flex space-x-4">
                    <motion.button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-3 rounded-lg font-semibold hover:opacity-90 shadow-lg transition duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {transactionToEdit ? 'Сохранить изменения' : 'Добавить транзакцию'}
                    </motion.button>
                    <motion.button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="flex-1 bg-gradient-to-r from-gray-500 to-gray-700 text-white p-3 rounded-lg font-semibold hover:opacity-90 shadow-lg transition duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Отмена
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddTransactionForm;