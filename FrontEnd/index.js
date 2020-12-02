const urlBase = '/api';

function makeTable(jsObj) {
  let prettifiedString = JSON.stringify(jsObj, null, '\t');
  document.getElementById('databasebox').innerHTML = prettifiedString.replaceAll('\n', '<br>');
}

function sendPostRequest(params) {
  opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(params)
  };
  fetch(urlBase, opts)
      .then(response => response.text())
      .then(data => document.getElementById('databasebox').textContent = data);
}

function display_all () {
    let url = urlBase + "?apiType=Demo&action=DA";
    fetch(url)
      .then(response => response.json())
      .then(data => makeTable(data));
}

function search() {
    var date = document.getElementById("searcheventDate").value;
    let url = urlBase + "?apiType=Demo&action=Search&eventDate=" + date;
    fetch(url)
      .then(response => response.json())
      .then(data => makeTable(data));
    document.getElementById("search_status").innerHTML = "Searched date: " + date;
    document.getElementById("searcheventDate").value = '';
}

function getUserName() {
  let url = urlBase + "?apiType=Demo&action=Test";
  fetch(url)
    .then(response => response.text())
    .then(headline => {
      if (headline !== "Welcome back, undefined") {
        document.getElementById('headline').textContent = headline;
      }
    });
}

function insert_row() {
    var nameValue = document.getElementById("InsertEventName").value;
    var userIdValue = document.getElementById("userId").value;
    var dateValue = document.getElementById("InsertEventDate").value;
    var descriptionValue = document.getElementById("eventDescription").value;
    insertParams = {
      apiType: "Demo",
      action: "Insert",
      eventName: nameValue,
      userId: userIdValue,
      eventDate: dateValue,
      description: descriptionValue
    };
    sendPostRequest(insertParams);
    document.getElementById("insert_status").innerHTML = "Inserted name: " + nameValue + ", userId: " + userIdValue +
        ", date: " + dateValue + ", description: " + descriptionValue;
    document.getElementById("InsertEventName").value = '';
    document.getElementById("userId").value = '';
    document.getElementById("InsertEventDate").value = '';
    document.getElementById("eventDescription").value = '';
}

function delete_row() {
    var nameValue = document.getElementById("DeleteEventName").value;
    var dateValue = document.getElementById("DeleteEventDate").value;
    deleteParams = {
      apiType: "Demo",
      action: "Delete",
      eventName: nameValue,
      eventDate: dateValue
    };
    sendPostRequest(deleteParams);
    document.getElementById("delete_status").innerHTML = "Deleted name: " + nameValue + ", date: " + dateValue;
    document.getElementById("DeleteEventName").value = '';
    document.getElementById("DeleteEventDate").value = '';
}

function update_row() {
    var nameValue = document.getElementById("UpdateEventName").value;
    var dateValue = document.getElementById("UpdateEventDate").value;
    updateParams = {
      apiType: "Demo",
      action: "Update",
      eventName: nameValue,
      eventDate: dateValue
    };
    sendPostRequest(updateParams);
    document.getElementById("update_status").innerHTML = "Updated name: " + nameValue + ", date: " + dateValue;
    document.getElementById("UpdateEventName").value = '';
    document.getElementById("UpdateEventDate").value = '';
}

function logout() {
  params = {'apiType': 'Logout'};
  sendPostRequest(params);
}