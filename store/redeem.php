<?php
  include($_SERVER['DOCUMENT_ROOT']."/ptc/includes/include.php");

  $code = mysqli_real_escape_string($conn, $_POST['code']);

  $sql = 'SELECT * FROM codes WHERE code="'.$code.'"';
  $results = $conn->query($sql);
  if($results->num_rows > 0){
    $codeCollection = ($results->fetch_assoc())['collection'];
    $sql = 'SELECT * FROM users WHERE username="'.$_SESSION['username'].'"';
    $results = $conn->query($sql);
    $codes = json_decode(($results->fetch_assoc())['codes'], true);
    if(in_array($code, $codes)){
      echo 'already redeemed';
    }
    else{
      echo $codeCollection;
      array_push($codes, $code);
      $codes = mysqli_real_escape_string($conn, json_encode($codes));
      $sql = 'UPDATE users SET codes="'.$codes.'" WHERE username="'.$_SESSION['username'].'"';
      $results = $conn->query($sql);
      if($conn->error) echo $conn->error;
    }
  }
  else{
    echo 'invalid code';
  }
?>
