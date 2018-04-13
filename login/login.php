<?php
  include($_SERVER['DOCUMENT_ROOT']."/PTC/includes/include.php");
  $tempUsername = mysqli_real_escape_string($conn, $_POST['username']);
  $tempPassword = mysqli_real_escape_string($conn, hash('ripemd160', $_POST['password']));

  $sql = "SELECT * FROM users WHERE username='".$tempUsername."'";
  $results = $conn->query($sql);
  if($results->num_rows > 0){
    while($rows = $results->fetch_assoc()){
      if($rows['password'] == $tempPassword){
        echo 'log in successful';
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $tempUsername;
      }else{
        echo 'username or password is incorrect';
      }
    }
  }else{
    echo 'username or password is incorrect';
  }







?>
