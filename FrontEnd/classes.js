const urlBase = "/api";
//TODO: edit links based on input
//TODO: add links based on input
//TODO: delete links based on input
//TODO: do complex query

function displayCoursesOnPage(coursesObject) {
  let container = document.getElementById("class-body");
  container.innerHTML = "";
  for (const course of coursesObject) {
    let header = document.createElement("h5");
    header.textContent =
      course.CourseName + " by Professor " + course.Professor;
    container.appendChild(header);
    let courseAttributes = document.createElement("ul");
    if (course.MeetingTime !== undefined) {
      let meetingTimeAttribute = document.createElement("li");
      meetingTimeAttribute.textContent = "Meeting time: " + course.MeetingTime;
      courseAttributes.appendChild(meetingTimeAttribute);
    }

    let linksAttribute = document.createElement("li");
    linksAttribute.textContent = "Links:";
    let linksList = document.createElement("ul");
    for (const link of course.links) {
      let singleLinkItem = document.createElement("li");
      singleLinkItem.innerHTML = `<a href=${link.Link}> ${link.Tag} </a>`;
      linksList.appendChild(singleLinkItem);
    }
    linksAttribute.appendChild(linksList);
    courseAttributes.appendChild(linksAttribute);
    container.appendChild(courseAttributes);

    updateDropDowns(course);
  }
}

function updateDropDowns(course) {
  let updateDropDown = document.getElementById("courseUpdateDropDown");
  updateDropDown.innerHTML += `<option value=${course.CourseId}>${course.CourseName}</option>`;
  let deleteDropDown = document.getElementById("courseDeleteDropDown");
  deleteDropDown.innerHTML += `<option value=${course.CourseId}>${course.CourseName}</option>`;
  let addLinkDropDown = document.getElementById("addLinkDropDown");
  addLinkDropDown.innerHTML += `<option value=${course.CourseId}>${course.CourseName}</option>`;
}

function showSearchResults(courseObject) {
  let prettifiedString = JSON.stringify(courseObject, null, "\t");
  document.getElementById(
    "searchResults"
  ).innerHTML = prettifiedString
    .replaceAll("\n", "<br>")
    .replaceAll("{", "")
    .replaceAll("}", "");
}

function sendPostRequest(params) {
  opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(params),
  };
  fetch(urlBase, opts)
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      window.location.reload(true);
    });
}

function getClasses() {
  fetch(urlBase + "?apiType=Course&action=Display")
    .then((response) => response.json())
    .then((data) => displayCoursesOnPage(data));
}

function searchClasses() {
  let courseName = document.getElementById("courseSearchName").value;
  let url =
    urlBase + "?apiType=Course&action=SearchByName&courseName=" + courseName;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then(showSearchResults);
}

function insertClass() {
  let insertParams = {
    apiType: "Course",
    action: "Insert",
    courseName: document.getElementById("courseAddName").value,
    professor: document.getElementById("courseAddProfessor").value,
    meetingTime: document.getElementById("courseAddMeetingTime").value,
  };
  sendPostRequest(insertParams);
}

function updateClass() {
  let updateParams = {
    apiType: "Course",
    action: "Update",
    courseId: document.getElementById("courseUpdateDropDown").value,
    courseName: document.getElementById("courseUpdateName").value || undefined,
    professor:
      document.getElementById("courseUpdateProfessor").value || undefined,
    meetingTime:
      document.getElementById("courseUpdateMeetingTime").value || undefined,
  };
  sendPostRequest(updateParams);
}

function deleteCourse() {
  let deleteParams = {
    apiType: "Course",
    action: "Delete",
    courseId: document.getElementById("courseDeleteDropDown").value,
  };
  sendPostRequest(deleteParams);
}

function addLink() {
  let addLinkParams = {
    apiType: "CourseLink",
    action: "Insert",
    courseId: document.getElementById("addLinkDropDown").value,
    link: document.getElementById("addLinkLink").value,
    tag: document.getElementById("addLinkTag").value
  }
  sendPostRequest(addLinkParams);
}

function logout() {
  params = { apiType: "Logout" };
  sendPostRequest(params);
}
