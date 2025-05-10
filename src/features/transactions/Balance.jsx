// src/features/transactions/Balance.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Balance = () => {
    const transactions = useSelector((state) => state.transactions.items);

    const balance = transactions.reduce((acc, tx) =>
            tx.type === 'income'
                ? acc + Number(tx.amount)
                : acc - Number(tx.amount),
        0
    );

    return (
        <div className="text-lg mb-4">
            <strong>Баланс:</strong> {balance.toFixed(2)} ₽
        </div>
    );
};

export default Balance;
