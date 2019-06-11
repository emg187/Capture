import React from "react";
import {connect} from "react-redux";

class Account extends React.Component {
    constructor(props){
        super(props);

        
    }

    render(){
        this.props.dispatch({
            type: "SIGN_OUT", 
        });
        this.props.dispatch({
            type: "ACCOUNT"
        });
        return (
            <h3>This is the sign in/sign up page component</h3>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.auth
    };
}

export default connect(mapStateToProps)(Account);

