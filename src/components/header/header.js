import React from "react";
import {connect} from "react-redux";
import {
    Nav, 
    NavItem, 
    Dropdown, 
    DropdownToggle, 
    DropdownItem, 
    DropdownMenu
} from "reactstrap";
import "./header.css";
import {Link, withRouter} from "react-router-dom";

class Header extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            dropdown: false, 
            modal: false
        };
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    toggleDropDown(){
        this.setState({
            dropdown: !this.state.dropdown
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

    componentWillUnmount(){

    }

    render(){
        if (this.props.page==="landing"){
            return (
                <div>
                    <Nav className="justify-content-end">
                        <NavItem>
                            <Link to="account">{this.props.user ? "Sign Out" : "Sign In"}</Link>
                        </NavItem>
                    </Nav>
                </div>
            );
        }
        return (
            <div>
                <Nav className="justify-content-end">
                    <Dropdown isOpen={this.state.dropdown} toggle={this.toggleDropDown}>
                        <DropdownToggle caret>
                            Menu
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem><Link to="/">Home</Link></DropdownItem>
                            <DropdownItem><Link to="/matchmaking">{this.props.page==="matchmaking" ? null : "Matchmaking"}</Link></DropdownItem>
                            <DropdownItem><Link to="/games">{this.props.page==="games" ? null : "Games"}</Link></DropdownItem>
                            <DropdownItem><Link to="/friends">{this.props.page==="friends" ? null : "Friends"}</Link></DropdownItem>
                            <DropdownItem><span onClick={this.openModal} className="headerStats">Your Stats</span></DropdownItem>
                            <DropdownItem><Link to="/howtoplay">{this.props.page==="howtoplay" ? null : "How To Play"}</Link></DropdownItem>
                            <DropdownItem><Link to="account">{this.props.user ? "Sign Out" : "Sign In"}</Link></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Nav>

                <Modal isOpen={this.state.modal} className="nonLandingStatsModal">
                    <ModalHeader toggle={this.closeModal}>This is the "your stats" modal</ModalHeader>
                </Modal>

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

