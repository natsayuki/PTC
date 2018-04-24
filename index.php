<?php
  include($_SERVER['DOCUMENT_ROOT']."/ptc/includes/include.php");

  if(isset($_SESSION['return'])){
    echo '<script>let sessionReturn = "'.$_SESSION['return'].'";</script>';
    unset($_SESSION['return']);
  }
?>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Patker Trading Cards</title>
    <link rel="stylesheet" href="style.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div id="alert">
      <h1 align="center" id="alertText"></h1>
    </div>
    <div id="loginSignupWrapper">
      <?php
        if(!isset($_SESSION['loggedin']) || !$_SESSION['loggedin']){
          echo '
              <a style="display: inline-block;" href="login"><h3>Log In</h3></a>
              <a style="display: inline-block;" href="signup"><h3>Sign Up</h3></a>
          ';
        }else{
          echo '
            <a style="display: inline-block;" href="user"><h3>'.$_SESSION['username'].'</h3></a>
            <a style="display: inline-block;" href="signout"><h3>Sign Out</h3></a>
          ';
        }
      ?>
    </div>
    <h1 align="center">Patker Trading Cards</h1>
    <a href="store"><h1 align="center">Store</h1></a>
    <a href="trade"><h1 align="center">Trade</h1></a>
  </body>
</html>
