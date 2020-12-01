const urlBase = '/api';
function makeTable(jsObj) {
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
	    to_display += "Event" + (i+1) + ": " + e + '<br>' + "Description: " + des + '<br>' + '<br>';
	}
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
        .then(data => document.getElementById('input_status').textContent = data);
  }
function display_event(day) {
    var days=["Sunday","Monday","Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
    var idx = (day + 1) % 7;
    var element = document.getElementById(day);
    document.getElementById("today").innerHTML = "2020/12/"+day + " " + days[idx];
    //document.getElementById("daily_event").innerHTML = "This will display events for 12/"+day+"/2020";
    //mm-dd-yyyy format
    var date = "12-"+day+"-2020"
    //        //var date = document.getElementById("searcheventDate").value;
    let url = urlBase + "?apiType=Demo&action=Search&eventDate=" + date;
    fetch(url)
    .then(response => response.json())
    .then(data => makeTable(data));
    //document.getElementById("daily_event").innerHTML = "Searched date: " + date;
    //document.getElementById("searcheventDate").value = '';
    }
    //

function insert_row() {
    console.log("insert_row");
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
    var display_string = "Successfully inserted event!" + '<br>';
    display_string += "New event name: " + nameValue + '<br>' + "New event date: " + dateValue + '<br>' + "New event description: " + descriptionValue;
    document.getElementById("insert_status").innerHTML = display_string;
    document.getElementById("InsertEventName").value = '';
    document.getElementById("userId").value = '';
    document.getElementById("InsertEventDate").value = '';
    document.getElementById("eventDescription").value = '';
}
