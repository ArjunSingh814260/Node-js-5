const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
var logger = require("morgan");
const db = require("./DataBase/connection");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");

dotenv.config();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieparser());
app.use(cors());
app.use("/", require("./routes/user.routes"));
app.listen(3000, () => console.log("Server started on port 3000"));
