const express = require('express');
const path = require('path');
const app = express();
const people = require('./routes/people');
const auth = require('./routes/auth');

app.use(express.static(path.join(__dirname, 'methods-public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/people', people);
app.use('/login', auth);

app.listen(5000, () => console.log('server running on port 5000 🔥'));
