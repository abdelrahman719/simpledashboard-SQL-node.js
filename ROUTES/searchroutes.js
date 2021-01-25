const path = require('path');
const search = require('express').Router();
const mysql2 = require('mysql2');





const query =mysql2.createConnection({
  host: 'localhost',
  database: 'xyz',
  user: 'root',
  password: ''
})


module.exports=search