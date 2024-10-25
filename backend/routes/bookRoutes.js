const express = require('express');
const { 
    listBooks, 
    createBook, 
    updateBook, 
    deleteBook, 
    getAssignedBooks, 
    assignBookToUser,
    searchBooks  // Import the search function
} = require('../controller/bookController');
const { verifyToken } = require('../middleware/authMiddleware'); // Assuming you have a middleware to verify JWT
const router = express.Router();

// Admin routes
router.get('/listbook', verifyToken, listBooks); // List all books
router.post('/', verifyToken, createBook); // Create a new book
router.put('/:id', verifyToken, updateBook); // Update a book
router.delete('/:id', verifyToken, deleteBook); // Delete a book

// User routes
router.get('/assigned', verifyToken, getAssignedBooks); // Get assigned books for user
router.post('/assign', verifyToken, assignBookToUser); // Assign book to user

// Search route
router.get('/search', verifyToken, searchBooks); // Search books by title

module.exports = router;
