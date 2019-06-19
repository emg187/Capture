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

if (isset($_COOKIE["capture"]) && !empty($_COOKIE["capture"])){
    $arr = explode(":", $_COOKIE["capture"]);
    $id = $arr[0];
    $id = (int)$id;
    $token = $arr[1];

    if ($statement = mysqli_prepare($conn, "SELECT * FROM `users` WHERE `id`=?")){
        mysqli_stmt_bind_param($statement, "i", $id);
        mysqli_stmt_execute($statement);
        if ($result = mysqli_stmt_get_result($statement)){
            while ($row = mysqli_fetch_assoc($result)){
                if ($token===$row["token"]){
                    $new_token = uniqid("", true);
                    $token_update_query = "UPDATE `users` SET `token`='$new_token' WHERE `id`=$id";
                    $token_update_result = mysqli_query($conn, $token_update_query);

                    if (!$token_update_result || mysqli_affected_rows($conn)!==1){
                        print(json_encode($output));
                        exit;
                    }
                    $cookie_value = $id . ":" . $new_token;
                    $options = [
                        "expires"=>time()+(60*60*24*30),
                        "httponly"=>true
                    ];
                    setcookie("capture", $cookie_value, $options);

                    $output["success"] = true;
                    print(json_encode($output));
                    exit;
                }
            }
            $output["details"] = "no sign in";
            print(json_encode($output));
            exit;
        }
        print(json_encode($output));
        exit;
    }
    print(json_encode($output));
    exit;
} else {
    $output["details"] = "no sign in";
    print(json_encode($output));
    exit;
}

?>

