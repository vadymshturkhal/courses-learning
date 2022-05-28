'use strict';

const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const initAllRoutes = require('./routes');

const PORT = 3000;

const server = express();

const hbsEngine = handlebars.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

server.engine('hbs', hbsEngine.engine);
server.set('view engine', 'hbs');
server.set('views', 'views');
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.urlencoded({ extended: true }));

initAllRoutes(server);
server.listen(PORT, run);

function run() {
  console.log('Server is running...');
}
