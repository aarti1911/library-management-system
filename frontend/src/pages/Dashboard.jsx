import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const [assignedBooks, setAssignedBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAssignedBooks();
    }, []);

    const fetchAssignedBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/books/assigned', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setAssignedBooks(response.data);
        } catch (error) {
            console.error("Error fetching assigned books:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">User Dashboard</h1>
            <button
                onClick={handleLogout}
                className="mb-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
                Logout
            </button>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Assigned Books</h2>
            <ul className="w-full max-w-md bg-white shadow-md rounded-lg p-4 space-y-3">
                {assignedBooks.length > 0 ? (
                    assignedBooks.map((book) => (
                        <li key={book._id} className="flex items-center justify-between p-3 border-b border-gray-200">
                            <div>
                                <p className="text-lg font-medium text-gray-800">{book.title}</p>
                                <p className="text-gray-600">by {book.author}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No assigned books yet.</p>
                )}
            </ul>
        </div>
    );
};

export default UserDashboard;
