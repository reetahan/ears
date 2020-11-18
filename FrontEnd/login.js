//copied from handle_event.js, modify as needed

const urlBase = 'http://earsapp411.web.illinois.edu/query';

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

function attemptLogin() {
  
}