<?php

require_once("mysql.php");

$output = [
    "success"=>false
];

$username = $_POST["username"];
$password = $_POST["password"];

$get_users_query = "SELECT * FROM `users`";
$get_users_result = mysqli_query($conn, $get_users_query);

if (!$get_users_result){
    $output["details"] = "failed query";
    print(json_encode($output));
    exit;
}

while ($row = mysqli_fetch_assoc($get_users_result)){
    if ($row["username"]===$username){
        $output["details"]="username taken";
        print(json_encode($output));
        exit;
    }
}

$password = password_hash($password, PASSWORD_BCRYPT);
$create_user_query = "INSERT INTO `users` (`username`, `password`, `wins`, `losses`)
                        VALUES ('$username', '$password', 0, 0)";
$create_user_result = mysqli_query($conn, $create_user_query);

if ($create_user_result && mysqli_affected_rows($conn)===1){
    $output["success"]=true;
    print(json_encode($output));
    exit;
}

$output["details"] = "failed query";
print(json_encode($output));
exit;

?>

