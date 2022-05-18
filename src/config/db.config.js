const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    database: "capstone2",
    user: "root",
    password: "08171448869Ab."
})

connection.connect((err)=>{
    if (err) throw err
    console.log ("Database Connected Successfully");

});

module.exports = connection;
