<?php

function token(){
    $char_set = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $token = "";

    for ($index=0; $index<20; $index++){
        $rand = rand(0, strlen($char_set)-1);
        $token .= $char_set[$rand];
    }

    return $token;
}

?>

