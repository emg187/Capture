<?php

require_once("mysql.php");
$output = [];

if (!$conn){
    $output["success"] = false;
    $output["details"] = "failed connection";
    print(json_encode($output));
    exit;
}

if ($_POST["update"]){
    $opponentA = $_POST["opponentA"];
    $opponentB = $_POST["opponentB"];

    if ($_POST["type"]==="add"){
        $add_game_query = "INSERT INTO `games` (`opponentA`, `opponentB`) VALUES ('$opponentA', '$opponentB')";
        $add_game_result = mysqli_query($conn, $add_game_query);
        if (!$add_game_result || mysqli_affected_rows($conn)!==1){
            $output["success"] = false;
            $output["details"] = "failed query";
            print(json_encode($output));
            exit;
        }

        $ouput["success"] = true;
        print(json_encode($output));
        exit;
    } else {
        $get_games_query = "SELECT * FROM `games`";
        $get_games_result = mysqli_query($conn, $get_games_query);
        if (!$get_games_result || mysqli_num_rows($get_games_result)===0){
            $output["success"] = false;
            $output["details"] = "failed query";
            print(json_encode($output));
            exit;
        }

        while ($row = mysqli_fetch_assoc($get_games_result)){
            if ($opponentA===$row["opponentA"] || $opponentA===$row["opponentB"]){
                if ($opponentB===$row["opponentA"] || $opponentB===$row["opponentB"]){
                    $id = $row["id"];

                    $remove_game_query = "DELETE FROM `games` WHERE `id`=$id";
                    $remove_game_result = mysqli_query($conn, $remove_game_query);
                    if (!$remove_game_result || mysqli_affected_rows($conn)!==1){
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

        $get_stats_query = "SELECT * FROM `users` WHERE `username`='$opponentA' OR `username`='$opponentB'";
        $get_stats_result = mysqli_query($conn, $get_stats_query);
        if (!$get_stats_result || mysqli_num_rows($get_stats_result)!==2){
            exit;
        }
        
        $row = mysqli_fetch_assoc($get_stats_result)
        if ($row["username"]===$opponentA){
            $statsA = $row["losses"];
            $statsA = $statsA+1;
            $row2 = mysqli_fetch_assoc($get_stats_result);
            $statsB = $row2["wins"];
            $statsB = $statsB+1;
        } else {
            $statsB = $row["wins"];
            $statsB = $statsB+1;
            $row2 = mysqli_fetch_assoc($get_stats_result);
            $statsA = $row2["losses"];
            $statsA = $statsA+1;
        }
        
        $update_statsA_query = "UPDATE `users` SET `losses`=$statsA WHERE `username`='$opponentA'";
        $update_statsB_query = "UPDATE `users` SET `wins`=$statsB WHERE `username`='$opponentB'";
        $update_statsA_result = mysqli_query($conn, $update_statsA_query);
        $update_statsB_result = mysqli_query($conn, $update_statsB_query);
    }
} else {
    $username = $_POST["username"];

    $get_games_query = "SELECT * FROM `games` WHERE `opponentA`='$username' OR `opponentB`='$username'";
    $get_games_result = mysqli_query($conn, $get_games_query);
    if (!$get_games_result){
        $output["success"] = false;
        $output["details"] = "failed query";
        print(json_encode($output));
        exit;
    }
    if (mysqli_num_rows($get_games_result)===0){
        $output["success"] = false;
        $output["details"] = "no games";
        print(json_encode($output));
        exit;
    }

    $output["success"] = true;
    $output["games"] = [];
    while ($row = mysqli_fetch_assoc($get_games_result)){
        if ($username===$row["opponentA"]){
            $output["games"][] = $row["opponentB"];
        } else {
            $output["games"][] = $row["opponentA"];
        }
    }
    print(json_encode($output));
    exit;
}

?>

