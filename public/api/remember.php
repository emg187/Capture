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
$token = uniqid("", true);

$options = [
    "expires"=>time()+(60*60*24*30),
    "httponly"=>true
];
setcookie("captureUsername", $username, $options);
setcookie("captureToken", $token, $options);

$update_token_query = "UPDATE `users` SET `token`='$token' WHERE `username`='$username'";
$update_token_result = mysqli_query($conn, $update_token_query);
if (!$update_token_result || mysqli_affected_rows($conn)!==1){
    $output["details"] = "failed query";
    print(json_encode($output));
    exit;
}

?>


