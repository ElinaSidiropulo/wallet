// src/features/transactions/TransactionList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTransaction } from '../../store/transactionsSlice';

const TransactionList = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions.items);
    const categories = useSelector(state => state.categories.items);

    // Сортировка по дате: новые сверху
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Получение названия категории по ID
    const getCategoryName = (categoryId) => {
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
            <h2 className="text-xl font-semibold mb-4">Последние транзакции</h2>

            {sortedTransactions.length === 0 ? (
                <p className="text-gray-500">Нет добавленных транзакций.</p>
            ) : (
                <ul className="space-y-2">
                    {sortedTransactions.map(tx => (
                        <li key={tx.id} className="p-4 border rounded bg-white shadow-sm">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-bold">
                                        {tx.type === 'income' ? '➕ Доход' : '➖ Расход'}: {tx.amount} ₽
                                    </p>
                                    <p className="text-sm text-gray-600">Категория: {getCategoryName(tx.category)}</p>
                                    {tx.comment && <p className="text-sm text-gray-500">Комментарий: {tx.comment}</p>}
                                </div>
                                <div className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</div>
                            </div>
                            <div className="flex justify-end mt-2">
                                <Link to={`/edit-transaction/${tx.id}`} className="text-blue-500">
                                    Редактировать
                                </Link>
                            </div>
                            <button
                                onClick={() => handleDelete(tx.id)}
                                className="text-red-500 hover:underline"
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionList;
