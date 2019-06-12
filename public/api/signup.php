<?php

require_once("mysql.php");
require_once("encrypt.php");

$output = [
    "success"=>false
];

$email = $_POST["email"];
$user_name = $_POST["userName"];
$password = $_POST["password"];

$get_users_query = "SELECT * FROM `users`";
$get_users_result = mysqli_query($conn, $get_users_query);

if (!$get_users_result){
    $output["details"]="failed query";
    print(json_encode($output));
    exit;
}

while ($row = mysqli_fetch_assoc($get_users_result)){
    if ($row["email"]===$email){
        $output["details"]="email taken";
        print(json_encode($output));
        exit;
    }
    if ($row["username"]===$user_name){
        $output["details"]="username taken";
        print(json_encode($output));
        exit;
    }
}

$password = encrypt($password);
$create_user_query = "INSERT INTO `users` (`username`, `cred`, `email`)
                        VALUES ('$user_name', '$password', '$email')";
$create_user_result = mysqli_query($conn, $create_user_query);

if (!$create_user_result || mysqli_affected_rows($conn)!==1){
    $output["details"]="failed query";
    print(json_encode($output));
    exit;
} else {
    $output["success"]=true;
    print(json_encode($output));
    exit;
}


?>

