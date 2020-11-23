const {
  request
} = require('express');
const express = require('express')
const bodyParser = require("body-parser");
let mysql = require('mysql');
let config = require('../config.js');

const router = express.Router();
const app = express()
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function returnAllEvents(connection, res) {
  let sql = `CALL GET_EVENT_TABLE()`;

  connection.query(sql, [], (error, results, fields) => {
    if (error) {
      res.send(error.message);
    }
    res.send(results[0]);
  });
}

function returnQueriedEvent(connection, query, res) {
  let date = query.eventDate;
  let sql = `CALL GET_EVENT_BY_DATE(?)`
  connection.query(sql, [date], (error, results, fields) => {
    if (error) {
      res.send("Error: " + error.message);
    }
    res.send(results[0]);
  });
}

function deleteEvent(connection, body, res) {
  let name = body.eventName;
  let date = body.eventDate;
  let sql = `CALL DELETE_DEMO(?, ?)`
  connection.query(sql, [name, date], (error, results, fields) => {
    if (error) {
      res.send("Error: " + error.message);
    }
    res.send("Successfully Deleted");
  });
}

function insertEvent(connection, body, res) {
  let name = body.eventName;
  let userId = body.userId;
  let date = body.eventDate;
  let description = body.description;
  let sql = `CALL CREATE_DEMO(?, ?, ?, ?)`
  connection.query(sql, [name, userId, date, description], (error, results, fields) => {
    if (error) {
      res.send("Error: " + error.message);
    }
    //res.send(results);
    res.send("Successfully Inserted");
  });
}

function updateEvent(connection, body, res) {
  let name = body.eventName;
  let date = body.eventDate;
  let sql = `CALL UPDATE_DEMO(?, ?)`
  connection.query(sql, [name, date], (error, results, fields) => {
    if (error) {
      res.send("Error: " + error.message);
    }
    //res.send(results);
    res.send("Successfully Updated");
  });
}


app.get('/query', (req, res) => {
  let connection = mysql.createConnection(config);
  switch (req.query.action) {
    case "DA":
      returnAllEvents(connection, res);
      break;
    case "Search":
      returnQueriedEvent(connection, req.query, res);
      break;
    default:
      res.send("Invalid Query");
  }
  connection.end();
})

app.post('/query', (req, res) => {
  //res.send(req.body);
  let connection = mysql.createConnection(config);
  switch (req.body.action) {
    case "Delete":
      deleteEvent(connection, req.body, res);
      break;
    case "Insert":
      insertEvent(connection, req.body, res);
      break;
    case "Update":
      updateEvent(connection, req.body, res);
      break;
    default:
      res.send("Invalid Query");
  }
  connection.end();
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});