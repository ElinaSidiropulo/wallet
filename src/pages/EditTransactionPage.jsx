// src/pages/EditTransactionPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddTransactionForm from '../features/transactions/AddTransactionForm';
import { motion } from 'framer-motion';
import { FiEdit3 } from 'react-icons/fi';

const EditTransactionPage = () => {
    const { transactionId } = useParams();
    const transactions = useSelector(state => state.transactions.items);
    const transactionToEdit = transactions.find(txn => txn.id === transactionId);

    if (!transactionToEdit) {
        return (
            <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-8">
                <div className="text-white text-xl">Транзакция не найдена.</div>
            </div>
        );
    }

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
                    <FiEdit3 className="text-indigo-400 text-5xl drop-shadow-md" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-4xl sm:text-5xl font-bold mb-4 text-center"
                >
                    Редактирование
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-center mb-10"
                >
                    Измените данные вашей транзакции и сохраните изменения.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <AddTransactionForm transactionToEdit={transactionToEdit} />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default EditTransactionPage;
