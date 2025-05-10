import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import AddTransactionForm from './features/transactions/AddTransactionForm';
import EditTransactionPage from './pages/EditTransactionPage';

const App = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stats" element={isAuthenticated ? <Stats /> : <Login />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            {/* Маршруты для транзакций */}
            <Route path="/add-transaction" element={<AddTransactionForm />} />
            <Route path="/edit-transaction/:transactionId" element={<EditTransactionPage />} />
        </Routes>
    );
};

export default App;
