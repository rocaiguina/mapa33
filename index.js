'use strict';

const express = require('express');
const app = express();
const { resolve } = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelizeSessionStore = require('connect-session-sequelize');
const db = require('./db/models');
const server = require('./src');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const session = require('express-session');
const passport = require('passport');
const flash = require('./src/middlewares/flash');
const land = require('./src/public/land');

// configure template engine
const nunjucksEnv = nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: process.env.NODE_ENV == 'development'
});

nunjucksEnv.addGlobal("MAPBOX_TOKEN", process.env.MAPBOX_TOKEN);

app.set('view engine', 'html');

// serve static files from public
app.use(express.static(resolve(__dirname, 'public')), express.static(resolve(__dirname, 'public/dist')));

// cors
app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3000',
    'http://mapa33-web.s3-website-us-east-1.amazonaws.com',
    'http://mapa-33.com',
    'https://mapa-33.com',
  ]
}));

// cookie parser
app.use(cookieParser());

// logging middleware
app.use(morgan('dev'));

// session middleware
var SequelizeStore = sequelizeSessionStore(session.Store);

let sessionConfig = {
  secret: 'mapa33secretcookie',
  store: new SequelizeStore({
    db: db.sequelize,
    proxy: true,
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000,
    secure: false
  }
};
app.use(session(sessionConfig));
app.use(flash());

// passport 
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));

// prepend '/' to URIs
app.use('/api', server);
app.use('/admin', require('./src/admin'));

if (process.env.NODE_ENV != 'test') {
  // server listening!
  const port = process.env.PORT || 5000;
  const dbName = process.env.DATABASE_NAME;
  app.listen(port, () => {
    console.log(chalk.cyan('Server is listening'), chalk.yellow(process.env.SERVER_URL || `http://localhost:${port}`));
    db.sequelize.sync({force: false})
    .then(() => {
      console.log(chalk.cyan('Database is running'), chalk.blue(process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`));
    })
    .catch(err => console.error(err));
  });
}

module.exports = app;