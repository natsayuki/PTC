<?php
  include($_SERVER['DOCUMENT_ROOT']."/PTC/includes/include.php");
  $_SESSION['username'] = '';
  $_SESSION['loggedin'] = false;
  echo '<script>window.location = "../"</script>';
?>
