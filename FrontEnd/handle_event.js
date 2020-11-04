function display_all () {
    /*
    const req = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        query: {
           "action": "DA" 
        },
        body: {
           "action":"DA" 
        }
    }
    let response = fetch(host, req)[0];
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json();
      } else {
        alert("HTTP-Error: " + response.status);
      } // contain updated tables*/
}

function search() {
    var name = document.getElementById("searcheventName").value;
    var date = document.getElementById("searcheventDate").value;
    document.getElementById("search_status").innerHTML = "Searched name: " + name + " date " + date;
    document.getElementById("searcheventName").value = '';
    document.getElementById("searcheventDate").value = '';
}

function insert_row() {
    var name = document.getElementById("InsertEventName").value;
    var userId = document.getElementById("userId").value;
    var date = document.getElementById("InsertEventDate").value;
    var description = document.getElementById("eventDescription").value;
    document.getElementById("insert_status").innerHTML = "Inserted name: " + name + " userId: " + userId + 
        " date: " + date + " description: " + description;
    document.getElementById("InsertEventName").value = '';
    document.getElementById("userId").value = '';
    document.getElementById("InsertEventDate").value = '';
    document.getElementById("eventDescription").value = '';
}

function delete_row() {
    var name = document.getElementById("DeleteEventName").value;
    var date = document.getElementById("DeleteEventDate").value;
    document.getElementById("delete_status").innerHTML = "Deleted name: " + name + " date: " + date;
    document.getElementById("DeleteEventName").value = '';
    document.getElementById("DeleteEventDate").value = '';
}

function update_row() {
    var name = document.getElementById("UpdateEventName").value;
    var date = document.getElementById("UpdateEventDate").value;
    document.getElementById("update_status").innerHTML = "Updated name: " + name + " date: " + date;
    document.getElementById("UpdateEventName").value = '';
    document.getElementById("UpdateEventDate").value = '';
}
