import React from "react";
import {connect} from "react-redux";

import LandingNav from "../navs/landingnav";
import MenuNav from "../navs/menunav"; 
import "./header.css";
import {Link, withRouter} from "react-router-dom";

class Header extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            dropdown: false, 
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
        if (this.props.page==="account"){
            return (
                <h3 className="text-center">Capture</h3>
            );
        } else if (this.props.page==="landing"){
            return (
                <div>
                    <LandingNav user={this.props.user}/>
                    <h3 className="text-center">Capture</h3>
                </div>
            );
        }
        return (
            <div>
                <MenuNav page={this.props.page} openModal={this.openModal}/>
                <StatsModal isOpen={this.state.modal} toggle={this.closeModal}/>
                <h3 className="text-center">Capture</h3>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user.auth,
        page: state.page.current
    };
}

export default connect(mapStateToProps)(withRouter(Header));


