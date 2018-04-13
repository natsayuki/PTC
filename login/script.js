$(document).ready(function(){
  const form = $('#form');
  const usernameIn = $('#usernameIn');
  const passwordIn = $('#passwordIn');
  const result = $('#result');
  form.submit(function(e){
    e.preventDefault();
    $.ajax('login.php', {
      type: 'POST',
      data: {'username': usernameIn.val(), 'password': passwordIn.val()},
      success: function(data){
        result.text(data);
        if(data == 'log in successful'){
          window.location = '../';
        }
      }
    })
  })
});
