const mongoose = require('mongoose');

const isDev = process.env.NODE_ENV !== 'production';
module.exports = () => {
  const connectionString = isDev ? 'mongodb://localhost:27017/validador' : 'mongodb://mongo:27017/validador';
  mongoose.connect(connectionString, {
    config: { autoIndex: true },
    useNewUrlParser: true,
  });

  const db = mongoose.connection;

  db.on('error', () => {
    throw new Error(`unable to connect to database at ${connectionString}`);
  });
};
