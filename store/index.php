<?php
  include($_SERVER['DOCUMENT_ROOT']."/PTC/includes/include.php");
  if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] == false){
    echo '<script>window.location.href = "../"</script>';
  }
?>
<html>
  <head>
    <title>PTC: Store</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <a href="../user"><h3 align="right"><?php echo $_SESSION['username']; ?></h3></a>
    <div id="openPackWrapper">
      <div id="openPackList"></div>
      <div id="doneWrapper"><center><h1 id="done">done</h1></center></div>
    </div>
    <div id="packList"></div>
  </body>
</html>
