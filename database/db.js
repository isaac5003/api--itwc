// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');

// Create a connection pool
var pool =
    mariadb.createPool({
        host: '50.21.186.216',
        port: 3306,
        user: 'itwcprueba1',
        password: 'H3SFiHWHdjY6msDV',
        database: 'schema_prueba_1'
    });

// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
    pool: pool
});