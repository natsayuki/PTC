$(document).ready(function(){
  const form = $('#form');
  const result = $('#result');
  form.submit(function(e){
    e.preventDefault();
    let username = $('#usernameIn').val();
    let password = $('#passwordIn').val();
    $.ajax("signup.php", {
      type: "POST",
      data: {"username": username, "password": password},
      success: function(data){
        if(data == 'success'){
          window.location = '../';
        }
        result.text(data);
      }
    })
  });
});
