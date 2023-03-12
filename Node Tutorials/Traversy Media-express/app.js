const express = require('express');
const app = express();
const members = require('./routes/members');
const PORT = process.env.PORT || 5000;

// EXPRESS MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// INIT ROUTER
app.use('/api/members', members);

// INIT STATIC
app.use(express.static('./public'));

app.listen(PORT, () => console.log(`server started on ${PORT}🔥`));
