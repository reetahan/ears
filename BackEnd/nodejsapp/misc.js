let bcrypt = require("bcrypt");

module.exports = {
  handleMiscGet: async function (req, res) {
    if (req.query.action === "hashPassword") {
      global.log("Hashing password");
      let hashedPassword = await hashPassword(req.query.plaintextPassword);
      global.log("New hashed password: %s", hashedPassword);
      res.send(hashedPassword);
    }
  },
  exportedHashFunction: async function (plaintextPassword) {
    return await hashPassword(plaintextPassword);
  },
};

NUM_SALT_ROUNDS = 13;
async function hashPassword(plaintextPassword) {
  return await bcrypt.hash(plaintextPassword, NUM_SALT_ROUNDS);
}
