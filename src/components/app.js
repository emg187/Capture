import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import Header from "./header/header";
import Landing from "./landing/landing";
import Matchmaking from "./matchmaking/matchmaking";
import Games from "./games/games";
import Friendslist from "./friends/friends";
import HowToPlay from "./howtoplay/howtoplay";

export default ()=>{
    return (
        <div>
            <Header/>
            <Route exact path="/" component={Landing}/>
            <Route path="/matchmaking" component={Matchmaking}/>
            <Route path="/games" component={Games}/>
            <Route path="/friends" component={Friendslist}/>
            <Route path="/howtoplay" component={HowToPlay}/>
        </div>
    );
}

