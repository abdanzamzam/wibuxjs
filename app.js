const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Hello Express
app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// Data buku disimpan di array (tanpa database)
let books = [
  { id: 1, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
];
let nextId = 3;


// Route API untuk operasi CRUD pada buku
app.get('/api/books', (req, res) => res.json(books));

app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;
  const newBook = { id: nextId++, title, author, year };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  const book = books.find((b) => b.id === parseInt(id));
  
  if (!book) return res.status(404).json({ error: 'Book not found' });
  
  book.title = title;
  book.author = author;
  book.year = year;
  res.json(book);
});

app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((b) => b.id === parseInt(id));
  
  if (bookIndex === -1) return res.status(404).json({ error: 'Book not found' });
  
  books.splice(bookIndex, 1);
  res.status(204).end();
});

// Serve static files dari React (production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build', 'index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
