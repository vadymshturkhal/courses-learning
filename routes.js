'use strict';

const fs = require('fs');
const path = require('path');

const routesDirectory = path.join(__dirname, 'routes');

const initAllRoutes = (server) => {
  const files = fs.readdirSync(routesDirectory);
  files.forEach((file) => {
    const currentRoute = path.join(routesDirectory, file);
    const reqRoute = require(currentRoute);
    server.use(reqRoute);
  });
};

module.exports = initAllRoutes;
