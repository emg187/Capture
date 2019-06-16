<?php

require_once("mysql.php");
require_once("token.php");

$output = [
    "success"=>false
];

if (isset($_COOKIE["captureUsername"]) && isset($_COOKIE["captureToken"])){
    $username = $_COOKIE["captureUsername"];
    $token = $_COOKIE["captureToken"];

    $check_token_query = "SELECT * FROM `tokens` WHERE `username`='$username'";
    $check_token_result = mysqli_query($conn, $check_token_query);
    if (!$check_token_result){
        $output["details"] = "failed query";
        print(json_encode($output));
        exit;
    }
    if (mysqli_num_rows($check_token_result)!==1){
        print(json_encode($output));
        exit;
    }

    $data = mysqli_fetch_assoc($check_token_result);
    if ($data["token"]===$token){
        $new_token = token();
        
        $update_token_query = "UPDATE `tokens` SET `token`='$new_token' WHERE `username`='$username'";
        $update_token_result = mysqli_query($conn, $update_token_query);
        if (!$update_token_result || mysqli_affected_rows($conn)!==1){
            $output["details"] = "failed query";
            print(json_encode($output));
            exit;
        }

        setcookie("captureUsername", $username, time()+60*60*24*30);
        setcookie("captureToken", $new_token, time()+60*60*24*30);
        $output["success"] = true;
        $output["username"] = $username;
        print(json_encode($output));
        exit;
    }

    print(json_encode($output));
    exit;
}

print(json_encode($output));
exit;

?>

