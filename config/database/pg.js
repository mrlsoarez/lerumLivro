const { Pool } = require('pg')

/* personals connections */
const clients = new Pool({
  host: 'localhost',
  database: 'lerumlivro',
  user: 'postgres',
  password: 'root',
})

try {
    clients.connect()
} catch(err) {
    console.log(err)
}

async function createTables() {
    const query = `CREATE TABLE IF NOT EXISTS userdata (
        email VARCHAR(14) PRIMARY KEY,
        password VARCHAR(255)
    );
    
    CREATE TABLE IF NOT EXISTS library (
        title VARCHAR(50) PRIMARY KEY,
        author VARCHAR(50),
        pages INT
    );`;
    try {
        clients.query(query)
    } 
    catch(err) {
        console.log(err)
    }
}

async function updateTable(query, values) {
    try {
        const result = await clients.query(query, values);
        if (result.rowCount == 0) { return 400; }
        return 200;
    }
    catch(err) {
        console.log(err);
        return 400;
    }

}


module.exports = {createTables, updateTable }