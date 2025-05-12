// utils/createDefaultCategories.js
export const createDefaultCategories = async (userEmail) => {
    const defaultCategories = [
        {
            name: "Продукты",
            icon: "🛒",
            color: "#4CAF50",
            userEmail
        },
        {
            name: "Транспорт",
            icon: "🚌",
            color: "#2196F3",
            userEmail
        },
        {
            name: "Развлечения",
            icon: "🎮",
            color: "#FF9800",
            userEmail
        }
    ];

    for (const category of defaultCategories) {
        await fetch('http://localhost:5001/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...category, id: crypto.randomUUID() })
        });
    }
};
