const {
  request
} = require('express');
let config = require('../../../config.js');
const express = require('express')
const bodyParser = require("body-parser");
let mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

const router = express.Router();
const app = express()
const port = 3000;

var connection = mysql.createConnection(config);
var sessionStore = new MySQLStore(
  {  
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true
  }, connection);

app.use(session({
  key: 'session_cookie_key',
  secret: 'eArsApP',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function handleAuthenticate(req, res) {
  const loginFailureText = 'Error: Login Failed';
  var username = req.body.username;
  var password = req.body.password;
  if (!username || !password) {
    res.send('Please enter a username and password!');
    return;
  }
  let sql = `CALL GET_ACCOUNT(?, ?)`;
  connection.query(sql, [username, password], (error, results, fields) => {
    if (error) {
      res.send("Error: " + error.message);
      return;
    }
    if (results[0].length > 0) {
      req.session.loggeDin = true;
      req.session.username = username;
      req.session.FullName = results[0][0].FullName;
      req.session.UserId = results[0][0].UserId;
      res.send("OK!");
    } else {
      response.send('Incorrect Username and/or Password!');
    }
    res.end();
  });
}

function handleDemoGet(req, res) {
  console.log('hello');
  switch (req.query.action) {
    case "DA":
      returnAllEvents(res);
      break;
    case "Search":
      returnQueriedEvent(req.query, res);
      break;
    case "Test":
      res.send("Welcome back, " + req.session.FullName);
      break;
    default:
      res.send("Invalid Query");
  }
}

function handleDemoPost(req, res) {
  switch (req.body.action) {
    case "Delete":
      deleteEvent(req.body, res);
      break;
    case "Insert":
      insertEvent(req.body, res);
      break;
    case "Update":
      updateEvent(req.body, res);
      break;
    default:
      res.send("Invalid Query");
  }
}

function returnAllEvents(res) {
  let sql = `CALL GET_EVENT_TABLE()`;

  connection.query(sql, [], (error, results, fields) => {
    if (error) {
      res.send(error.message);
      return;
    }
    res.send(results[0]);
  });
}

function returnQueriedEvent(query, res) {
  let date = query.eventDate;
  let sql = `CALL GET_EVENT_BY_DATE(?)`
  connection.query(sql, [date], (error, results, fields) => {
    if (error) {
      res.send("Error: " + error.message);
      return;
    }
    res.send(results[0]);
  });
}

function deleteEvent(body, res) {
  let name = body.eventName;
  let date = body.eventDate;
  let sql = `CALL DELETE_DEMO(?, ?)`
  connection.query(sql, [name, date], (error, results, fields) => {
    if (error) {
      res.send("Error: " + error.message);
      return;
    }
    res.send("Successfully Deleted");
  });
}

function insertEvent(body, res) {
  let name = body.eventName;
  let userId = body.userId;
  let date = body.eventDate;
  let description = body.description;
  let sql = `CALL CREATE_DEMO(?, ?, ?, ?)`
  connection.query(sql, [name, userId, date, description], (error, results, fields) => {
    if (error) {
      res.send("Error: " + error.message);
      return;
    }
    //res.send(results);
    res.send("Successfully Inserted");
  });
}

function updateEvent(body, res) {
  let name = body.eventName;
  let date = body.eventDate;
  let sql = `CALL UPDATE_DEMO(?, ?)`
  connection.query(sql, [name, date], (error, results, fields) => {
    if (error) {
      res.send("Error: " + error.message);
      return;
    }
    //res.send(results);
    res.send("Successfully Updated");
  });
}


app.get('/api', (req, res) => {
  switch (req.query.apiType) {
    case "Demo":
      handleDemoGet(req, res);
      break;
    default:
      res.send("Invalid GET Request");
  }
})

app.post('/api', (req, res) => {
  switch (req.body.apiType) {
    case "Demo":
      handleDemoPost(req, res);
      break;
    case "Login":
      handleAuthenticate(req, res);
      break;
    default:
      res.send("Invalid POST Request");
  }
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});