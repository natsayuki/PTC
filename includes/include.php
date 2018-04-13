<?php
  // include($_SERVER['DOCUMENT_ROOT']."PTC/includes/include.php");
  session_start();
  $server = "localhost";
  $username = "root";
  $password = "";
  $db = "ptc";

  $conn = new mysqli($server, $username, $password, $db);
?>
