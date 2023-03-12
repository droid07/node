const express = require('express');
const dotenv = require('dotenv');
const { engine } = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

// FILES
const connectDB = require('./config/db');
const stories = require('./routes/stories');
const index = require('./routes/index');
const auth = require('./routes/auth');

// EXPRESS MIDDLEWARES
app.use(express.json());
app.use(express.static('public'));

// HANDLEBARS
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Sessions
app.use(
  session({
    secret: 'lisa',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use('/', index);
app.use('/auth', auth);
app.use('/api/stories', stories);

const PORT = process.env.PORT || 5000;
const start = () => {
  try {
    connectDB(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT} 🔥`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
