//routes.js
//this is our simple Nodejs server

//require('dotenv').config(); //instatiate environment variables

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  //connectionLimit : CONFIG.db_connectionlimit,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ReactDb'
});

// Starting our app.
const app = express();

app.post('/newUser', function (req, res) {
  //console.log(req.body.username);           //!!!! This is the line that causes the error!!!
  console.log("at post");

  // Connecting to the database.
  connection.getConnection(function (err, connection) {

  // Checking for errors.
  if(err) throw err;
  console.log("Connected!");

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query("INSERT INTO users (username) values('Mike')", function (error, results, fields) {
    //connection.query("INSERT INTO users (username) values(req.body.username)", function (error, results, fields) {

      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results));
    });
  });
});


// Creating a GET route that returns data from the 'users' table.
app.get('/users', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM users', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/users so you can see the data.');
});
