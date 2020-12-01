const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
let MongoClient = require("mongodb").MongoClient;
const mongoUrl = require("../config.js").mongoUrl;

module.exports = {
  handleRecommendationsGETs: async function (req, res) {
    await setCollection();
    switch (req.query.action) {
      case "Display":
        await displayRecommendationsForUser(req, res);
        break;
      default:
        res.send("Invalid Query");
    }
  },
  handleRecommendationsPOSTs: async function (req, res) {
    await setCollection();
    switch (req.body.action) {
      case "Generate":
        await generateRecommendations(req, res);
        break;
      default:
        res.send("Invalid Query");
    }
  },
};

let mongoConnection = MongoClient.connect(mongoUrl, {
  useUnifiedTopology: true,
});

async function displayRecommendationsForUser(req, res) {
  if (!req.session.loggedin) {
    res.send("User Not Logged In");
    return;
  }
  let UserId = req.session.UserId;
  let query = { user_id: UserId.toString() };
  let options = { projection: { _id: 0, input: 1, recommendations: 1 } };
  res.send(
    await global.recommendationsCollection.find(query, options).toArray()
  );
}

async function generateRecommendations(req, res) {
  if (!req.session.loggedin) {
    res.send("User Not Logged In");
    return;
  }
  let UserId = req.session.UserId;
  let interestedClassesRaw = req.body.input;
  if (interestedClassesRaw === undefined || interestedClassesRaw.length === 0) {
    res.send("No interested classes specified.");
    return;
  }
  let inputClasses = req.body.input.split(",").filter((x) => x);
  res.send("OK!");
  global.log("Generating Recommendations for UserID %d", UserId);
  try {
    const { stdout, stderr } = await execFile(
      "python",
      ["../ears/Recommendations/rec.py", UserId].concat(inputClasses)
    );

    global.log(
      "Generated Recommendations with stdout: %s, stderr: %s",
      stdout,
      stderr
    );
  } catch (e) {
    global.log(
      "Error in Generating Recommendations for UserId %d: %s",
      UserId,
      e
    );
  }
}

async function setCollection() {
  mongoConnection = await mongoConnection;
  global.recommendationsCollection = mongoConnection
    .db("EARS_MONGO")
    .collection("Recommendations");
}
