<?php
  include($_SERVER['DOCUMENT_ROOT']."/PTC/includes/include.php");
  $tempUsername = mysqli_real_escape_string($conn, $_POST['username']);
  $type = $_POST['type'];

  if($type == 'cash'){
    $sql = 'SELECT * FROM users WHERE username="'.$tempUsername.'"';
    $results = $conn->query($sql);
    if($results->num_rows > 0){
      while($rows = $results->fetch_assoc()){
        echo $rows['cash'];
      }
    }
  }
  else if($type == 'collection'){
    $sql ='SELECT * FROM users WHERE username="'.$tempUsername.'"';
    $results = $conn->query($sql);
    echo ($results->fetch_assoc())['collection'];
  }
?>
