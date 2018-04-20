$(document).ready(function(){
  const form = $('#form');
  const toIn = $('#toIn');
  const resultsText = $('#resultsText');
  const userCollectionDiv = $('#userCollection');
  const otherCollectionDiv = $('#otherCollection');
  const darken = $('#screenDarken');
  const giveDiv = $('#giveDiv');
  const takeDiv = $('#takeDiv');
  const searchButton = $('#search');
  let to;
  let otherCollection;
  let selfCollection;
  let inZoom = [false];
  let give = {};
  let take = {};

  String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
  }

  function buildCollection(json, container){
    container.html('');
    $.each(Object.keys(json), function(index, value){
      value = value.replaceAll(" ", '');
      count = json[value]['amount'];
      pack = json[value]['set'];
      container.append(`
        <div class="cardWrapper" card="${value}" set="${pack}">
          <div class="count"><h3 align="center">${count}</h3></div>
          <img class="card" src="../images/cards/${pack}/${value}.png" />
        </div>
        `);
    })
  }

  $.ajax('trade.php', {
    type: "POST",
    data: {type: 'self'},
    success: function(data){
      selfCollection = JSON.parse(data);
      buildCollection(selfCollection, userCollectionDiv);
    }
  });

  searchButton.click(function(){
    console.log('asdf');
    to = toIn.val();
    $.ajax('trade.php', {
      type: "POST",
      data: {type: 'search', username: `${to}`},
      success: function(data){
        if(data == 'No such user') resultsText.text(data);
        else{
          otherCollection = JSON.parse(data);
          buildCollection(otherCollection, otherCollectionDiv);
          takeDiv.html('');
        }
      }
    });
  });

  form.submit(function(e){
    e.preventDefault();
    if(to){
      give = JSON.stringify(give);
      take = JSON.stringify(take);
      $.ajax('trade.php', {
        type: "POST",
        data: {type: "trade", to: `${to}`, give: `${give}`, take: `${take}`},
        success: function(data){
          console.log(data);
        }
      });
    }
    else{
      console.log("need user to trade to");
    }
  });

  $(document).on('mouseenter', '.count', function(){
    $(this).animate({'opacity': '.4'}, 200);
  });
  $(document).on('mouseleave', '.count', function(){
    $(this).animate({'opacity': '0'}, 200);
  });
  $(document).on('contextmenu', '.count', function(e){
    e.preventDefault();
    if($(this).parent().parent().attr('id') == 'userCollection'){
      tempCard = $(this).parent().clone();
      cardName = $(this).parent().attr('card');
      setName = $(this).parent().attr('set');
      if(Object.keys(give).indexOf(cardName) != -1){
        if(give[cardName]['amount'] + 1 <= selfCollection[cardName]['amount']){
          give[cardName]['amount'] = give[cardName]['amount'] +1;
          giveDiv.find(`div[card="${cardName}"]`).find('.count').find('h3').text(give[cardName]['amount']);
        }
      }
      else{
        give[cardName] = {amount: 1, set: `${setName}`};
        giveDiv.append(tempCard);
        tempCard.find('.count').addClass('countPerm').find('h3').text(give[cardName]['amount']);
      }
    }else{
      tempCard = $(this).parent().clone();
      cardName = $(this).parent().attr('card');
      setName = $(this).parent().attr('set');
      if(Object.keys(take).indexOf(cardName) != -1){
        if(take[cardName]['amount'] + 1 <= otherCollection[cardName]['amount']){
          take[cardName]['amount'] = take[cardName]['amount'] +1;
          takeDiv.find(`div[card="${cardName}"]`).find('.count').find('h3').text(take[cardName]['amount']);
        }
      }
      else{
        take[cardName] = {amount: 1, set: `${setName}`};
        takeDiv.append(tempCard);
        tempCard.find('.count').addClass('countPerm').find('h3').text(take[cardName]['amount']);
      }
    }
  });
  $(document).on('click', '.count', function(){
    tempCard = $(this).parent().find('.card').clone().addClass('zoomed');
    setTimeout(function(){
      inZoom = [true, tempCard]
    }, 400);
    $('body').prepend(tempCard);
    darken.css({'display': 'block'});
    darken.animate({'opacity': '.4'}, 400);
    tempCard.animate({'top': '1rem', 'opacity': '1'}, 400);
  });
  $(document).click(function(){
    if(inZoom[0]){
      tempCard = inZoom[1];
      setTimeout(function(){
        darken.css({'display': 'none'});
        $('.zoomed').remove();
        inZoom = [false];
      }, 400);
      tempCard.animate({'opacity': '0', 'top': '-50%'}, 400);
      darken.animate({'opacity': '0'}, 400);
    }
  });

});
