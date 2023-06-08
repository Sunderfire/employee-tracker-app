const util = require("util")
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'ChickPeanut92',
        database: 'employee_db'
    },
    console.log(`Connected to the movies_db database`)
);

db.connect();
db.query = util.promisify(db.query);

module.exports= db