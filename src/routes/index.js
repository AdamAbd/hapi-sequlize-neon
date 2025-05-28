const notesRoutes = require('./notes');

const initRoutes = (server) => {
  server.route([
    ...notesRoutes
  ]);
};

module.exports = initRoutes;