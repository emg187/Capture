<?php

require_once("mysql.php"); //contains $conn, our connection to the database

$output = [
    "success"=>false
];

$username = $_POST["username"];
$password = $_POST["password"];

$user_query = "SELECT * FROM `users` WHERE `username`='$username'";
$user_query_result = mysqli_query($conn, $user_query);

if (!$user_query_result){
    $output["details"] = "failed query";
    print(json_encode($output));
    exit;
}
if (mysqli_num_rows($user_query_result)===0){
    print(json_encode($output));
    exit;
}

$data = mysqli_fetch_assoc($user_query_result);
if (password_verify($password, $data["password"])){
    $output["success"] = true;
    print(json_encode($output));
    exit;
} 

print(json_encode($output));
exit;

?>

