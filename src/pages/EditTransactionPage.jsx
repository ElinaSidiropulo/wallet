// src/pages/EditTransactionPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import AddTransactionForm from '../features/transactions/AddTransactionForm';
import { useSelector } from 'react-redux';

const EditTransactionPage = () => {
    const { transactionId } = useParams(); // Получаем ID транзакции из URL
    const transactions = useSelector(state => state.transactions.items);

    // Находим транзакцию для редактирования
    const transactionToEdit = transactions.find(txn => txn.id === transactionId);

    if (!transactionToEdit) {
        return <div>Транзакция не найдена.</div>;
    }

    return (
        <div>
            <h1>Редактировать транзакцию</h1>
            <AddTransactionForm transactionToEdit={transactionToEdit} />
        </div>
    );
};

export default EditTransactionPage;
