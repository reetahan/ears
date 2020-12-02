const urlBase = '/api';
function makeTable(jsObj, date) {
    let prettifiedString = JSON.stringify(jsObj, null, '\t');
    var to_display = "No event today";
    if (prettifiedString != "[]") {
        var arr = prettifiedString.replaceAll('[', '').replaceAll(']','').replaceAll("},", ';').replaceAll('{','').replaceAll('}','');
	arr = arr.split(';');
   	to_display=""; 
	for (var i = 0; i < arr.length; i++) {
	    var dict = arr[i];
	    var elem = "{" + dict + "}";
	    var d = JSON.parse(elem);
	    var e = d["EventName"];
	    var des = d["Description"];
	    if (d["DueDate"] !== null && d["DueDate"].includes(date)) {
		to_display += "Event" + (i+1) + ": " + e + '<br>' + "Description: " + des + '<br>' + '<br>';
	    }
	}
    }
    if (to_display === "") {
	to_display = "No event today";
    }
    document.getElementById('daily_event').innerHTML = to_display;
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
        .then(data => console.log(data));
  }
function display_event(day) {
    if (day < 10) {
	day = "0" + day;
    }
    var days=["Sunday","Monday","Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
    var idx = (day + 1) % 7;
    var element = document.getElementById(day);
    document.getElementById("today").innerHTML = "2020/12/"+day + " " + days[idx];
    //mm-dd-yyyy format
    var date = "12-"+day+"-2020"
    var param_date = "2020-12-" + day;
    //        //var date = document.getElementById("searcheventDate").value;
    let url = urlBase + "?apiType=Event&action=Display";
    fetch(url)
    .then(response => response.json())
    .then(data => makeTable(data, param_date));
    //document.getElementById("daily_event").innerHTML = "Searched date: " + date;
    //document.getElementById("searcheventDate").value = '';
    }
    //

function insert_row() {
    var nameValue = document.getElementById("InsertEventName").value;
    var userIdValue = document.getElementById("userId").value;
    var dateValue = document.getElementById("InsertEventDate").value;
    var descriptionValue = document.getElementById("eventDescription").value;
    insertParams = {
      apiType: "Event",
      action: "Insert",
      eventName: nameValue,
      userId: userIdValue,
      eventDate: dateValue,
      description: descriptionValue
    };
    sendPostRequest(insertParams);
    var display_string = "Successfully inserted event!" + '<br>';
    display_string += "New event name: " + nameValue + '<br>' + "New event date: " + dateValue + '<br>' + "New event description: " + descriptionValue;
    document.getElementById("insert_status").innerHTML = display_string;
    document.getElementById("InsertEventName").value = '';
    document.getElementById("userId").value = '';
    document.getElementById("InsertEventDate").value = '';
    document.getElementById("eventDescription").value = '';
}

function delete_event() {
    var nameValue = document.getElementById("DeleteEventName").value;
    var dateValue = document.getElementById("DeleteEventDate").value;
    deleteParams = {
      apiType: "Event",
      action: "Delete",
      eventName: nameValue,
      eventDate: dateValue
    };
    sendPostRequest(deleteParams);
    document.getElementById("delete_status").innerHTML = "Deleted name: " + nameValue + ", date: " + dateValue;
    document.getElementById("DeleteEventName").value = '';
    document.getElementById("DeleteEventDate").value = '';
}
function edit_event() {
    var nameValue = document.getElementById("EditEventName").value;
    var dateValue = document.getElementById("EditEventDate").value;
    updateParams = {
      apiType: "Event",
      action: "Update",
      eventName: nameValue,
      eventDate: dateValue
    };
    sendPostRequest(updateParams);
    document.getElementById("edit_status").innerHTML = "Updated name: " + nameValue + ", date: " + dateValue;
    document.getElementById("EditEventName").value = '';
    document.getElementById("EditEventDate").value = '';
}
function display_avg_event(data) {
	var cnt = data["AVG_EVENT_COUNT"];
	console.log(cnt);
	document.getElementById("avg_event").innerHTML = "Each user has average of " + cnt + " events.";
}
function display_num_friends(data) {
	var cnt = data["numPotentialFriends"];
	console.log(cnt);
	document.getElementById("num_friends").innerHTML = "You have total of " + cnt + " number of friends that use this planner.";
}
function average_event() {
    let url = urlBase + "?apiType=Misc&action=averageEvents";
    fetch(url)
    .then(response => response.json())
    .then(data => display_avg_event(data));	
}
function num_friends() {
let url = urlBase + "?apiType=Misc&action=potentialNumFriends";
    fetch(url)
    .then(response => response.json())
    .then(data => display_num_friends(data));
}
