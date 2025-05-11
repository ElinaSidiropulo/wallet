// src/main.jsx
// Импорты основных библиотек React и ReactDOM для рендеринга приложения
import React from 'react';
import ReactDOM from 'react-dom/client';

// Импорт главного компонента приложения
import App from './App.jsx';

// Импорт стилей TailwindCSS
import './index.css';

// Импорт компонентов для работы с маршрутизацией и состоянием
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// Импорт Redux store
import { store } from './store/store.js';

// Рендеринг приложения
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* Обертка Provider для предоставления Redux store всем компонентам */}
        <Provider store={store}>
            {/* Обертка BrowserRouter для поддержки маршрутизации */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);