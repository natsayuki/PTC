$(document).ready(function(){
  const cashText = $('#cashText');
  const collectionWrapper = $('#collectionWrapper');
  let collection;
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
      console.log(data);
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
});
