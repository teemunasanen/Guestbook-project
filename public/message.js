const express = require("express");
const app = express();
//
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/adduser", function (req, res) {
  res.sendFile(__dirname + "/public/adduser.html");
});
app.get("/details", function (req, res) {
  let data = require("./exampledata2.json");

  let results = '<table border="1"> ';

  for (let i = 0; i < data.length; i++) {
    results +=
      "<tr>" +
      "<td>" +
      data[i].Name +
      "</td>" +
      "<td>" +
      data[i].Email +
      "</td>" +
      "<td>" +
      data[i].Date +
      "</td>" +
      "<td>" +
      data[i].Company +
      "</td>" +
      "</tr>";
  }
  res.send(results);
});
app.post("/newmessage", function (req, res) {
  let data = require("./public/demodata.json");

  data.push({
    Name: req.body.name,
    Contry: req.body.country,
    Message: req.body.message,
    Date: new Date(),
  });

  let jsonStr = JSON.stringify(data);

  fs.writeFile("demodata.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("Message saved!");
  });
  res.send(
    "Saved the data to a file. Browse to the /details to see the contents of the file"
  );
});
