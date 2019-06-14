import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {SignInToast} from "../toasts/toasts";
import StatsModal from "../modals/modals";
import "./landing.css";

class Landing extends React.Component {
    constructor(props){
        super (props);

        this.state = {
            toast: false,
            modal: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    toast(){
        this.setState({
            toast: true
        });
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
        return (
            <div>
                <h1>This is the landing page component</h1>
                <Link to="/matchmaking">Matchmaking</Link>
                <Link to="/games">Current Games and Invites</Link>
                <Link to="/friends">Friends List</Link>
                <span onClick={this.openModal} className="landingStats">Your Stats</span>
                <Link to="/howtoplay">How To Play</Link>

                <SignInToast isOpen={this.state.toast}/>
                <StatsModal isOpen={this.state.modal} toggle={this.closeModal}/>
            </div>
        );
    }

    componentDidMount(){
        if (this.props.page==="account" && this.props.user){
            this.toast();
        }
        this.props.dispatch({
            type: "LANDING"
        });
    }
}

function mapStateToProps(state){
    return {
        user: state.user.auth,
        page: state.page.current
    };
}

export default connect(mapStateToProps)(Landing);

