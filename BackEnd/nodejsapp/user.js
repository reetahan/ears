let passwordHasher = require("./misc.js").exportedHashFunction;

module.exports = {
  handleUserGETs: async function (req, res) {
    switch (req.query.action) {
      case "Display":
        await displayUser(req, res);
        break;
      default:
        res.send("Invalid Query");
    }
  },
  handleUserPOSTs: async function (req, res) {
    switch (req.body.action) {
      case "Delete":
        await deleteUser(req, res);
        break;
      case "Insert":
        await insertUser(req, res);
        break;
      case "Update":
        await updateUser(req, res);
        break;
      default:
        res.send("Invalid Query");
    }
  },
};

async function displayUser(req, res) {
  if (!req.session.loggedin) {
    res.send("User Not Logged In");
    return;
  }
  let UserId = req.session.UserId;
  let sql = `CALL USER_DISPLAY(?)`;
  try {
    let users = await global.connectionAsyncQuery(sql, [UserId]);
    res.send(users[0]);
  } catch (outerException) {
    global.log("User Display All Failed with error %s", outerException);
    res.send("Error in User Display");
    return;
  }
}

async function deleteUser(req, res) {
  if (!req.session.loggedin) {
    res.send("User Not Logged In");
    return;
  }
  let UserId = req.session.UserId;
  let sql = `CALL USER_DELETE(?)`;
  try {
    await global.connectionAsyncQuery(sql, [UserId]);
    req.session.destroy();
    res.send("Successfully Deleted");
  } catch (e) {
    global.log("User Delete Failed with error %s", e);
    res.send("Error in User Delete");
  }
}

async function insertUser(req, res) {
  let fullName = req.body.fullName;
  let userName = req.body.userName;
  let plaintextPassword = req.body.plaintextPassword;

  let hashedPassword = await passwordHasher(plaintextPassword);
  let sql = `CALL USER_INSERT(?, ?, ?)`;
  try {
    await global.connectionAsyncQuery(sql, [
      fullName,
      userName,
      hashedPassword,
    ]);
    res.send("Successfully Inserted");
  } catch (e) {
    global.log("User Insert Failed with error %s", e);
    res.send("Error in User Insertion");
  }
}

async function updateUser(req, res) {
  if (!req.session.loggedin) {
    res.send("User Not Logged In");
    return;
  }
  let UserId = req.session.UserId;
  let userName = req.body.newUserName;
  let fullName = req.body.newFullName;
  let plaintextPassword = req.body.newPlaintextPassword;

  let hashedPassword = await passwordHasher(plaintextPassword);
  let sql = `CALL USER_UPDATE(?, ?, ?, ?)`;
  try {
    await global.connectionAsyncQuery(sql, [
      UserId,
      userName,
      fullName,
      hashedPassword,
    ]);
    res.send("Successfully Updated");
  } catch (e) {
    global.log("User Updated Failed with error %s", e);
    res.send("Error in User Update");
  }
}
