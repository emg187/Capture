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

$token_query = "INSERT INTO `tokens` (`user`, `token`) 
                    VALUES ('$userName', '$token')";
$token_query_result = mysqli_query($conn, $token_query);

if ($token_query_result && mysqli_affected_rows($conn)===1){
    $output["success"] = true;
    print(json_encode($output));
    exit;
}

print(json_encode($output));
exit;

?>


