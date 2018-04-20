<?php
  include($_SERVER['DOCUMENT_ROOT']."/ptc/includes/include.php");
?>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Patker Trading Cards</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
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
