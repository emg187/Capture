import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import StatsModal from "../modals/stats";
import "./landing.css";

class Landing extends React.Component {
    constructor(props){
        super (props);

        this.state = {
            modal: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(){
        this.setState({
            modal: true
        });
    }

    closeModal(){
        this.setState({
            modal: false
        });
    }

    render(){
        this.props.dispatch({
            type: "LANDING"
        });
        return (
            <div>
                <h1>This is the landing page component</h1>
                <Link to="/matchmaking">Matchmaking</Link>
                <Link to="/games">Current Games and Invites</Link>
                <Link to="/friends">Friends List</Link>
                <span onClick={this.openModal} className="landingStats">Your Stats</span>
                <Link to="/howtoplay">How To Play</Link>

                <StatsModal isOpen={this.state.modal} toggle={this.closeModal}/>
            </div>
        );
    }
}

export default connect()(Landing);

