const mongoose = require('mongoose');

module.exports = () => {
  const connectionString = 'mongodb://localhost:27017/validador';
  mongoose.connect(connectionString, {
    config: { autoIndex: true },
    useNewUrlParser: true,
  });

  const db = mongoose.connection;

  db.on('error', () => {
    throw new Error(`unable to connect to database at ${connectionString}`);
  });
};
