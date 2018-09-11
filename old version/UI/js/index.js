$(document).ready(function() {
  CheckLogin();
  $("#loginBtn").click(function() {
    var data = {
      "ID": ($('#ID').val()),
      "Password": ($('#Password').val())
    }
    if ($('#ID').val() != "") {
      Post('/login', data, function(msg) {
        if (msg == 'successed!')
          location.href = "./home";
        else {
          $("#error").html("<br><div class='alert alert-danger' role='alert'>" + msg + " Please try again.</div>")
        }
        //CheckLogin();
      });
    }
  });
});

function CheckLogin() {
  var apiUrl = '/login/IsLogined'
  var callback = function(loginStatus) {
    if (loginStatus != "false") {
      location.href = "./home";
    }
  }
  Get(apiUrl, callback);
};

function checkclick() {
  if (event.keyCode == "13") {
    $("#loginBtn").click();
  }
}