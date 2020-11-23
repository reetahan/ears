//copied from handle_event.js, modify as needed

const url = 'http://earsapp411.web.illinois.edu/api';

function sendPostRequest(params) {
  opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(params)
  };
  fetch(url, opts)
      .then(response => response.text())
      .then(data => document.getElementById('login_status').textContent = data);
}

function attemptLogin() {
  let inputUsername = document.getElementById('username').value;
  let inputPassword = document.getElementById('password').value;
  let params = {
    apiType: 'Login',
    username: inputUsername,
    password: inputPassword
  }
  sendPostRequest(params);
}