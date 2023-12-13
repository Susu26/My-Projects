<?php
    require "debugging.php";

    // DEFAULT ANSWER
    $answer = array(
        "code"=>404,
        "result"=>[]
    );

    // REQUEST for ALL books: /books/
    if( isset($_GET["doorid"]) && filter_var($_GET["doorid"], FILTER_VALIDATE_INT) !== false && $_GET["doorid"] > 0 ) {
        $id = $_GET["doorid"];

        $data = file_get_contents("../data/doorContent.json");
        $doorCon = json_decode($data);

        if($id <= count($doorCon->doors)){
            $answer["code"] = 200;
            array_push($answer["result"], $doorCon->doors[$id - 1]);
        }
        
    }

    
    // SEND JSON
    echo json_encode($answer);

?>