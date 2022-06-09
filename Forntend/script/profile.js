var email = document.getElementById("email");
var fName = document.getElementById("fName");
var lName = document.getElementById("lName");
var img = document.getElementById("profilePic");
var edit = document.querySelector("a");
var upload = document.querySelector(".upload-container div");
var uploadDiv = document.querySelector(".upload-container");
const msg = async () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    location.href = "./signUp.html";
  }
  console.log(jwt);
  const res = await fetch("http://localhost:3000/profileview", {
    method: "POST",
    body: null,
    headers: { Authentication: jwt },
  });
  let data = await res.json();
  console.log(data.path);
  email.innerHTML = data.email;
  fName.innerHTML = data.fName;
  lName.innerHTML = data.lName;
  img.src = `../backend/${data.path}`;
};

edit.addEventListener("click", () => {
  uploadDiv.style.visibility = "visible";
  upload.style.visibility = "visible";

  var file = document.querySelector("#file");
  var btn = document.querySelector("button");
  const jwt = localStorage.getItem("jwt");
  btn.addEventListener("click", async (e) => {
    const fd = new FormData();
    fd.append("file", file.files[0]);
    fd.append("id", "62a0c307ddd8b53750d9026b");
    console.log(jwt);
    let res = await fetch("http://localhost:3000/profilechange", {
      method: "POST",
      body: fd,
      headers: { Authentication: jwt },
    });
    let data = await res.json();
    console.log(data);
    location.reload();
  });
});

msg();
