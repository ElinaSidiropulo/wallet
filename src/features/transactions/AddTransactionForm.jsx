// src/features/transactions/AddTransactionForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '/src/store/transactionsSlice.js';
import { nanoid } from '@reduxjs/toolkit';

const AddTransactionForm = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.items);

    const [type, setType] = useState('income');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amount || !category || !date) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        const newTransaction = {
            id: nanoid(),
            type,
            amount: parseFloat(amount),
            category,
            date,
            comment,
        };

        dispatch(addTransaction(newTransaction));

        // очистка формы
        setType('income');
        setAmount('');
        setCategory('');
        setDate('');
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-md space-y-4 bg-gray-50">
            <div>
                <label className="block mb-1 font-semibold">Тип</label>
                <select value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border rounded">
                    <option value="income">Доход</option>
                    <option value="expense">Расход</option>
                </select>
            </div>

            <div>
                <label className="block mb-1 font-semibold">Сумма</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2 border rounded" />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Категория</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border rounded">
                    <option value="">-- Выберите --</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-1 font-semibold">Дата</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded" />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Комментарий (необязательно)</label>
                <input type="text" value={comment} onChange={e => setComment(e.target.value)} className="w-full p-2 border rounded" />
            </div>

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Добавить транзакцию
            </button>
        </form>
    );
};

export default AddTransactionForm;
