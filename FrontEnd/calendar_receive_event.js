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
function display_event(day) {
    var days=["Sunday","Monday","Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
    var idx = (day + 1) % 7;
    var element = document.getElementById(day);
    document.getElementById("today").innerHTML = "2020/12/"+day + " " + days[idx];
    document.getElementById("daily_event").innerHTML = "TThis will display events for 12/"+day+"/2020";

    var date = "12-"+day+"-2020"
    //var date = document.getElementById("searcheventDate").value;
    let url = urlBase + "?apiType=Demo&action=Search&eventDate=" + date;
    fetch(url)
    .then(response => response.json())
    .then(data => makeTable(data));
    document.getElementById("daily_event").innerHTML = "Searched date: " + date;
    //document.getElementById("searcheventDate").value = '';
}
