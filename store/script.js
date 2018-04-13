$(document).ready(function(){
  const ClassicPatkerPack = {"Original Patker": {"rarity": 1}, "Side Patker": {"rarity": 2}, "Good Boy Patker": {"rarity": 5},
  "Surprise Patker": {"rarity": 20}};
  const PatkermonPack = {"Batker": {"rarity": 2}, "Catker": {"rarity": 2}, "Doormatker": {"rarity": 5}, "Hatker": {"rarity": 10}, "Ratker": {"rarity": 1},
  "Diplomatker": {'rarity': 5}, "Habitatker": {'rarity': 1}, "Proletariatker": {'rarity': 1}, "Satker": {'rarity': 2}, "Waistcoatker": {'rarity': 1}};

  const buyButton = $('.buyButton');
  const packList = $('#packList');
  const openPackList = $('#openPackList');
  const openPackWrapper = $('#openPackWrapper');
  const doneText = $('#done');


  String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
  };

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
        console.log(data);
      }
    });
  }

  function openPack(packName, pack){
    openPackWrapper.css({'display': 'flex'});
    $.each(pack, function(index, value){
      value = value.replaceAll(' ', '');
      addToCollection(value, packName);
      openPackList.append(`<img src="../images/cards/${packName}/PackCover.png" class="openedCard" card="${value}" pack="${packName}">`);
    });
  }

  // Generate Pack Listings
  let packsToGen = ['Classic Patker Pack', 'Patkermon Pack'];

  $.each(packsToGen, function(index, value){
    name = value;
    index = name.replaceAll(' ', '');
    packList.append(`
      <div id="${index}" class="packListing">
        <img src="../images/cards/${index}/PackCover.png" class="packCover" />
        <h3 id="${index}Content" class="packName">${name}</h3>
        <h3 id="${index}Cost" class="packCost">500</h3>
        <h3 id="buy${index}" class="buyButton">Buy</h3>
      </div>
    `);
  });

  $(document).on("click", '.buyButton', function(){
    let pack = eval($(this).parent().attr('id'));
    let tempPack = generatePack(pack);
    console.log(tempPack);
    openPack($(this).parent().attr('id'), tempPack);
  });
  $(document).on("click", ".openedCard", function(){
    pack = $(this).attr('pack');
    card = $(this).attr('card');
    $(this).attr('src', `../images/cards/${pack}/${card}.png`);
  });
  doneText.click(function(){
    openPackWrapper.css({'display': 'none'});
    openPackList.html('');
  });
});
