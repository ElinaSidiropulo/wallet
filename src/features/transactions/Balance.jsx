import React from 'react';
import { useSelector } from 'react-redux';

const Balance = () => {
    // Получаем все транзакции из Redux
    const transactions = useSelector((state) => state.transactions.items);

    // Логируем транзакции для отладки
    console.log("Транзакции:", transactions); // Здесь мы можем увидеть данные

    // Если transactions не загружены или пусты
    if (!transactions || transactions.length === 0) {
        return (
            <div className="text-lg mb-4">
                <strong>Баланс:</strong> 0.00 ₽
            </div>
        );
    }

    // Рассчитываем баланс
    const balance = transactions.reduce((acc, tx) =>
            tx.type === 'income'
                ? acc + Number(tx.amount)
                : acc - Number(tx.amount),
        0);

    return (
        <div className="text-lg mb-4">
            <strong>Баланс:</strong> {balance.toFixed(2)} ₽
        </div>
    );
};

export default Balance;
