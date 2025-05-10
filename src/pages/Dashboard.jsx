import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../store/transactionsSlice';
import { fetchCategories } from '../store/categoriesSlice';
import AddTransactionForm from '../features/transactions/AddTransactionForm';
import TransactionList from '../features/transactions/TransactionList';
import Balance from '../features/transactions/Balance';

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user); // Получаем текущего пользователя из стора
    const transactions = useSelector(state => state.transactions.items); // Транзакции из стора

    useEffect(() => {
        if (user) {
            dispatch(fetchTransactions(user.email)); // Загружаем транзакции пользователя
            dispatch(fetchCategories());
        }
    }, [dispatch, user]);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">💼 Онлайн-кошелёк</h1>
            <Balance />
            <AddTransactionForm />
            {/* Отображаем список транзакций */}
            <TransactionList transactions={transactions} />
        </div>
    );
};

export default Dashboard;
