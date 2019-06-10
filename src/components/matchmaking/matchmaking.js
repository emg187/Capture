import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Matchmaking extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        if (!this.props.user.auth){
            return (
                <Redirect to="/signin"/>
            );
        }
        return (
            <h3>This is the matchmaking page component</h3>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Matchmaking);


