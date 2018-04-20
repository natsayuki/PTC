$(document).ready(function(){
  const incomingDiv = $('#incomingTrades');
  const darken = $('#darken');
  const tradeFailed = $('#tradeFailed');
  let inZoom = [false];

  $.ajax('trades.php',{
    type: "POST",
    data: {type: 'incoming'},
    success: function(data){
      data = JSON.parse(data);
      $.each(data, function(index, value){
        let suck = index;
        let to = value['to'];
        let from = value['from'];
        let give = value['give'];
        let take = value['take'];
        let key = value['key'];
        incomingDiv.append(`
          <div class="incomingRequest" id="incomingDiv${index}" key="${key}">
            <div class="resultColor"></div>
            <h1 class="label">from: ${from}</h1>
            <h1 class="label">they get: </h1>
            <div class="giveDiv"></div>
            <h1 class="label">you get: </h1>
            <div class="takeDiv"></div>
            <h3 class="accept option">accept</h3>
            <h3 class="decline option">decline</h3>
          </div>
        `);
        $.each(give, function(index, value){
          amount = value['amount'];
          set = value['set'];
          $(`#incomingDiv${suck}`).find('.giveDiv').append(`
            <div class="cardWrapper">
              <div class="count"><h3 align="center">${amount}</h3></div>
              <img src="../../images/cards/${set}/${index}.png" class="card" />
            </div>
          `);
        });
        $.each(take, function(index, value){
          amount = value['amount'];
          set = value['set'];
          $(`#incomingDiv${suck}`).find('.takeDiv').append(`
            <div class="cardWrapper">
              <div class="count"><h3 align="center">${amount}</h3></div>
              <img src="../../images/cards/${set}/${index}.png" class="card" />
            </div>
          `);
        });
      });
    }
  });

  $(document).on('click', '.count', function(){
    let tempCard = $(this).parent().find('.card').clone();
    $('body').append(tempCard);
    tempCard.addClass('zoomed');
    darken.css({'display': 'block'});
    tempCard.animate({'top': '1rem', 'opacity': '1'}, 400);
    darken.animate({'opacity': '.4'}, 400);
    setTimeout(function(){
      inZoom = [true, tempCard];
    }, 400);
  });
  $(document).click(function(){
    if(inZoom[0]){
      tempCard = inZoom[1];
      tempCard.animate({'opacity': '0', 'top': '-50%'}, 400);
      darken.animate({'opacity': '0'}, 400);
      setTimeout(function(){
        darken.css({'display': 'none'});
        $('.zoomed').remove();
        inZoom = [false];
      }, 400);
    }
  });
  $(document).on('click', '.option', function(){
    temp = $(this)
    resultColor = $(this).parent().find('.resultColor');
    if($(this).hasClass('accept')){
      resultColor.css({'background-color': 'green'});
      $.ajax('trades.php', {
        type: "POST",
        data: {type: 'accept', key: temp.parent().attr('key')},
        success: function(data){
          if(data.includes('not enough cards')){
            tradeFailed.css({'display': 'block'});
            tradeFailed.animate({"opacity": '1'}, 200);
            setTimeout(function(){
              tradeFailed.animate({'opacity': '0'}, 200);
            }, 2300);
            setTimeout(function(){
              tradeFailed.css({'display': 'none'});
            }, 2500);
          }
        }
      });
    }
    else if($(this).hasClass('decline')){
      resultColor.css({'background-color': 'red'});
      $.ajax('trades.php', {
        type: "POST",
        data: {type: 'decline', key: temp.parent().attr('key')},
        success: function(data){
          console.log(data);
        }
      });
    }
    resultColor.css({'display': 'block'});
    resultColor.animate({'opacity': '.4'}, 200);
    setTimeout(function(){
      resultColor.animate({'opacity': '0'}, 200);
    }, 200);
    setTimeout(function(){
      resultColor.css({'display': 'none'});
      $('#' + temp.parent().attr('id')).remove();
    }, 400);
  });
});
