<?php

  header('Content-type: application/json');
  $connection = getBDConnection();
  $action = $_GET['action'];
  switch ($action) {
    case 'players':
      $playerName = $_GET['name'];
      $query = "SELECT id, name FROM player WHERE name ='".$playerName."'";
      $result = mysqli_query($connection, $query);
      echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
      break;
    case 'scores':
      $query = "SELECT score, p.name FROM highscore INNER JOIN player as p ON highscore.player = p.id ORDER BY score DESC LIMIT 10";
      $result = mysqli_query($connection, $query);
      echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
      break;
    case 'newplayer':
      $playerName = $_GET['name'];
      $query = "SELECT id, name FROM player WHERE name ='".$playerName."'";
      $result = mysqli_query($connection, $query);
      $count = count(mysqli_fetch_all($result, MYSQLI_ASSOC));
      if ($count == 0) {
        $query = "INSERT INTO player (name) VALUES ('".$playerName."')";
        $result = mysqli_query($connection, $query);
        echo json_encode($result);
      }
      else {
        echo "ya existia";
      }
      break;
    default:
      echo "eh we te falta el action";
      break;
  }

  function getBDConnection(){
    $user = 'root';
    $password = '';
    $hosts = 'localhost';
    $dbname = 'web_racers';

    $conn = mysqli_connect($hosts, $user, $password, $dbname);
    if(!$conn){
      die('connection failed: '.mysqli_connect_error());
    }
    else{
      return $conn;
    }
  }
 ?>
