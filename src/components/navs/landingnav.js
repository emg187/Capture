import React from "react";
import {
    Nav, 
    NavItem
} from "reactstrap";
import {Link} from "react-router-dom";

export default props=>{
    return (
        <Nav className="justify-content-end">
            <NavItem>
                <Link to="/account">{props.user ? "Sign Out" : "Sign In"}</Link>
            </NavItem>
        </Nav>
    );
}

