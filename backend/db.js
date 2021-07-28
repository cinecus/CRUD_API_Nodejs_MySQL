const mysql = require('mysql2/promise')



    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'crud_api',
      });



module.exports = db