import React from "react";
import {Route} from "react-router-dom";
import $ from "jquery";
import {connect} from "react-redux";

import Header from "./header/header";
import Landing from "./landing/landing";
import Matchmaking from "./matchmaking/matchmaking";
import Games from "./games/games";
import Gameboard from "./gameboard/gameboard";
import Friendslist from "./friends/friends";
import Invites from "./invites/invites";
import HowToPlay from "./howtoplay/howtoplay";
import Account from "./account/account";

class App extends React.Component {
    constructor(props){
        super(props);

        this.checkLogin = this.checkLogin.bind(this);
        this.rememberMe = this.rememberMe.bind(this);
    }

    checkLogin(){
        $.ajax({
            type: "POST",
            url: "/api/checksignin.php",
            success: res=>{
                console.log(JSON.parse(res));
            }
        });
    }

    rememberMe(){
        $.ajax({
            type: "POST", 
            url: "/api/remember.php",
            data: {username: this.props.user},
            success: res=>{
                console.log(JSON.parse(res));
            }
        });
    }

    render(){
        return (
            <div>
                <Header/>
                <Route exact path="/" component={Landing}/>
                <Route path="/matchmaking" component={Matchmaking}/>
                <Route path="/games" component={Games}/>
                <Route path="/gameboard" component={Gameboard}/>
                <Route path="/friends" component={Friendslist}/>
                <Route path="/invites" component={Invites}/>
                <Route path="/howtoplay" component={HowToPlay}/>
                <Route path="/account" render={props=><Account {...props} remember={this.rememberMe}/>}/>
            </div>
        );
    }

    componentDidMount(){
        this.checkLogin();
    }
}

function mapStateToProps(state){
    return {
        user: state.user.userName
    };
}

export default connect(mapStateToProps)(App);

