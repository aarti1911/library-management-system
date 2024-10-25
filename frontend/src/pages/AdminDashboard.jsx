import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaSignOutAlt, FaBook, FaUser } from 'react-icons/fa';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newBook, setNewBook] = useState({ title: '', author: '' });
    const [selectedUser, setSelectedUser] = useState(null);
    const [assignedBookId, setAssignedBookId] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [returnedBookId, setReturnedBookId] = useState('');

    useEffect(() => {
        fetchBooks();
        fetchUsers();
    }, []);

    const fetchBooks = async (query = '') => {
        try {
            const endpoint = query 
                ? `http://localhost:5000/api/books/search?query=${query}` 
                : 'http://localhost:5000/api/books/listbook';

            const response = await axios.get(endpoint, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSearch = async () => {
        fetchBooks(searchQuery);
    };

    const handleCreateBook = async () => {
        try {
            await axios.post('http://localhost:5000/api/books', newBook, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setNewBook({ title: '', author: '' });
            fetchBooks();
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    const handleAssignBook = async () => {
        if (!selectedUser || !assignedBookId || !dueDate) {
            alert('Please select a user, a book, and a due date to assign.');
            return;
        }

        try {
            await axios.post(`http://localhost:5000/api/books/assign`, {
                userId: selectedUser._id,
                bookId: assignedBookId,
                dueDate: dueDate,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            alert('Book assigned successfully!');
            setAssignedBookId('');
            setDueDate('');
        } catch (error) {
            console.error('Error assigning book:', error);
        }
    };

    const handleReturnBook = async () => {
        if (!selectedUser || !returnedBookId) {
            alert('Please select a user and a book to return.');
            return;
        }

        try {
            const updatedReturnedBooks = JSON.parse(localStorage.getItem('returnedBooks')) || [];
            updatedReturnedBooks.push(returnedBookId);
            localStorage.setItem('returnedBooks', JSON.stringify(updatedReturnedBooks));

            alert('Book returned successfully!');
            setReturnedBookId('');
        } catch (error) {
            console.error('Error returning book:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    const filteredUsers = users.filter(user => user.role === 0);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
            <button onClick={handleLogout} className="mb-4 flex items-center text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                <FaSignOutAlt className="mr-2" /> Logout
            </button>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Books</h2>
                <div className="flex mb-4">
                    <input
                        type="text"
                        className="flex-1 border border-gray-300 p-2 rounded-l transition duration-300 focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Search Books"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition duration-300">
                        <FaSearch />
                    </button>
                </div>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
                <div className="flex mb-4">
                    <input
                        type="text"
                        className="flex-1 border border-gray-300 p-2 rounded-l transition duration-300 focus:outline-none focus:ring focus:ring-green-500"
                        placeholder="Title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    />
                    <input
                        type="text"
                        className="flex-1 border border-gray-300 p-2 rounded-l transition duration-300 focus:outline-none focus:ring focus:ring-green-500"
                        placeholder="Author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    />
                    <button onClick={handleCreateBook} className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600 transition duration-300">
                        <FaPlus />
                    </button>
                </div>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Books List</h2>
                <ul className="space-y-2">
                    {books.map((book) => (
                        <li key={book._id} className="flex justify-between items-center bg-white p-4 rounded shadow hover:shadow-md transition duration-300">
                            <div className="flex items-center">
                                <FaBook className="mr-2 text-gray-600" />
                                <span>{book.title} by {book.author}</span>
                            </div>
                            <button onClick={() => setReturnedBookId(book._id)} className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition duration-300">
                                Select for Return
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Users List</h2>
                <ul className="space-y-2">
                    {filteredUsers.map((user) => (
                        <li key={user._id} className="flex items-center bg-gray-100 p-3 rounded shadow hover:shadow-md transition duration-300">
                            <FaUser className="mr-2 text-gray-600" />
                            <input
                                type="radio"
                                name="user"
                                className="mr-2"
                                onChange={() => setSelectedUser(user)}
                            />
                            <span>{user.username}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Assign Book to User</h2>
                <div className="flex items-center mb-4">
                    <select
                        value={assignedBookId}
                        onChange={(e) => setAssignedBookId(e.target.value)}
                        className="flex-1 border border-gray-300 p-2 rounded-l transition duration-300 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Select a book</option>
                        {books.map((book) => (
                            <option key={book._id} value={book._id}>
                                {book.title}
                            </option>
                        ))}
                    </select>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border border-gray-300 p-2 rounded-l transition duration-300 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <button onClick={handleAssignBook} className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-300">
                        Assign Book
                    </button>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Return Book</h2>
                <button onClick={handleReturnBook} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300">
                    Return Book
                </button>
            </section>
        </div>
    );
};

export default AdminDashboard;
