import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function BudgetTracker({ trip }) {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ category: "", amount: "", description: "" });
    const [showAddForm, setShowAddForm] = useState(false);

    // Load expenses from localStorage
    useEffect(() => {
        const savedExpenses = localStorage.getItem(`expenses_${trip?.id}`);
        if (savedExpenses) {
            setExpenses(JSON.parse(savedExpenses));
        }
    }, [trip?.id]);

    // Save expenses to localStorage
    useEffect(() => {
        if (trip?.id && expenses.length > 0) {
            localStorage.setItem(`expenses_${trip?.id}`, JSON.stringify(expenses));
        }
    }, [expenses, trip?.id]);

    const addExpense = () => {
        if (newExpense.category && newExpense.amount) {
            const expense = {
                id: Date.now(),
                ...newExpense,
                amount: parseFloat(newExpense.amount),
                date: new Date().toLocaleDateString()
            };
            setExpenses([...expenses, expense]);
            setNewExpense({ category: "", amount: "", description: "" });
            setShowAddForm(false);
        }
    };

    const removeExpense = (id) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    };

    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Extract budget from trip data
    const estimatedBudget = trip?.tripData?.estimated_budget?.total ||
        trip?.tripData?.budget ||
        "Not specified";

    const categories = ["Accommodation", "Food", "Transportation", "Activities", "Shopping", "Other"];
    const categoryIcons = {
        "Accommodation": "🏨",
        "Food": "🍽️",
        "Transportation": "🚗",
        "Activities": "🎯",
        "Shopping": "🛍️",
        "Other": "💰"
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-[#364F6B]">💰 Budget Tracker</h3>
                <Button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-[#3FC1C9] hover:bg-[#FC5185]"
                >
                    {showAddForm ? "Cancel" : "Add Expense"}
                </Button>
            </div>

            {/* Budget Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-800">Estimated Budget</h4>
                    <p className="text-2xl font-bold text-blue-600">{estimatedBudget}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-red-800">Total Spent</h4>
                    <p className="text-2xl font-bold text-red-600">${totalSpent.toFixed(2)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-green-800">Remaining</h4>
                    <p className="text-2xl font-bold text-green-600">
                        {typeof estimatedBudget === 'string' ? "N/A" : `$${(parseFloat(estimatedBudget.replace(/[^0-9.-]+/g, "")) - totalSpent).toFixed(2)}`}
                    </p>
                </div>
            </div>

            {/* Add Expense Form */}
            {showAddForm && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-3">Add New Expense</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <select
                            value={newExpense.category}
                            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                            className="border rounded-lg p-2"
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{categoryIcons[cat]} {cat}</option>
                            ))}
                        </select>
                        <Input
                            type="number"
                            placeholder="Amount"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        />
                        <Input
                            placeholder="Description (optional)"
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        />
                        <Button onClick={addExpense} className="bg-green-500 hover:bg-green-600">
                            Add
                        </Button>
                    </div>
                </div>
            )}

            {/* Expenses List */}
            <div className="space-y-3">
                {expenses.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No expenses recorded yet</p>
                ) : (
                    expenses.map(expense => (
                        <div key={expense.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{categoryIcons[expense.category]}</span>
                                <div>
                                    <p className="font-medium">{expense.category}</p>
                                    {expense.description && <p className="text-sm text-gray-600">{expense.description}</p>}
                                    <p className="text-xs text-gray-500">{expense.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-lg">${expense.amount.toFixed(2)}</span>
                                <Button
                                    onClick={() => removeExpense(expense.id)}
                                    variant="destructive"
                                    size="sm"
                                >
                                    ✕
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default BudgetTracker;