<?php
  include($_SERVER['DOCUMENT_ROOT']."/ptc/includes/include.php");
  $type = $_POST['type'];

  if(!isset($_SESSION['loggedin']) || !$_SESSION['loggedin']){
    echo '<script>window.location.href = "../"</script>';
  }

  if($type == 'search'){
    $tempUsername = mysqli_real_escape_string($conn, $_POST['username']);
    $sql = 'SELECT * FROM users WHERE username="'.$tempUsername.'"';
    $results = $conn->query($sql);
    if($results->num_rows ==  0){
      echo 'No such user';
    }else{
      echo ($results->fetch_assoc())['collection'];
    }
  }else if($type =='self'){
    $tempUsername = mysqli_real_escape_string($conn, $_SESSION['username']);
    $sql = 'SELECT * FROM users WHERE username="'.$tempUsername.'"';
    $results = $conn->query($sql);
    echo ($results->fetch_assoc())['collection'];
  }else if($type == 'trade'){
    $to = mysqli_real_escape_string($conn, $_POST['to']);
    $give = mysqli_real_escape_string($conn, $_POST['give']);
    $take = mysqli_real_escape_string($conn, $_POST['take']);
    $tempUsername = mysqli_real_escape_string($conn, $_SESSION['username']);
    $sql = 'INSERT INTO trades (touser, fromuser, give, take) VALUES ("'.$to.'", "'.$tempUsername.'", "'.$give.'", "'.$take.'")';
    $results = $conn->query($sql);
    if($conn->error) echo $conn->error;
    else echo "success";
  }
?>
