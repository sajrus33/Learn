const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const flash = require("connect-flash");

const routes = require("./routes/routes");

const app = express();
console.log({ __dirname });

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(flash());

app.use("/", routes);

module.exports = app;
