import React, { useEffect, useState } from 'react';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [editingBook, setEditingBook] = useState(null);

    // Fetch all books
    const fetchBooks = async () => {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Add or update book
    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookData = { title, author, year: parseInt(year) };
        const url = editingBook ? `/api/books/${editingBook.id}` : '/api/books';
        const method = editingBook ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData),
        });

        if (response.ok) {
            fetchBooks();
            setTitle('');
            setAuthor('');
            setYear('');
            setEditingBook(null);
        }
    };

    // Delete a book
    const handleDelete = async (id) => {
        const response = await fetch(`/api/books/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchBooks();
        }
    };

    // Edit book
    const handleEdit = (book) => {
        setEditingBook(book);
        setTitle(book.title);
        setAuthor(book.author);
        setYear(book.year.toString());
    };

    return (
        <div>
            <h1>Book List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <button type="submit">{editingBook ? 'Update' : 'Add'} Book</button>
            </form>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title} by {book.author} ({book.year})
                        <button onClick={() => handleEdit(book)}>Edit</button>
                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
