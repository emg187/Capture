<?php

require_once("mysql.php");
require_once("token.php");

$output = [
    "success"=>false
];

$userName = $_POST["userName"];
$token = token();

setcookie("captureUsername", $userName, time()+(60*60*24*30));
setcookie("captureToken", $token, time()+(60*60*24*30));

$check_token_query = "SELECT * FROM `tokens` WHERE `username`='$userName'";
$check_token_result = mysqli_query($conn, $check_token_query);
if (!$check_token_result){
    $output["details"] = "failed query";
    print(json_encode($output));
    exit;
}

if (mysqli_num_rows($check_token_result)!==1){
    $new_token_query = "INSERT INTO `tokens` (`username`, `token`) 
                        VALUES ('$userName', '$token')";
    $new_token_result = mysqli_query($conn, $new_token_query);

    if ($new_token_result && mysqli_affected_rows($conn)===1){
        $output["success"] = true;
        print(json_encode($output));
        exit;
    } else {
        $output["details"] = "failed query";
        print(json_encode($output));
        exit;
    }
} else {
    $update_token_query = "UPDATE `tokens` SET `token`='$token' WHERE `username`='$userName'";
    $update_token_result = mysqli_query($conn, $update_token_query);
    if (!$update_token_result || mysqli_affected_rows($conn)!==1){
        $output["details"] = "failed query";
        print(json_encode($output));
        exit;
    } else {
        $output["success"] = true;
        print(json_encode($output));
        exit;    
   }
}

?>


