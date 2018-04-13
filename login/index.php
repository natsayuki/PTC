<?php
  include($_SERVER['DOCUMENT_ROOT']."/PTC/includes/include.php");
?>
<html>
  <head>
    <title>PTC: Log In</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <form action="login.php" method="POST" id="form">
      <center>
        <h3>username</h3>
        <input name="username" id="usernameIn" type="text" />
        <h3>password</h3>
        <input name="password" id="passwordIn" type="password" />
        <br /><br />
        <button action="submit">submit</button>
        <h3 id="result"></h3>
      </center>
    </form>
  </body>
</html>
