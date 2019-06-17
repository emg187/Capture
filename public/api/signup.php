<?php

require_once("mysql.php");

$output = [
    "success"=>false, 
    "details"=>"failed query"
];

$user_name = $_POST["userName"];
$password = $_POST["password"];

$get_users_query = "SELECT * FROM `users`";
$get_users_result = mysqli_query($conn, $get_users_query);

if (!$get_users_result){
    print(json_encode($output));
    exit;
}

while ($row = mysqli_fetch_assoc($get_users_result)){
    if ($row["username"]===$user_name){
        $output["details"]="username taken";
        print(json_encode($output));
        exit;
    }
}

$password = password_hash($password, PASSWORD_BCRYPT);
$create_user_query = "INSERT INTO `users` (`username`, `cred`)
                        VALUES ('$user_name', '$password')";
$create_user_result = mysqli_query($conn, $create_user_query);

if ($create_user_result && mysqli_affected_rows($conn)===1){
    $output["success"]=true;
    print(json_encode($output));
    exit;
}

print(json_encode($output));
exit;

?>

