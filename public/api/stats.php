<?php

require_once("mysql.php");
$output = [
    "success"=>false
];

if (!$conn){
    $output["details"] = "failed connection";
    print(json_encode($output));
    exit;
}

$username = $_POST["username"];

if ($_POST["update"]){

    $get_stats_query = "SELECT * FROM `users` WHERE `username`='$username'";
    $get_stats_result = mysqli_query($conn, $get_stats_query);
    if (!$get_stats_result || mysqli_num_rows($get_stats_result)!==1){
        exit;
    }

    $data = mysqli_fetch_assoc($get_stats_result);
    if ($_POST["result"]==="win"){
        $current = $data["wins"];
        $current = $current+1;

        $update_stats_query = "UPDATE `users` SET `wins`=$current WHERE `username`='$username'";
        $update_stats_result = mysqli_query($conn, $update_stats_query);

        if (!$update_stats_result || mysqli_affected_rows($conn)!==1){
            exit;
        }
    } else {
        $current = $data["losses"];
        $current = $current+1;

        $update_stats_query = "UPDATE `users` SET `losses`=$current WHERE `username`='$username'";
        $update_stats_result = mysqli_query($conn, $update_stats_query);

        if (!$update_stats_result || mysqli_affected_rows($conn)!==1){
            exit;
        }
    }
} else {
    $get_stats_query = "SELECT * FROM `users` WHERE `username`='$username'";
    $get_stats_result = mysqli_query($conn, $get_stats_query);
    if (!$get_stats_result || mysqli_num_rows($get_stats_result)!==1){
        $output["details"] = "failed query";
        print(json_encode($output));
        exit;
    }

    $data = mysqli_fetch_assoc($get_stats_result);
    $output["success"] = true;
    $output["wins"] = $data["wins"];
    $output["losses"] = $data["losses"];
    print(json_encode($output));
    exit;
}

?>


