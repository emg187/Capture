import React from "react";
import {Link} from "react-router-dom";

export default props=>{
    return (
        <ul className="nav justify-content-end">
            <li className="nav-item">
                <Link to="/account">{props.user ? "Sign Out" : "Sign In"}</Link>
            </li>
        </ul>
    );
}


