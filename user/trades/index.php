<?php
  include($_SERVER['DOCUMENT_ROOT']."/ptc/includes/include.php");
?>
<html>
  <head>
    <title>PTC: Trades</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="darken"></div>
    <div id="tradeFailed"><h1 align="center">not enough cards to complete trade</h1></div>
    <h1 align="center">Incoming Trades</h1>
    <div id="incomingTrades" class="tradeBox"></div>
    <h1 align="center">Outgoing Trades</h1>
    <div id="outgoingTrades" class="tradeBox"></div>
  </body>
</html>
