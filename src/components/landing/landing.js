import React from "react";
import {Link} from "react-router-dom";

import {Modal, ModalHeader} from "reactstrap";
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
        return (
            <div>
                <h1>This is the landing page component</h1>
                <Link to="/matchmaking">Matchmaking</Link>
                <Link to="/games">Current Games and Invites</Link>
                <Link to="/friends">Friends List</Link>
                <span className="landingStats" onClick={this.openModal}>Your Stats</span>
                <Link to="/howtoplay">How To Play</Link>

                <Modal isOpen={this.state.modal} className="landingStatsModal">
                    <ModalHeader toggle={this.closeModal}>This is the "your stats" modal</ModalHeader>
                </Modal>
            </div>
        );
    }
}

export default Landing;
