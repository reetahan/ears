const urlBase = '/api';

function generate_status() {
	document.getElementById("generate_status").innerHTML = "Generated!";
}
function display_recommended_courses(data) {
	document.getElementById("generate_status").innerHTML = "";	
	var recommendation = data[data.length-1].recommendations;
	console.log(data);
	var input = data[data.length-1].input;
	var to_display = "Your recommendations for courses based on input: " + input + " is...";
	to_display += '<br>' + recommendation;
	document.getElementById("recommendation").innerHTML=to_display;
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
        .then(data => generate_status());
 }

function generate_recommendations () {
    // input -> ask users for classes they are interested in
    var user_input=document.getElementById("rec_input").value;
    let params = {'apiType': 'Recommendations', 'action': 'Generate', 'input': user_input };
	sendPostRequest(params);
	document.getElementById("rec_input").value = "";
}

function display() {
fetch(urlBase + '?apiType=Recommendations&action=Display')
    .then(response => response.json())
    .then(data => display_recommended_courses(data));
}
