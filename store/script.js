$(document).ready(function(){
  const ClassicPatkerPack = {"Original Patker": {"rarity": 1}, "Side Patker": {"rarity": 2}, "Good Boy Patker": {"rarity": 5},
  "Surprise Patker": {"rarity": 20}};
  const PatkermonPack = {"Batker": {"rarity": 2}, "Catker": {"rarity": 2}, "Doormatker": {"rarity": 5}, "Hatker": {"rarity": 10}, "Ratker": {"rarity": 1},
  "Diplomatker": {'rarity': 5}, "Habitatker": {'rarity': 1}, "Proletariatker": {'rarity': 1}, "Satker": {'rarity': 2}, "Waistcoatker": {'rarity': 1},
  "Babysatker": {'rarity': 5}, "Cumquatker": {'rarity': 1}, "Thermostatker": {'rarity': 2}, "Aristocratker": {'rarity': 20}};
  const PromoPatkerPack = {"Surprise Patker Promo": {"rarity": 1}}
  const PatkerMoonPack = {"Cloaked Patker": {'rarity': 2}, 'Evil Patker Person': {'rarity': 1}, 'Evil Person Patker': {'rarity': 1}, 'Patker Gang': {'rarity': 2},
  'Patker Jupiter': {'rarity': 5}, 'Patker Mars': {'rarity': 5}, 'Patker Mercury': {'rarity': 5}, 'Patker Moon( Blush)': {'rarity': 10}, 'Patker Moon( Dance)': {'rarity': 10},
  'Patker Moon( Run)': {'rarity': 10}, 'Patker Moon': {'rarity': 20}, 'Patker Reflection': {'rarity': 1}, 'Patker Reveal': {'rarity': 1}, 'Patker Venus': {'rarity': 5},
  'Team Patker': {'rarity': 1}};

  const buyButton = $('.buyButton');
  const packList = $('#packList');
  const openPackList = $('#openPackList');
  const openPackWrapper = $('#openPackWrapper');
  const openPackWrapperFake = $('#openPackWrapperFake');
  const doneText = $('#done');
  const openedCardWrapper = $('.openedCardWrapper');
  const redeem = $('#redeem');
  const redeemForm = $('#redeemForm');
  const redeemDiv = $('#redeemDiv');
  const codeIn = $('#codeIn');
  const redeemResults = $('#redeemResults');

  String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
  }

  function spaceify(s){
    return s.replace(/([A-Z])/g, ' $1').trim();
  }

  function random(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomCard(pack){
    cards = Object.keys(pack);
    return cards[random(0, cards.length)]
  }

  function generatePack(pack){
    tempPack = [];
    for(i = 0; i < 5; i++){
      let card = getRandomCard(pack);
      let rarity = pack[card]['rarity'];
      if(i == 4){
        if(rarity <= 2) i--;
        else{
          if(random(1, rarity) == 1) tempPack.push(card);
          else i--;
        }
      }else{
        if(random(1, rarity) == 1) tempPack.push(card);
        else i--;
      }
    }
    return tempPack;
  }

  function addToCollection(tempcard, tempset){
    $.ajax('addToCollection.php', {
      type: "POST",
      data: {card: `${tempcard}`, set: `${tempset}`},
      success: function(data){
        // console.log(data);
      }
    });
  }

  function openPack(packName, pack){
    $.each(pack, function(index, value){
      value = value.replaceAll(' ', '');
      addToCollection(value, packName);
      openPackList.append(`
        <div class="openedCardWrapper">
          <center><img src="../images/cards/${packName}/PackCover.png" class="openedCard" card="${value}" pack="${packName}"></center>
        </div>
      `);
    });
    openPackWrapperFake.css({'display': 'block'});
    openPackWrapperFake.animate({'opacity': '.4'}, 400);
    setTimeout(function(){
      openPackWrapperFake.css({'display': 'none'});
      openPackWrapper.css({'display': 'flex'});
      $('.openedCardWrapper').animate({'margin-left': '3rem'}, 400);
    }, 400);
  }

  // Generate Pack Listings
  let packsToGen = ['Classic Patker Pack', 'Patkermon Pack', 'PatkerMoonPack'];

  $.each(packsToGen, function(index, value){
    name = value;
    index = name.replaceAll(' ', '');
    size = eval(`Object.keys(${index}).length`);
    packList.append(`
      <div id="${index}" class="packListing">
        <img src="../images/cards/${index}/PackCover.png" class="packCover" />
        <h3 id="${index}Content" class="packName">${name} (${size})</h3>
        <h3 id="${index}Cost" class="packCost">50</h3>
        <h3 id="buy${index}" class="buyButton">Buy</h3>
      </div>
    `);
  });

  $(document).on("click", '.buyButton', function(){
    let pack = eval($(this).parent().attr('id'));
    let tempPack = generatePack(pack);
    // console.log(tempPack);
    openPack($(this).parent().attr('id'), tempPack);
  });
  $(document).on("click", ".openedCard", function(){
    pack = $(this).attr('pack');
    card = $(this).attr('card');
    width = $(this).css('width');
    height = $(this).css('height');
    $('.openedCardWrapper').css({'width': width});
    $(this).css({'height': height});
    $(this).animate({'width': '0px'}, 200);
    thisCard = $(this);
    spaced = spaceify(card);
    setTimeout(function(){
      thisCard.attr('src', `../images/cards/${pack}/${card}.png`);
      if(eval(`${pack}['${spaced}']['rarity']`) == 5) thisCard.addClass('rare');
      else if(eval(`${pack}['${spaced}']['rarity']`) == 10) thisCard.addClass('legendary');
      else if(eval(`${pack}['${spaced}']['rarity']`) == 20) thisCard.addClass('patker');
      thisCard.animate({'width': width}, 200);
    }, 201);
  });
  doneText.click(function(){
    setTimeout(function(){
      openPackWrapper.css({'display': 'none'});
      openPackList.html('');
      openPackWrapperFake.css({'display': 'block'});
      openPackWrapperFake.animate({'opacity': '0'}, 400);
    }, 400);
    setTimeout(function(){
      openPackWrapperFake.css({'display': 'none'})
    }, 800);
    $('.openedCardWrapper').animate({'margin-left': '-10rem'});
  });
  redeem.click(function(){
    redeemDiv.toggleClass('hide');
  });
  redeemForm.submit(function(e){
    e.preventDefault();
    let code = codeIn.val();
    $.ajax('redeem.php', {
      type: "POST",
      data: {code: `${code}`},
      success: function(data){
        console.log(data);
        redeemResults.hide();
        if(data == 'invalid code'){
          redeemResults.text(data);
          redeemResults.show();
        }
        else if(data == 'already redeemed'){
          redeemResults.text(data);
          redeemResults.show();
        }
        else{
          data = JSON.parse(data);
          let tempPack = []
          let packName;
          $.each(data, function(index, value){
            tempPack.push(index);
            packName = value['set'];
          });
          openPack(packName, tempPack);
        }
      }
    })
  });
});
