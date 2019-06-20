<?php

require_once("mysql.php"); //contains $conn, our connection to the database

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
$password = filter_var($_POST["password"], FILTER_SANITIZE_STRING);

if ($statement = mysqli_prepare($conn, "SELECT * FROM `users` WHERE `username`=?")){
    mysqli_stmt_bind_param($statement, "s", $username);
    mysqli_stmt_execute($statement);
    if ($result = mysqli_stmt_get_result($statement)){
        while ($row = mysqli_fetch_assoc($result)){
            if ($password===$row["password"]){
                $output["success"] = true;
                $output["id"] = $row["id"];

                mysqli_stmt_close($statement);
                print(json_encode($output));
                exit;
            }
        }
        $output["details"] = "no sign in";

        mysqli_stmt_close($statement);
        print(json_encode($output));
        exit;
    }
    mysqli_stmt_close($statement);
    print(json_encode($output));
    exit;
} else {
    print(json_encode($output));
    exit;    
}

?>

