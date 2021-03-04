// AJAX Call with form values using jQuery
$(() => {//document reaay
  $("#litti").click(() => {//Button listener
    
    var data = {//Data from field values
      username: $("#username").val(),
      country: $("#country").val(),
      message: $("#message").val(),
    };
    //No empty fields
    if ($("#username").val() == "" ||$("#country").val() == ""||$("#message").val() == ""){
      alert("Every field is important!");
    }else{
   //Send call to /ajaxmessage route
    $.post("/ajaxmessage", data, function (res, status) {
      $("#status").html(res);//Show response at status.div
    
    });
  } 
  }); 
});
