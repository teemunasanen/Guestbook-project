/* Node.js site Guestbook-application 
   Laurea demo-project
*/
// Node modules
const express = require("express");
const app = express();

const fs = require("fs");
const bodyParser = require("body-parser");
//Porthandling for Heroku or local
const port = process.env.PORT || 8081;
// body-parser for form data
app.use(bodyParser.urlencoded({ extended: true }));
// public folder contains static-files
app.use(express.static("./public"));
// route for front/home
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
// route for guestbook
app.get("/guestbook", function (req, res) {
  res.sendFile(__dirname + "/public/guestbook.html");
});
// route for new message
app.get("/newmessage", function (req, res) {
  res.sendFile(__dirname + "/public/message.html");
});
// route for message post
app.post("/newmessage", function (req, res) {
  // import demodata of public
  let data = require("./public/demodata.json");
// date and some adjustments
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
// add form data
  data.push({
    username: req.body.name,
    country: req.body.country,
    message: req.body.message,
    date: datestring,
  });
  //JSON-stringify
  let jsonStr = JSON.stringify(data);
// write file with newdata
  fs.writeFile("./public/demodata.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("Message saved!");
  });
  // send response
  res.sendFile(__dirname + "/public/guestbook.html");
});
// route for ajax message
app.get("/ajaxmessage", function (req, res) {
  res.sendFile(__dirname + "/public/ajaxmessage.html");
});
// route for ajax message post
app.post("/ajaxmessage", function (req, res) {
  // import demodata of public
  let data = require("./public/demodata.json");
// date and some adjustments
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
//add form-data to demo
  data.push({
    username: req.body.username,
    country: req.body.country,
    message: req.body.message,
    date: datestring,
  });
  // JSON-stringify
  let jsonStr = JSON.stringify(data);
// write file with newdata
  fs.writeFile("./public/demodata.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("Message saved!");
  });
  // put data in table for response
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
// send response
  res.send(messages);
});
// route for undefined
app.get("*", function (req, res) {
  res.status(404).send("Can't find the requested page");
});
// listen port
app.listen(port, function () {
  console.log("app listening port: " + port);
});