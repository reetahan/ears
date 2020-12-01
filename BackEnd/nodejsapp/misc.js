let bcrypt = require("bcrypt");
const NUM_SALT_ROUNDS = 13;

module.exports = {
  handleMiscGet: async function (req, res) {
    switch (req.query.action) {
      case "hashPassword":
        await hashPasswordRequest(req, res);
        break;
      case "averageLinks":
        await getAvgNumLinks(req, res);
        break;
      case "averageEvents":
        await getAvgNumEvents(req, res);
        break;
      case "potentialNumFriends":
        await getPotentialNumFriends(req, res);
        break;
      default:
        res.send("Invalid Request!");
        break;
    }
  },
  exportedHashFunction: async function (plaintextPassword) {
    return await hashPassword(plaintextPassword);
  },
};

async function hashPasswordRequest(req, res) {
  global.log("Hashing password");
  let hashedPassword = await hashPassword(req.query.plaintextPassword);
  global.log("New hashed password: %s", hashedPassword);
  res.send(hashedPassword);
}

async function hashPassword(plaintextPassword) {
  return await bcrypt.hash(plaintextPassword, NUM_SALT_ROUNDS);
}

async function getAvgNumLinks(req, res) {
  let sql = `CALL AVERAGE_LINKS()`;
  try {
    let result = await global.connectionAsyncQuery(sql);
    res.send(result[0][0]);
  } catch (outerException) {
    global.log(
      "Avg Num Links/User Display Failed with error %s",
      outerException
    );
    res.send("Error in Average Links");
    return;
  }
}

async function getAvgNumEvents(req, res) {
  let sql = `CALL AVERAGE_EVENTS()`;
  try {
    let result = await global.connectionAsyncQuery(sql);
    res.send(result[0][0]);
  } catch (outerException) {
    global.log(
      "Avg Num Events/User Display Failed with error %s",
      outerException
    );
    res.send("Error in Average Events");
    return;
  }
}

async function getPotentialNumFriends(req, res) {
  if (!req.session.loggedin) {
    res.send("User Not Logged In");
    return;
  }
  let UserId = req.session.UserId;
  let sql = `CALL SHARED_CLASSES(?)`;
  try {
    let result = await global.connectionAsyncQuery(sql, [UserId]);
    res.send(result[0][0]);
  } catch (outerException) {
    global.log("potentialNumFriends Failed with error %s", outerException);
    res.send("Error in getting potential number of friends :(");
    return;
  }
}
