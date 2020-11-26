module.exports = {
  handleEventGETs: async function (req, res) {
    switch (req.query.action) {
      case "Display":
        await displayEventsForUser(req, res);
        break;
      default:
        res.send("Invalid Query");
    }
  },
  handleEventPOSTs: async function (req, res) {
    switch (req.body.action) {
      case "Delete":
        await deleteEvent(req, res);
        break;
      case "Insert":
        await insertEvent(req, res);
        break;
      case "Update":
        await updateEvent(req, res);
        break;
      default:
        res.send("Invalid Query");
    }
  },
};

async function displayEventsForUser(req, res) {
  if (!req.session.loggedin) {
    res.send("User Not Logged In");
    return;
  }
  let UserId = req.session.UserId;
  let sql = `CALL EVENT_DISPLAY(?)`;
  try {
    let events = await global.connectionAsyncQuery(sql, [UserId]);
    res.send(events[0]);
  } catch (outerException) {
    global.log("Event Display All Failed with error %s", outerException);
    res.send("Error in Event Display");
    return;
  }
}

async function deleteEvent(req, res) {
  let eventId = req.body.eventId;
  let sql = `CALL EVENT_DELETE(?)`;
  try {
    await global.connectionAsyncQuery(sql, [eventId]);
    res.send("Successfully Deleted");
  } catch (e) {
    global.log("Event Delete Failed with error %s", e);
    res.send("Error in Event Delete");
  }
}

async function insertEvent(req, res) {
  let eventName = req.body.eventName;
  let userId = req.session.UserId;
  let date = req.body.date;
  let description = req.body.description;
  let courseId = req.body.courseId;
  let sql = `CALL EVENT_INSERT(?, ?, ?, ?, ?)`;
  try {
    await global.connectionAsyncQuery(sql, [
      eventName,
      userId,
      date,
      description,
      courseId,
    ]);
    res.send("Successfully Inserted");
  } catch (e) {
    global.log("Event Insert Failed with error %s", e);
    res.send("Error in Event Insertion");
  }
}

async function updateEvent(req, res) {
  let eventName = req.body.eventName;
  let date = req.body.date;
  let description = req.body.description;
  let eventId = req.body.eventId;
  let sql = `CALL EVENT_UPDATE(?, ?, ?, ?)`;
  try {
    await global.connectionAsyncQuery(sql, [
      eventName,
      date,
      description,
      eventId,
    ]);
    res.send("Successfully Updated");
  } catch (e) {
    global.log("Event Updated Failed with error %s", e);
    res.send("Error in Event Update");
  }
}
