'use strict';

const express = require('express');
const app = express();
const { resolve } = require('path');
const db = require('./db/models');
const server = require('./server');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const session = require('express-session');
const flash = require('./server/middlewares/flash');

// configure template engine
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: process.env.NODE_ENV == 'development'
});
app.set('view engine', 'html');

// logging middleware
app.use(morgan('dev'));

// session middleware
let sessionConfig = {
  secret: 'mapa33secretcookie',
  cookie: {
    maxAge: 60000,
    secure: false
  }
};
app.use(session(sessionConfig));
app.use(flash());

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// prepend '/' to URIs
app.use('/api', server);
app.use('/admin', require('./server/admin'));

// serve static files from public
app.use(express.static(resolve(__dirname, 'public')));

// request any page and receive index.html
app.get('/*', (req, res) => res.sendFile(resolve(__dirname, 'public/index.html')));

if (process.env.NODE_ENV != 'test') {
  // server listening!
  const port = process.env.PORT || 3000;
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