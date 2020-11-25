module.exports = {
  handleDemoGet: function (req, res) {
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
  },

  handleDemoPost: function (req, res) {
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
  },
};

function returnAllEvents(res) {
  let sql = `CALL GET_EVENT_TABLE()`;

  global.connection.query(sql, [], (error, results, fields) => {
    if (error) {
      res.send(error.message);
      return;
    }
    res.send(results[0]);
  });
}

function returnQueriedEvent(query, res) {
  let date = query.eventDate;
  let sql = `CALL GET_EVENT_BY_DATE(?)`;
  global.connection.query(sql, [date], (error, results, fields) => {
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
  let sql = `CALL DELETE_DEMO(?, ?)`;
  global.connection.query(sql, [name, date], (error, results, fields) => {
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
  let sql = `CALL CREATE_DEMO(?, ?, ?, ?)`;
  global.connection.query(
    sql,
    [name, userId, date, description],
    (error, results, fields) => {
      if (error) {
        res.send("Error: " + error.message);
        return;
      }
      //res.send(results);
      res.send("Successfully Inserted");
    }
  );
}

function updateEvent(body, res) {
  let name = body.eventName;
  let date = body.eventDate;
  let sql = `CALL UPDATE_DEMO(?, ?)`;
  global.connection.query(sql, [name, date], (error, results, fields) => {
    if (error) {
      res.send("Error: " + error.message);
      return;
    }
    res.send("Successfully Updated");
  });
}
