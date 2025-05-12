import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../store/transactionsSlice';
import { fetchCategories } from '../store/categoriesSlice';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Stats = () => {
    const dispatch = useDispatch();
    const { items: transactions = [] } = useSelector((state) => state.transactions);
    const { items: categories } = useSelector((state) => state.categories);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchCategories());
    }, [dispatch]);

    // Фильтрация по датам
    const filtered = transactions.filter((t) => {
        const date = new Date(t.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (
            (!start || date >= start) && (!end || date <= end)
        );
    });

    // Данные для круговой диаграммы
    const pieData = categories.map((cat) => {
        const totalExpenses = filtered
            .filter((t) => t.categoryId === cat.id && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        return { name: cat.name, value: totalExpenses, color: cat.color };
    }).filter((d) => d.value > 0);

    // Данные для столбчатой диаграммы
    const barData = categories.map((cat) => {
        const income = filtered
            .filter((t) => t.categoryId === cat.id && t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = filtered
            .filter((t) => t.categoryId === cat.id && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        return { name: cat.name, income, expense };
    }).filter((d) => d.income > 0 || d.expense > 0);

    // Данные для линейной диаграммы за последние 6 месяцев (только доходы)
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const incomePerMonth = Array.from({ length: 6 }, (_, i) => {
        const month = new Date(sixMonthsAgo.getFullYear(), sixMonthsAgo.getMonth() + i, 1);
        const label = month.toLocaleString('default', { month: 'short' });
        const total = transactions
            .filter((t) => {
                const date = new Date(t.date);
                return (
                    t.type === 'income' &&
                    date.getFullYear() === month.getFullYear() &&
                    date.getMonth() === month.getMonth()
                );
            })
            .reduce((sum, t) => sum + t.amount, 0);
        return { month: label, income: total };
    });


    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-3xl font-bold text-center mb-6">📊 Статистика</h1>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded" />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="text-xl font-semibold mb-4 text-center">Круговая диаграмма</h2>
                    {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={100} label>
                                    {pieData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color || '#8884d8'}/>
                                    ))}
                                </Pie>
                                <Tooltip/>
                                <Legend/>
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-center text-gray-500">Нет данных для отображения</p>
                    )}
                </div>

                <div className="bg-white p-4 shadow rounded">
                    <h2 className="text-xl font-semibold mb-4 text-center">Столбчатая диаграмма</h2>
                    {barData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="income" fill="#4CAF50" name="Доход"/>
                                <Bar dataKey="expense" fill="#F44336" name="Расход"/>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-center text-gray-500">Нет данных для отображения</p>
                    )}
                </div>
                <div className="bg-white p-4 shadow rounded md:col-span-2">
                    <h2 className="text-xl font-semibold mb-4 text-center">Линейная диаграмма доходов (последние 6
                        месяцев)</h2>
                    {incomePerMonth.some((d) => d.income > 0) ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={incomePerMonth}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="income" stroke="#4CAF50" strokeWidth={2} name="Доход" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>


                    ) : (
                        <p className="text-center text-gray-500">Нет данных за последние 6 месяцев</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stats;