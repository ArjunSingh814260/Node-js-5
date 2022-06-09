var form = document.getElementById("form");

var password = document.getElementById("password");
var email = document.getElementById("email");

function feidChecker(input) {
  if (!input.value) {
    error(input);
  } else {
    success(input);
  }
}
function error(input, msg) {
  input.style.border = "none";
  input.style.outline = "1px ridge red";
  const a = input.parentElement;
  var small = a.querySelector("small");
  small.style.visibility = "visible";
  small.style.color = "red";
  var errorMsg = input.placeholder;
  if (msg) {
    small.innerText = msg;
  } else if (errorMsg == "CodeDrillinfotech@gmail.com") {
    small.innerText = `please fill the email`;
  } else {
    small.innerText = `please fill the ${errorMsg}`;
  }
  if (msg == "Please Upload Photo") {
    console.log("no");
    input.style.outline = "none";
  } else {
    var icon = a.querySelector(".fa-circle-xmark");
    var successIcon = a.querySelector(".fa-check");
    icon.style.visibility = "visible";
    successIcon.style.visibility = "hidden";
    icon.style.color = "red";
  }
}
function success(input, msg) {
  input.style.border = "none";
  input.style.outline = "1px ridge green";
  const a = input.parentElement;
  var small = a.querySelector("small");
  var icon = a.querySelector(".fa-check");
  var iconerror = a.querySelector(".fa-circle-xmark");
  iconerror.style.visibility = "hidden";
  icon.style.visibility = "visible";
  icon.style.color = "green";
  if (!msg) {
    small.style.visibility = "hidden";
  }
  if (msg == "Please Upload Photo") {
    input.style.outline = "none";
  }
}

function ValidateEmail(input) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    return success(input);
  }
  var msg = "You have entered an invalid email address!";
  return error(input, msg);
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  feidChecker(email);
  feidChecker(password);

  let fd = new FormData();

  fd.append("email", email.value);
  fd.append("password", password.value);

  const res = await fetch("http://localhost:3000/signin", {
    method: "POST",
    body: fd,
  });
  const data = await res.json();
  console.log(data.token);
  const status = res.status;
  if (status == 422 || status == 404) {
    alert("invalid credentials");
  } else if (status == 200) {
    alert("login successfully");
    localStorage.setItem("jwt", data.token);
    location.href = "./profile.html";
  }
});
