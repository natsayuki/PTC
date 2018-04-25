<?php
  include($_SERVER['DOCUMENT_ROOT']."/ptc/includes/include.php");
  echo '<script>window.location.href = "../"</script>';
?>
<html>
  <head>
    <meta charset="utf-8" />
    <title>PTC: Sign Up</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <form id="form">
      <center>
        <h3>username</h3>
        <input name="username" type="text" id="usernameIn" />
        <h3>password</h3>
        <input name="password" type="password" id="passwordIn" />
        <br /> <br />
        <button action="submit">submit</button>
        <h3 id="result"></h3>
      </center>
    </form>
  </body>
</html>
