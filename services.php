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
        echo json_encode("ya existia");
      }
      break;
    case 'checkScores':
      $score = $_GET['score'];
      $playerName = $_GET['name'];
      $query = "SELECT score FROM highscore WHERE score >'".$score."'";
      $result = mysqli_query($connection, $query);
      $count = count(mysqli_fetch_all($result, MYSQLI_ASSOC));
      $userquery = "SELECT id FROM player WHERE name = '".$playerName."'";
      $resultUser = mysqli_query($connection, $userquery);
      $id = mysqli_fetch_all($resultUser, MYSQLI_ASSOC)[0]['id'];
      $status = (object)array(
        'status' => true
      );
      if ($count < 10) {
        $scoreQuery = "INSERT INTO highscore (score, player) VALUES(".$score.",".$id.")";
        $resultScore = mysqli_query($connection, $scoreQuery);
        echo json_encode($status);
      }
      else{
        $status->status = false;
        echo json_encode($status);
      }
      break;
    default:
      echo "eh we te falta el action";
      break;
  }

  function getBDConnection(){
    // $user = 'root';
    // $password = '';
    // $hosts = 'localhost';
    $user = 'epizz_22239182';
    $password = '2DUtPQiLbAGr';
    $hosts = 'sql103.epizy.com';
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
