var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '88105472',
      database : 'api_users'
    }
  });

module.exports = knex