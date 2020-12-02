module.exports = {
  handleCourseGETs: async function (req, res) {
    switch (req.query.action) {
      case "Display":
        await displayCourse(req, res);
        break;
      case "SearchByName":
        await searchByName(req, res);
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

async function displayCourse(req, res) {
  if (!req.session.loggedin) {
    res.send("User Not Logged In");
    return;
  }
  let UserId = req.session.UserId;
  let sqlToGetCourses = `CALL COURSE_DISPLAY(?)`;
  let sqlToGetCourseLinks = `CALL DISPLAY_LINKS_FOR_COURSE(?)`;
  try {
    let courses = await global.connectionAsyncQuery(sqlToGetCourses, [UserId]);
    courses = courses[0];
    let coursesWithLinks = await Promise.all(
      courses.map(async (course) => {
        let courseId = course.CourseId;
        try {
          let courseLinks = await global.connectionAsyncQuery(
            sqlToGetCourseLinks,
            [courseId]
          );
          courseLinks = courseLinks[0];
          global.log("Course Links: %O", courseLinks)
          course["links"] = courseLinks;
        } catch (innerException) {
          global.log("Exception getting links: %s", innerException);
        }
        return course;
      })
    );
    res.send(coursesWithLinks);
  } catch (outerException) {
    global.log("Course Display All Failed with error %s", outerException);
    res.send("Error in query");
    return;
  }
}

async function searchByName(req, res) {
  if (!req.session.loggedin) {
    res.send("User Not Logged In");
    return;
  }
  let UserId = req.session.UserId;
  let courseName = req.query.courseName;
  let sql = `CALL QUERY_COURSE_BY_NAME(?, ?)`;
  try {
    let coursesResponse = await global.connectionAsyncQuery(sql, [UserId, courseName]);
    res.send(coursesResponse[0][0]);
  } catch (outerException) {
    global.log("Course Search by name failed with error %s", outerException);
    res.send("Error in query");
    return;
  }
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
