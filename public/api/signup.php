<?php

require_once("mysql.php");
$output = [
    "success"=>false, 
    "details"=>"failed query"
];
if (!$conn){
    $output["details"] = "failed connection";
    print(json_encode($output));
    exit;
}

$username = filter_var($_POST["username"], FILTER_SANITIZE_STRING);

$get_users_query = "SELECT * FROM `users`";
$get_users_result = mysqli_query($conn, $get_users_query);

if (!$get_users_result){
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

$password = filter_var($_POST["password"], FILTER_SANITIZE_STRING);
$password = password_hash($password, PASSWORD_BCRYPT);
$token = uniqid("", true);
$wins = 0;
$losses = 0;

if ($statement = mysqli_prepare($conn, "INSERT INTO `users` (`username`, `password`, `token`, `wins`, `losses`) VALUES (?, ?, ?, ?, ?)")){
    mysqli_stmt_bind_param($statement, "sssii", $username, $password, $token, $wins, $losses);
    mysqli_stmt_execute($statement);

    if (mysqli_affected_rows($conn)!==1){
        print(json_encode($output));
        exit;
    }

    $id = mysqli_insert_id($conn);
    $output["success"] = true;
    $output["id"] = $id;

    mysqli_stmt_close($statement);
    print(json_encode($output));
    exit;
}
print(json_encode($output));
exit;

?>

