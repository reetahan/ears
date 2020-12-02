const url = "/api";

function sendPostRequest(params) {
  opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(params),
  };
  fetch(url, opts)
    .then((response) => response.text())
    .then(
      (data) => (document.getElementById("signup_status").textContent = data)
    );
}

function attemptSignup() {
  let inputFullName = document.getElementById("fullname").value;
  let inputUsername = document.getElementById("username").value;
  let inputPassword = document.getElementById("password").value;
  let params = {
    apiType: "User",
    action: "Insert",
    fullName: inputFullName,
    userName: inputUsername,
    plaintextPassword: inputPassword,
  };
  sendPostRequest(params);
}
