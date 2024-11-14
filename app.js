const express = require('express');
const app = express();
const path = require('path');
const { createEngine } = require('./zug');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', createEngine());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('App', { initialPath: '/', initialData: { title: "Home Page" } });
});

app.get('/about', (req, res) => {
  res.render('App', { initialPath: '/about', initialData: { title: "About Page" } });
});

app.get('/contact', (req, res) => {
  res.render('App', { initialPath: '/contact', initialData: { title: "Contact Page" } });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
