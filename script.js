$(document).ready(function(){
  const alertDiv = $('#alert');
  const alertText = $('#alertText');


  if(typeof sessionReturn != 'undefined'){
    if(sessionReturn == 'trade') showAlert('you need to be logged in to trade', false);
    else if(sessionReturn == 'store') showAlert("you need to logged in to access the store", false);
    else if(sessionReturn == 'tradeSuccess') showAlert("trade successful", true);
    else if(sessionReturn == 'tradeFail') showAlert('cannot trade yourself', false);
  }

  function showAlert(message, good){
    if(good) alertDiv.css({'background-color': 'green'});
    else alertDiv.css({'background-color': 'red'});
    alertText.text(message);
    alertDiv.css({'display': 'block'});
    alertDiv.animate({'opacity': '1'}, 400);
    setTimeout(function(){
      alertDiv.animate({'opacity': '0'}, 400);
    }, 1200);
    setTimeout(function(){
      alertDiv.css({'display': 'none'});
    }, 1600);
  }
});
