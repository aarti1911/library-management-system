const Book = require('../models/Book');

// List all books (admin only)
exports.listBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books' });
    }
};

// Create a new book (admin only)
exports.createBook = async (req, res) => {
    const { title, author } = req.body;

    const newBook = new Book({
        title,
        author,
    });

    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book' });
    }
};

// Update a book (admin only)
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, available } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, available },
            { new: true }
        );
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error updating book' });
    }
};

// Delete a book (admin only)
exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        await Book.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book' });
    }
};

// Get assigned books for user
exports.getAssignedBooks = async (req, res) => {
    const userId = req.user.id; // Assuming req.user is populated from auth middleware

    try {
        const assignedBooks = await Book.find({ assignedTo: userId });
        res.status(200).json(assignedBooks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assigned books' });
    }
};

// Assign book to user
exports.assignBookToUser = async (req, res) => {
    const { bookId, userId } = req.body;

    try {
        await Book.findByIdAndUpdate(bookId, { assignedTo: userId });
        res.status(200).json({ message: 'Book assigned successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning book' });
    }
};

// Search for books by title
exports.searchBooks = async (req, res) => {
    const { query } = req.query; // Get the search query from the request

    try {
        // Use regex to search for books that contain the search query in the title
        const books = await Book.find({
            title: { $regex: query, $options: 'i' } // Case-insensitive search
        });

        res.status(200).json(books);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ message: 'Error searching books' });
    }
};
