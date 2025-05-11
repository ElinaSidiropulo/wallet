// src/features/transactions/AddTransactionForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTransaction, updateTransaction } from '../../store/transactionsSlice';
import { fetchCategories } from '../../store/categoriesSlice';

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
            categoryId: categoryId.toString(), // Преобразуем в строку
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
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">
                {transactionToEdit ? 'Редактировать транзакцию' : 'Добавить транзакцию'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Тип</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="mt-1 p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="expense">Расход</option>
                        <option value="income">Доход</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Сумма</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Категория</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="mt-1 p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500"
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
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Дата</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Комментарий</label>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mt-1 p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                    {transactionToEdit ? 'Сохранить изменения' : 'Добавить транзакцию'}
                </button>
            </form>
        </div>
    );
};

export default AddTransactionForm;
