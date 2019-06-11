import React from "react";
import {connect} from "react-redux";

class HowToPlay extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        this.props.dispatch({
            type: "HOWTOPLAY"
        });
        return (
            <h3>This is the how to play page component</h3>
        );
    }
}


export default connect()(HowToPlay);
