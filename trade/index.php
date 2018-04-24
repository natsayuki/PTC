<?php
  include($_SERVER['DOCUMENT_ROOT']."/ptc/includes/include.php");
  if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] == false){
    $_SESSION['return'] = 'trade';
    echo '<script>window.location.href = "../"</script>';
  }
?>
<html>
  <head>
    <meta charset="utf-8" />
    <title>PTC: Trade</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="screenDarken"></div>
    <h3 align="center">To</h3>
    <center>
      <input name="to" id="toIn" type="text" />
      <button id="search">search</button>
    </center>
    <form action="trade.php" method="POST" id="form">
      <div id="collectionWrapper">
        <div id="userCollection" class="collection"></div>
        <div id="otherCollection" class="collection"></div>
      </div>
      <div id="offeringWrapper">
        <div id="giveDivWrapper" class="offeringWrapper">
          <h3 align="center">Give</h3>
          <div id="giveDiv" class="offering"></div>
        </div>
        <div id="takeDivWrapper" class="offeringWrapper">
          <h3 align="center">Take</h3>
          <div id="takeDiv" class="offering"></div>
        </div>
      </div>
      <center><button id="sendTrade" action="submit">send trade</button></center>
    </form>
    <h3 align="center" id="resultsText"></h3>
  </body>
</html>
