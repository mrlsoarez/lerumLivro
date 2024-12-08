
const { server } = require('./server/server');
const { createTables } = require('./database/pg');


createTables();
server();
