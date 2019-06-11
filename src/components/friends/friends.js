import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Friends extends React.Component {
    render(){
        if (!this.props.user){
            return (
                <Redirect to="/account"/>
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
        user: state.user.auth
    };
}

export default connect(mapStateToProps)(Friends);

