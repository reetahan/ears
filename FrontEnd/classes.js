const urlBase = '/api';
//TODO: pull up links based on class
//TODO: edit links based on input
//TODO: add links based on input
//TODO: delete links based on input
//TODO: 

function displayCoursesOnPage(coursesObject) {
    // do some displaying here
    console.log(coursesObject);

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
      .then(console.log);
}

function getClasses() {
    fetch(urlBase + '?apiType=Classes&action=Display')
        .then(response => response.json())
        .then(data => displayCoursesOnPage(data));
}

function logout() {
  params = {'apiType': 'Logout'};
  sendPostRequest(params);
}