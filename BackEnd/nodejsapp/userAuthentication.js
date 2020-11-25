let bcrypt = require("bcrypt");
module.exports = {
  attemptLogin: function (req, res) {
    var username = req.body.username;
    global.log("Attempting to log in %s", username);
    var plaintextPassword = req.body.password;
    if (!username || !plaintextPassword) {
      res.send("Please enter a username and password!");
      return;
    }
    let sql = `CALL GET_ACCOUNT(?)`;
    global.connection.query(sql, [username], (error, results, fields) => {
      if (error) {
        res.send("Error: " + error.message);
        return;
      }
      let account = results[0][0];
      if (
        account === undefined ||
        !bcrypt.compareSync(plaintextPassword, account.HashedPassword)
      ) {
        global.log("Failed login with username %s", username);
        res.send("Incorrect Username and/or Password!");
      } else {
        global.log("Logged in with username %s", username);
        req.session.loggedin = true;
        req.session.username = username;
        req.session.FullName = account.FullName;
        req.session.UserId = account.UserId;
        res.send("OK!");
      }
      res.end();
    });
  },

  handleLogout: function (req, res) {
    global.log("Logging out username %s", req.session.username);
    req.session.destroy();
    res.redirect("back");
  },
};
