import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Friends extends React.Component {
    render(){
        if (!this.props.user.auth){
            return (
                <Redirect to="/signin"/>
            );
        }
        this.props.dispatch({
            type: "FRIENDS"
        });
        return (
            <h3>This is the friends page component</h3>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Friends);

