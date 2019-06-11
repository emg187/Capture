import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Games extends React.Component {
   render(){
       if (!this.props.user.auth){
           return (
               <Redirect to="/account"/>
           );
       }
       this.props.dispatch({
           type: "GAMES"
       });
       return (
            <h3>This is the games page component</h3> 
       );
   }
}

function mapStateToProps(state){
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Games);
