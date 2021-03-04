const express = require("express");
const app = express();

const fs = require("fs");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8081;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/guestbook", function (req, res) {
  res.sendFile(__dirname + "/public/guestbook.html");
});

app.get("/newmessage", function (req, res) {
  res.sendFile(__dirname + "/public/message.html");
});
app.post("/newmessage", function (req, res) {
  let data = require("./public/demodata.json");

  var d = new Date();

  var datestring =
    d.getDate() +
    "-" +
    (d.getMonth() + 1) +
    "-" +
    d.getFullYear() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes();

  data.push({
    username: req.body.name,
    country: req.body.country,
    message: req.body.message,
    date: datestring,
  });
  let jsonStr = JSON.stringify(data);

  fs.writeFile("./public/demodata.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("Message saved!");
  });
  res.sendFile(__dirname + "/public/guestbook.html");
});

app.get("/ajaxmessage", function (req, res) {
  res.sendFile(__dirname + "/public/ajaxmessage.html");
});
app.post("/ajaxmessage", function (req, res) {
  let data = require("./public/demodata.json");

  var d = new Date();

  var datestring =
    d.getDate() +
    "-" +
    (d.getMonth() + 1) +
    "-" +
    d.getFullYear() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes();

  data.push({
    username: req.body.username,
    country: req.body.country,
    message: req.body.message,
    date: datestring,
  });
  let jsonStr = JSON.stringify(data);

  fs.writeFile("./public/demodata.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("Message saved!");
  });

  let messages = `<table class="pure-table pure-table-horizontal">
        <thead><tr><th>Name</th><th>Coyntry</th><th>Message</th><th>Date</th></tr></thead><tbody>`;
  for (var i = 0; i < data.length; i++) {
    messages +=
      "<tr>" +
      "<td>" +
      data[i].username +
      "</td>" +
      "<td>" +
      data[i].country +
      "</td>" +
      "<td>" +
      data[i].message +
      "</td>" +
      "<td>" +
      data[i].date +
      "</td>" +
      "</tr>";
  }
  messages += "</tbody></table>";

  res.send(messages);
});

app.get("*", function (req, res) {
  res.status(404).send("Can't find the requested page");
});

app.listen(port, function () {
  console.log("app listening port: " + port);
});
