const routes = require('next-routes');

module.exports = routes()
  .add('novo', '/novo')
  .add('index', '/')
  .add('editar', '/editar/:_id');
