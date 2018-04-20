$(document).ready(function(){
  const cashText = $('#cashText');
  const collectionWrapper = $('#collectionWrapper');
  const darken = $('#viewDarken');
  let collection;
  let inZoom = [false];
  $.ajax('user.php', {
    type: 'POST',
    data: {'username': username, "type": 'cash'},
    success: function(data){
      let cash = data;
      cashText.text('cash: ' + cash);
    }
  });
  $.ajax('user.php', {
    type: 'POST',
    data: {'username': username, "type": 'collection'},
    success: function(data){
      collection = JSON.parse(data);
      $.each(collection, function(index, value){
        set = value['set'];
        count = value['amount'];
        collectionWrapper.append(`
          <div class="cardWrapper">
            <div class="count">
              <h1 align="center">${count}</h1>
            </div>
            <img src="../images/cards/${set}/${index}.png" class="card" />
          </div>
        `);
      });
    }
  });

  $(document).on('mouseenter', '.count', function(){
    $(this).parent().find('.count').animate({'opacity': '.4'}, 200);
  });
  $(document).on('mouseleave', '.count', function(){
    $(this).parent().find('.count').animate({'opacity': '0'}, 200);
  });
  $(document).on('click', '.count', function(){
    tempCard = $(this).parent().find('.card').clone().addClass('zoom');
    $('body').prepend(tempCard);
    darken.css({'display': 'block'});
    tempCard.css({'position': 'fixed', 'width': '35%', 'top': '-50%', 'left': '32.5%', 'z-index': '2', 'opacity': '0'});
    darken.animate({'opacity': '.4'}, 400);
    tempCard.animate({'opacity': '1', 'top': '1rem'});
    setTimeout(function(){
      inZoom = [true, tempCard];
    }, 400);

  });
  $(document).on('click', function(){
    if(inZoom[0]){
      tempCard = inZoom[1];
      setTimeout(function(){
        darken.css({'display': 'none'});
        $('.zoom').remove();
      }, 400);
      darken.animate({'opacity': '0'}, 400);
      tempCard.animate({'opacity': '0', 'top': '-50%'});
      inZoom = [false];
    }
  });
});
