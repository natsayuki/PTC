<?php
  include($_SERVER['DOCUMENT_ROOT']."/ptc/includes/include.php");
  $_SESSION['username'] = '';
  $_SESSION['loggedin'] = false;
  echo '<script>window.location = "../"</script>';
?>
