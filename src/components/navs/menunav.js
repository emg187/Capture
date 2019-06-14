import React from "react";
import {Link} from "react-router-dom";

class MenuNav extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <ul className="nav">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown">Menu</a>
                    <div className="dropdown-menu">
                        <Link to="/">Home</Link>
                        <Link to="/matchmaking" className="dropdown-item">{this.props.page==="matchmaking" ? null : "Matchmaking"}</Link>
                        <Link to="/games" className="dropdown-item">{this.props.page==="games" ? null : "Games"}</Link>
                        <Link to="/friends" className="dropdown-item">{this.props.page==="friends" ? null : "Friends"}</Link>
                        <span onClick={this.props.openModal} className="dropdown-item">Your Stats</span>
                        <Link to="/howtoplay" className="dropdown-item">{this.props.page==="howtoplay" ? null : "How To Play"}</Link>
                        <Link to="/account" className="dropdown-item">Sign Out</Link>
                    </div>
                </li>
            </ul>
        );
    }
}

