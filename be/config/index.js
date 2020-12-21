const privateRoutes = require('../app/routes/private');

const config = {
      migrate: false,
      privateRoutes,
      port: process.env.PORT || '9099',
};

module.exports = config;
