const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

module.exports = {
  handleRecommendationsGETs: async function (req, res) {
    switch (req.query.action) {
      case "Display":
        await displayRecommendationsForUser(req, res);
        break;
      default:
        res.send("Invalid Query");
    }
  },
  handleRecommendationsPOSTs: async function (req, res) {
    switch (req.body.action) {
      case "Generate":
        await generateRecommendations(req, res);
        break;
      default:
        res.send("Invalid Query");
    }
  },
};

async function displayRecommendationsForUser(req, res) {
  if (!req.session.loggedin) {
    res.send("User Not Logged In");
    return;
  }
  let UserId = req.session.UserId;
  let query = { user_id: UserId };
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
  let inputClasses = req.body.input.split(",").filter(x => x);
  await execFile('python', ['rec.py'].concat(inputClasses));
  global.log("Generating Recommendations for UserID %d", UserId);
  res.send("OK!");
}
