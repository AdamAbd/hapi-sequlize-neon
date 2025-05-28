const Hapi = require('@hapi/hapi');
const initRoutes = require('./routes');
const db = require('./models');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  // Test database connection
  try {
    await db.sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }

  // Sync database models
  await db.sequelize.sync();

  // Initialize routes
  initRoutes(server);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();