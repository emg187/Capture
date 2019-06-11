import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Matchmaking extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        this.props.dispatch({
            type: "MATCHMAKING"
        });
        if (!this.props.user){
            return (
                <Redirect to="/account"/>
            );
        }
        return (
            <h3>This is the matchmaking page component</h3>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user.auth
    };
}

export default connect(mapStateToProps)(Matchmaking);


