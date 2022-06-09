const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const email = document.getElementById("email");
const password = document.getElementById("Password");
const file = document.getElementById("file");

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
  } else if (errorMsg == "CodeDrill@infotech.com") {
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

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  feidChecker(fName);
  ValidateEmail(email);
  feidChecker(lName);
  feidChecker(password);

  var fd = new FormData();

  fd.append("fName", fName.value);
  fd.append("lName", lName.value);
  fd.append("email", email.value);
  fd.append("password", password.value);
  fd.append("file", file.files[0]);

  const res = await fetch("http://localhost:3000/", {
    method: "POST",
    body: fd,
  });

  const data = await res.json();
  const status = res.status;
  console.log(data);

  if (status === 201) {
    alert("user successfully Created");
    localStorage.setItem("jwt", data.jwt);
    location.href = "./profile.html";
  }
});
