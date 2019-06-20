<?php

require_once("mysql.php");
$output = [
    "success"=>false, 
    "details"=>"failed query";
];

if (!$conn){
    $output["details"] = "failed connection";
    print(json_encode($output));
    exit;
}

if ($_POST["update"]){
    $id = (int)$_POST["id"];
    $token = filter_var($_POST["token"], FILTER_SANITIZE_STRING);

    if ($statement = mysqli_prepare($conn, "SELECT * FROM `users` WHERE `id`=?")){
        mysqli_stmt_bind_param($statement, "i", $id);
        mysqli_stmt_execute($statement);
        if ($result = mysqli_stmt_get_result($statement)){
            $row = mysqli_fetch_assoc($result);
            if ($row["token"]===$token && $_POST["result"]==="win"){
                $wins = $row["wins"] + 1;
            } else if ($row["token"]===$token && $_POST["result"]==="loss"){
                $losses = $row["losses"] + 1;
            }
        } else {
            mysqli_stmt_close($statement);
            print(json_encode($output));
            exit;
        }

        if ($wins){
            $update_stats_query = "UPDATE `users` SET `wins`=$wins WHERE `id`=$id";
        } else if ($losses){
            $update_stats_query = "UPDATE `users` SET `losses`=$losses WHERE `id`=$id";
        }

        $update_stats_result = mysqli_query($conn, $update_stats_query);
        if (!$update_stats_result || mysqli_affected_rows($conn)!==1){
            mysqli_stmt_close($statement);
            print(json_encode($output));
            exit;
        }
        $output["success"] = true;

        mysqli_stmt_close($statement);
        print(json_encode($output));
        exit;
    } else {
        print(json_encode($output));
        exit;
    }
} else {
    $username = filter_var($_POST["username"], FILTER_SANITIZE_STRING);

    if ($statement = mysqli_prepare($conn, "SELECT * FROM `users` WHERE `username`=?")){
        mysqli_stmt_bind_param($statement, "s", $username);
        mysqli_stmt_execute($statement);
        if ($result = mysqli_stmt_get_result($statement)){
            $row = mysqli_fetch_assoc($result);
            $wins = $row["wins"];
            $losses = $row["losses"];

            $output["success"] = true;
            $output["wins"] = $wins;
            $output["losses"] = $losses;

            mysqli_stmt_close($statement);
            print(json_encode($output));
            exit;
        } else {
            mysqli_stmt_close($statement);
            print(json_encode($output));
            exit;
        }
    } else {
        print(json_encode($output));
        exit;
    }
}

?>


