import React from "react";
import {
    Nav, 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem
} from "reactstrap";
import {Link} from "react-router-dom";

class MenuNav extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            dropdown: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
            dropdown: !this.state.dropdown
        });
    }

    render(){
        return (
            <Nav className="justify-content-end">
                <Dropdown isOpen={this.state.dropdown} toggle={this.toggle}>
                    <DropdownToggle caret>
                        Menu
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><Link to="/">Home</Link></DropdownItem>
                        <DropdownItem><Link to="/matchmaking">{this.props.page==="matchmaking" ? null : "Matchmaking"}</Link></DropdownItem>
                        <DropdownItem><Link to="/games">{this.props.page==="games" ? null : "Games"}</Link></DropdownItem>
                        <DropdownItem><Link to="/friends">{this.props.page==="friends" ? null : "Friends"}</Link></DropdownItem>
                        <DropdownItem><span onClick={this.props.openModal}>Your Stats</span></DropdownItem>
                        <DropdownItem><Link to="/howtoplay">{this.props.page==="howtoplay" ? null : "How To Play"}</Link></DropdownItem>
                        <DropdownItem><Link to="/account">Sign Out</Link></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Nav>
        );
    }
}

export default MenuNav;

