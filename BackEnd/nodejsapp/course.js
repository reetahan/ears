module.exports = {
  handleCourseGETs: function (req, res) {
    switch (req.query.action) {
      case "Display":
        displayCourse(req, res);
        break;
      default:
        res.send("Invalid Query");
    }
  },
  handleCoursePOSTs: function (req, res) {
    switch (req.body.action) {
      case "Delete":
        deleteCourse(req, res);
        break;
      case "Insert":
        insertCourse(req, res);
        break;
      case "Update":
        updateCourse(req, res);
        break;
      default:
        res.send("Invalid Query");
    }
  },
};

function displayCourse(req, res) {
  let UserId = req.session.UserId;
  let sql = `CALL COURSE_DISPLAY(?)`;
  global.connection.query(sql, [UserId], (error, results, fields) => {
    if (error) {
      res.send("Error: " + error.message);
      return;
    }
    res.send(results[0]);
  });
}

function deleteCourse(req, res) {
  let courseId = req.body.courseId;
  let sql = `CALL COURSE_DELETE(?)`;
  global.connection.query(sql, [courseId], (error, results, fields) => {
    if (error) {
      res.send("Error: " + error.message);
      return;
    }
    res.send("Successfully Deleted");
  });
}

function insertCourse(req, res) {
  let courseName = req.body.courseName;
  let professor = req.body.professor;
  let meetingTime = req.body.meetingTime;
  let UserId = req.session.UserId;
  global.log("User ID: %d", UserId);
  let sql = `CALL COURSE_INSERT(?, ?, ?, ?)`;
  global.connection.query(
    sql,
    [courseName, professor, meetingTime, UserId],
    (error, results, fields) => {
      if (error) {
        res.send("Error: " + error.message);
        return;
      }
      res.send("Successfully Inserted");
    }
  );
}

function updateCourse(req, res) {
  let courseId = req.body.courseId;
  let courseName = req.body.courseName;
  let professor = req.body.professor;
  let meetingTime = req.body.meetingTime;

  let sql = `CALL COURSE_UPDATE(?, ?, ?, ?)`;
  global.connection.query(
    sql,
    [courseId, courseName, professor, meetingTime],
    (error, results, fields) => {
      if (error) {
        res.send("Error: " + error.message);
        return;
      }
      res.send("Successfully Updated");
    }
  );
}
