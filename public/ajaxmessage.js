$(() => {
  $("#litti").click(() => {
    
    var data = {
      username: $("#username").val(),
      country: $("#country").val(),
      message: $("#message").val(),
    };
   
    $.post("/ajaxmessage", data, function (res, status) {
      $("#status").html(res);
    }); 
  }); 
});
