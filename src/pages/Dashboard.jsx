import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactions } from '../store/transactionsSlice';
import { fetchCategories } from '../store/categoriesSlice';
import AddTransactionForm from '../features/transactions/AddTransactionForm';
import TransactionList from '../features/transactions/TransactionList';
import Balance from '../features/transactions/Balance';

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">💼 Онлайн-кошелёк</h1>
            <Balance />
            <AddTransactionForm />
            <TransactionList />
        </div>
    );
};

export default Dashboard;
