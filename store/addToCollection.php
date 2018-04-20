<?php
  include($_SERVER['DOCUMENT_ROOT']."/ptc/includes/include.php");
  $card = $_POST['card'];
  $set = $_POST['set'];
  if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] == false){
    echo 'Error: Not logged in';
  }else{
    $tempUsername = mysqli_real_escape_string($conn, $_SESSION['username']);
    $sql = 'SELECT * FROM users WHERE username="'.$tempUsername.'"';
    $results = $conn->query($sql);
    if($results->num_rows > 0){
      $currCollection = ($results->fetch_assoc())['collection'];
      $currCollection = json_decode($currCollection, true);
      if(array_key_exists($card, $currCollection) && $currCollection[$card]['set'] == $set){
        $currCollection[$card] = array('amount' => ($currCollection[$card]['amount'] + 1), 'set' => $set);
      }
      else{
        $currCollection[$card] = array('amount' => 1, "set" => $set);
      }
      $sql = 'UPDATE users SET collection="'.mysqli_real_escape_string($conn, json_encode($currCollection)).'" WHERE username="'.$tempUsername.'"';
      $results = $conn->query($sql);
      if($conn->error){
        echo $conn->error;
      }else{
        echo 'success';
      }
    }
  }
?>
