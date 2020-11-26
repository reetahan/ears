module.exports = {
  handleCourseLinkGETs: async function (req, res) {
    switch (req.query.action) {
      case "Display":
        await displayCourseLinksForUser(req, res);
        break;
      default:
        res.send("Invalid Query");
    }
  },
  handleCourseLinkPOSTs: async function (req, res) {
    switch (req.body.action) {
      case "Delete":
        await deleteCourseLinks(req, res);
        break;
      case "Insert":
        await insertCourseLinks(req, res);
        break;
      case "Update":
        await updateCourseLinks(req, res);
        break;
      default:
        res.send("Invalid Query");
    }
  },
};

async function displayCourseLinksForUser(req, res) {
  if (!req.session.loggedin) {
    res.send("User Not Logged In");
    return;
  }
  let UserId = req.session.UserId;
  let sql = `CALL COURSELINK_DISPLAY(?)`;
  try {
    let courseLinks = await global.connectionAsyncQuery(sql, [
      UserId,
    ]);
    res.send(courseLinks[0]);
  } catch (outerException) {
    global.log("CourseLink Display All Failed with error %s", outerException);
    res.send("Error in CourseLink Display");
    return;
  }
}

async function deleteCourseLinks(req, res) {
  let courseId = req.body.courseId;
  let link = req.body.link;
  let tag = req.body.tag;
  let sql = `CALL DELETE_COURSELINK(?, ?, ?)`;
  try {
    await global.connectionAsyncQuery(sql, [courseId, link, tag]);
    res.send("Successfully Deleted");
  } catch (e) {
    global.log("CourseLink Delete Failed with error %s", e);
    res.send("Error in CourseLink Delete");
  }
}

async function insertCourseLinks(req, res) {
  let courseId = req.body.courseId;
  let link = req.body.link;
  let tag = req.body.tag;
  let sql = `CALL COURSELINK_INSERT(?, ?, ?)`;
  try {
    await global.connectionAsyncQuery(sql, [courseId, link, tag]);
    res.send("Successfully Inserted");
  } catch (e) {
    global.log("CourseLink Inserted Failed with error %s", e);
    res.send("Error in CourseLink Insertion");
  }
}

async function updateCourseLinks(req, res) {
  let courseId = req.body.courseId;
  let link = req.body.link;
  let tag = req.body.tag;
  let newLink = req.body.newLink;
  let newTag = req.body.newTag;
  let sql = `CALL COURSELINK_UPDATE(?, ?, ?, ?, ?)`;
  try {
    await global.connectionAsyncQuery(sql, [
      courseId,
      link,
      tag,
      newLink,
      newTag,
    ]);
    res.send("Successfully Updated");
  } catch (e) {
    global.log("CourseLink Updated Failed with error %s", e);
    res.send("Error in CourseLink Update");
  }
}
