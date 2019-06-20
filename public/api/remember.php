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

$username = $_POST["username"];
$username = filter_var($username, FILTER_SANITIZE_STRING);

if ($statement = mysqli_prepare($conn, "SELECT * FROM `users` WHERE `username`=?")){
    mysqli_stmt_bind_param($statement, "s", $username);
    mysqli_stmt_execute($statement);
    if ($result = mysqli_stmt_get_result($statement)){
        $row = mysqli_fetch_assoc($result);
        $id = $row["id"];

        $cookie = uniqid("", true);
        $update_cookie_query = "UPDATE `users` SET `cookie`='$cookie' WHERE `id`=$id";
        $update_cookie_result = mysqli_query($conn, $update_cookie_query);

        if (!$update_cookie_result || mysqli_affected_rows($conn)!==1){
            print(json_encode($output));
            exit;
        }

        $cookie_value = $id . ":" . $cookie;
        $options = [
            "expires"=>time()+(60*60*24*30),
            "httponly"=>true
        ];
        setcookie("capture", $cookie_value, $options);
    }
    print(json_encode($output));
    exit;
}
print(json_encode($output));
exit;

?>


