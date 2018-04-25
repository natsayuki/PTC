<?php
  if ($_SERVER['SERVER_ADDR'] != $_SERVER['REMOTE_ADDR']){
    $this->output->set_status_header(400, 'No Remote Access Allowed');
    exit; //just for good measure
  }
  include($_SERVER['DOCUMENT_ROOT']."/ptc/includes/include.php");
  $tempUsername = mysqli_real_escape_string($conn, $_POST['username']);
  $tempPassword = mysqli_real_escape_string($conn, hash('ripemd160', $_POST['password']));
  $sql = "SELECT * FROM users WHERE username='".$tempUsername."'";
  $results = $conn->query($sql);
  function testUsername($username){
    if(strlen($username) > 16){
      echo 'username must be no more than 16 characters';
      return false;
    }else if(strlen($username) < 4){
      echo 'username must be more than 4 characters';
      return false;
    }else if(strlen($username) != strlen(utf8_decode($username))){
      echo 'username must contain ascii characters';
      return false;
    }
    return true;
  }
  if(!testUsername($tempUsername)){
    null;
  }
  else if($results->num_rows > 0){
    echo 'username already taken';
  }else{
    $sql = "INSERT INTO users (username, password, collection, cash, codes) VALUES ('".$tempUsername."', '".$tempPassword."', '{}', '250', '{}')";
    $results = $conn->query($sql);
    if($conn->error){
      echo $conn->error;
    }
    else{
      $_SESSION['loggedin'] = true;
      $_SESSION['username'] = $tempUsername;
      echo 'success';
    }
  }
?>
