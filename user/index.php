<?php
  include($_SERVER['DOCUMENT_ROOT']."/ptc/includes/include.php");
  if(!$_SESSION['loggedin']){
    echo '<script>window.location = "../"</script>';
  }
  echo '<script>username = "'.$_SESSION['username'].'"</script>';
?>
<html>
  <head>
    <title>PTC: <?php echo $_SESSION['username']; ?></title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="viewDarken"></div>
    <div id="linkWrapper" align="right">
      <a href="trades" style="display: inline-block;"><h3 align="right">Trades</h3></a>
      <a href="../store" style="display: inline-block;"><h3 align="right">Store</h3></a>
    </div>
    <h1 align="center"><?php echo $_SESSION['username'] ?></h1>
    <h1 align="center" id="cashText">cash: 0</h1>
    <div>
      <center id="collectionWrapper"></center>
    </div>
  </body>
</html>
