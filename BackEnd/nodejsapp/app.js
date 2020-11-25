const { request } = require("express");
let config = require("../config.js");
const express = require("express");
const bodyParser = require("body-parser");
let mysql = require("mysql");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
let winston = require("winston");
let bcrypt = require("bcrypt");
let demo = require("./demo.js");
let misc = require("./misc.js");
let course = require("./course.js");
let auth = require("./userAuthentication.js");

let logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf((info) => {
      if (typeof info.message === "string") {
        return `[${info.timestamp}] ${info.level}: ${info.message}`;
      }
      return (
        `[${info.timestamp}] ${info.level}: ` + JSON.stringify(info.message)
      );
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "/home/earsapp411/logs/EARSNodeApp.log",
    }),
  ],
});
global.log = (...args) => logger.log("debug", ...args);

const router = express.Router();
const app = express();
const port = 3000;

global.connection = mysql.createConnection(config);

var sessionStore = new MySQLStore(
  {
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true,
  },
  global.connection
);

app.use(
  session({
    key: "session_cookie_key",
    secret: "eArsApP",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", async (req, res) => {
  global.log("GET Request");
  switch (req.query.apiType) {
    case "Demo":
      demo.handleDemoGet(req, res);
      break;
    case "Course":
      course.handleCourseGETs(req, res);
      break;
    case "Misc":
      await misc.handleMiscGet(req, res);
      break;
    default:
      global.log("Invalid GET, original request: %O", req.query);
      res.send("Invalid GET Request");
  }
});

app.post("/api", async (req, res) => {
  global.log("POST Request");
  switch (req.body.apiType) {
    case "Demo":
      demo.handleDemoPost(req, res);
      break;
    case "Login":
      auth.attemptLogin(req, res);
      break;
    case "Logout":
      auth.handleLogout(req, res);
      break;
    case "Course":
      course.handleCoursePOSTs(req, res);
      break;
    default:
      res.send("Invalid POST Request");
  }
});

app.listen(port, () => {
  global.log(`Server running at http://localhost:${port}/`);
});
