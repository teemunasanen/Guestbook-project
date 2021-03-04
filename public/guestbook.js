$.getJSON("demodata.json", function (data) {
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

  $("#target").html(messages);
});
