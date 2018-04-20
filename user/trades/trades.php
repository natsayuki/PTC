<?php
  include($_SERVER['DOCUMENT_ROOT']."/ptc/includes/include.php");
  $type = $_POST['type'];

  if($type == 'incoming'){
    $tempUsername = mysqli_real_escape_string($conn, $_SESSION['username']);
    $sql = 'SELECT * FROM trades WHERE touser="'.$tempUsername.'"';
    $results = $conn->query($sql);
    if($conn->error){
      echo $conn->error;
    }else{
      $json = array();
      while($rows = $results->fetch_assoc()){
        $temp = array('to' => $rows['touser'], 'from' => $rows['fromuser'], 'give' => json_decode($rows['give']), 'take' => json_decode($rows['take']), 'key' => $rows['key']);
        array_push($json, $temp);
      }
      echo json_encode($json);
    }
  }
  else if($type == 'accept'){
    $key = $_POST['key'];
    $sql = 'SELECT * FROM trades WHERE `key`="'.$key.'"';
    $results = $conn->query($sql);
    if($conn->error){
      echo $conn->error;
    }
    else{
      $rows = $results->fetch_assoc();
      $give = json_decode($rows['give'], true);
      $take = json_decode($rows['take'], true);
      $to = $rows['touser'];
      $from = $rows['fromuser'];
      $key = $rows['key'];
      $sql = 'SELECT * FROM users WHERE username="'.$to.'"';
      $results = $conn->query($sql);
      $giveCollection = json_decode(($results->fetch_assoc())['collection'], true);
      if($conn->error) echo $conn->error;
      $sql = 'SELECT * FROM users WHERE username="'.$from.'"';
      $results = $conn->query($sql);
      $collection = json_decode(($results->fetch_assoc())['collection'], true);
      if($conn->error) echo $conn->error;
      $dont = false;
      foreach($give as $item => $value){
        if(array_key_exists($item, $giveCollection)){
          if($collection[$item]['amount'] > 0){
            $giveCollection[$item]['amount'] += $give[$item]['amount'];
            $collection[$item]['amount'] -= $give[$item]['amount'];
            if($collection[$item]['amount'] == 0){
              unset($collection[$item]);
            }
          }
          else $dont = true;
        }
        else{
          if($collection[$item]['amount'] > 0){
            $giveCollection[$item] = array('amount' => $give[$item]['amount'], 'set' => $collection[$item]['set']);
            $collection[$item]['amount'] -= $give[$item]['amount'];
            if($collection[$item]['amount'] == 0){
              unset($collection[$item]);
            }
          }
          else $dont = true;
        }
      }
      foreach($take as $item => $value){
        if(array_key_exists($item, $collection)){
          if($giveCollection[$item]['amount'] > 0){
            $collection[$item]['amount'] += $take[$item]['amount'];
            $giveCollection[$item]['amount'] -= $take[$item]['amount'];
            if($giveCollection[$item]['amount'] == 0){
              unset($giveCollection[$item]);
            }
          }
          else $dont = true;
        }
        else{
          if($giveCollection[$item]['amount'] > 0){
            $collection[$item] = array('amount' => $take[$item]['amount'], 'set' => $giveCollection[$item]['set']);
            $giveCollection[$item]['amount'] -= $take[$item]['amount'];
            if($giveCollection[$item]['amount'] == 0){
              unset($giveCollection[$item]);
            }
          }
          else $dont = true;
        }
      }
      if(!$dont){
        $sql = 'UPDATE users SET collection="'.mysqli_real_escape_string($conn, json_encode($giveCollection)).'" WHERE username="'.$to.'"';
        $results = $conn->query($sql);
        if($conn->error) echo $conn->error;

        $sql = 'UPDATE users SET collection="'.mysqli_real_escape_string($conn, json_encode($collection)).'" WHERE username="'.$from.'"';
        $results = $conn->query($sql);
        if($conn->error) echo $conn->error;

        $sql = 'DELETE FROM trades WHERE `key`="'.$key.'"';
        $results = $conn->query($sql);
        if($conn->error) echo $conn->error;
      }
      if($dont){
        echo 'not enough cards';
        $sql = 'DELETE FROM trades WHERE `key`="'.$key.'"';
        $results = $conn->query($sql);
        if($conn->error) echo $conn->error;
      }
    }
  }
  else if($type == 'decline'){
    $key = $_POST['key'];
    $sql = 'DELETE FROM trades WHERE `key`="'.$key.'"';
    $results = $conn->query($sql);
    if($conn->error){
      echo $conn->error;
    }
    else{
      echo 'successfuly declined';
    }
  }
?>
