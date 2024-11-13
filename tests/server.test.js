const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

// Sementara data "in-memory" (karena kita tidak menggunakan database)
let books = [
    { id: 1, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
];

// Tambahkan endpoint testing untuk Express
app.get('/api/books', (req, res) => res.json(books));

describe('GET /api/books', () => {
    it('should return list of books', async () => {
        const response = await request(app).get('/api/books');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(books);
    });
});
