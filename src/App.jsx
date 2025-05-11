import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import AddTransactionForm from './features/transactions/AddTransactionForm';
import EditTransactionPage from './pages/EditTransactionPage';
import { fetchTransactions } from './store/transactionsSlice';

const App = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchTransactions()); // Загружаем транзакции при аутентификации
        }
    }, [isAuthenticated, dispatch]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Routes>
                {/* Корневой маршрут: перенаправление в зависимости от аутентификации */}
                <Route
                    path="/"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
                />

                {/* Публичные маршруты */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Защищенные маршруты через ProtectedRoute */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/stats"
                    element={
                        <ProtectedRoute>
                            <Stats />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />

                {/* Маршруты для транзакций */}
                <Route
                    path="/add-transaction"
                    element={
                        <ProtectedRoute>
                            <AddTransactionForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit-transaction/:transactionId"
                    element={
                        <ProtectedRoute>
                            <EditTransactionPage />
                        </ProtectedRoute>
                    }
                />

                {/* Обработка неизвестных маршрутов */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default App;
