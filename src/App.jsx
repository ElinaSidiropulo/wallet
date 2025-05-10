import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return (
        <Routes>  {/* Router is already handled in index.js, so no need for <Router> here */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/*<Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login />} />*/}
            <Route path="/stats" element={isAuthenticated ? <Stats /> : <Login />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
    );
};

export default App;
