import React from "react";
import {connect} from "react-redux";
import {
    Navbar, 
    Nav,
    NavItem
} from "reactstrap";
import "./header.css";
import {Link, withRouter} from "react-router-dom";

class Header extends React.Component {
    constructor(props){
        super(props);

        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignIn(){

    }

    handleSignOut(){
        
    }

    render(){
        return (
            <div>
                <Navbar expand={true}>
                    <Nav className="ml-auto">
                        <NavItem>
                            <span onClick={this.handleSignOut} className="navLink">Sign Out</span>
                        </NavItem>
                    </Nav>
                </Navbar>
                <h3 className="text-center">Capture</h3>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        landing: state.landing
    };
}

export default connect(mapStateToProps)(withRouter(Header));


