$(() => {
  $("#litti").click(() => {
    
    var data = {
      username: $("#username").val(),
      country: $("#country").val(),
      message: $("#message").val(),
    };
    if ($("#username").val() == "" ||$("#country").val() == ""||$("#message").val() == ""){
      alert("Every field is important!");
    }else{
   
    $.post("/ajaxmessage", data, function (res, status) {
      $("#status").html(res);
    
    });
  } 
  }); 
});
