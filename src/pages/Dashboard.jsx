import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { fetchTransactions } from '../store/transactionsSlice';
import { fetchCategories } from '../store/categoriesSlice';
import { logoutUser } from '../store/userSlice';
import AddTransactionForm from '../features/transactions/AddTransactionForm';
import TransactionList from '../features/transactions/TransactionList';
import Balance from '../features/transactions/Balance';
import { Link } from 'react-router-dom'; // Импортируем Link для ссылок

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Получаем navigate
    const user = useSelector(state => state.user.user);
    const transactions = useSelector(state => state.transactions.transactions);

    useEffect(() => {
        if (user) {
            dispatch(fetchTransactions(user.email));
            dispatch(fetchCategories(user.email)); // ✅ добавили email
        }
    }, [dispatch, user]);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login'); // Перенаправляем на страницу входа
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">💼 Онлайн-кошелёк</h1>
                <button
                    onClick={handleLogout} // Используем обработчик
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Выйти
                </button>
            </div>
            <div className="mb-4">
                <Link
                    to="/settings" // Ссылка на страницу настроек
                    className="text-blue-500 hover:underline mr-4"
                >
                    Настройки
                </Link>
                <Link
                    to="/stats" // Ссылка на страницу статистики
                    className="text-blue-500 hover:underline"
                >
                    Статистика
                </Link>
            </div>
            <Balance />
            <AddTransactionForm />
            <TransactionList transactions={transactions} />
        </div>
    );
};

export default Dashboard;
