<?php

require_once("mysql.php");
$output = [];

if (!$conn){
    $output["success"] = false;
    $output["details"] = "failed connection";
    print(json_encode($output));
    exit;
}

if ($_POST["search"]){
    $username = $_POST["username"];

    $check_users_query = "SELECT * FROM `users` WHERE `username`='$username'";
    $check_users_result = mysqli_query($conn, $check_users_query);
    if (!$check_users_result){
        $output["success"] = false;
        $output["details"] = "failed query";
        print(json_encode($output));
        exit;
    }
    if (mysqli_num_rows($check_users_result)!==1){
        $output["success"] = false;
        $output["details"] = "no user";
        print(json_encode($output));
        exit;
    }

    $output["success"] = true;
    print(json_encode($output));
    exit;
} else if ($_POST["update"]){
    $friendA = $_POST["friendA"];
    $friendB = $_POST["friendB"];

    if ($_POST["type"]==="add"){
        $add_friend_query = "INSERT INTO `friends` (`friendA`, `friendB`) VALUES ('$friendA', '$friendB')";
        $add_friend_result = mysqli_query($conn, $add_friend_query);
        if (!$add_friend_result || mysqli_affected_rows($conn)!==1){
            $output["success"] = false;
            $output["details"] = "failed query";
            print(json_encode($output));
            exit;
        }

        $ouput["success"] = true;
        print(json_encode($output));
        exit;
    } else {
        $get_friends_query = "SELECT * FROM `friends`";
        $get_friends_result = mysqli_query($conn, $get_friends_query);
        if (!$get_friends_result || mysqli_num_rows($get_friends_result)===0){
            $output["success"] = false;
            $output["details"] = "failed query";
            print(json_encode($output));
            exit;
        }

        while ($row = mysqli_fetch_assoc($get_friends_result)){
            if ($friendA===$row["friendA"] || $friendA===$row["friendB"]){
                if ($friendB===$row["friendA"] || $friendB===$row["friendB"]){
                    $id = $row["id"];

                    $remove_friend_query = "DELETE FROM `friends` WHERE `id`=$id";
                    $remove_friend_result = mysqli_query($conn, $remove_friend_query);
                    if (!$remove_friend_result || mysqli_affected_rows($conn)!==1){
                        $output["success"] = false;
                        $output["details"] = "failed query";
                        print(json_encode($output));
                        exit;
                    }

                    $output["success"] = true;
                    print(json_encode($output));
                    exit;
                }
            }
        }
    }
} else {
    $username = $_POST["username"];

    $get_friends_query = "SELECT * FROM `friends` WHERE `friendA`='$username' OR `friendB`='$username'";
    $get_friends_result = mysqli_query($conn, $get_friends_query);
    if (!$get_friends_result){
        $output["success"] = false;
        $output["details"] = "failed query";
        print(json_encode($output));
        exit;
    }
    if (mysqli_num_rows($get_friends_result)===0){
        $output["success"] = false;
        $output["details"] = "no friends";
        print(json_encode($output));
        exit;
    }

    $output["success"] = true;
    $output["friends"] = [];
    while ($row = mysqli_fetch_assoc($get_friends_result)){
        if ($username===$row["friendA"]){
            $output["friends"][] = $row["friendB"];
        } else {
            $output["friends"][] = $row["friendA"];
        }
    }
    print(json_encode($output));
    exit;
}

?>

