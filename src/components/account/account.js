import React from "react";
import {connect} from "react-redux";
import $ from "jquery";

import "./account.css";
import SignUpForm from "../forms/signup";
import SignInForm from "../forms/signin";

class Account extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            signUp: false,
            signInCreds: {
                userName: "",
                password: ""
            }, 
            signInError: false,
            signUpCreds: {
                email: "", 
                userName: "", 
                password: "", 
                confirm: "", 
            }, 
            emailError: false, 
            userNameError: false,
            confirmError: false
        };
        this.switchForms = this.switchForms.bind(this);
        this.signInChange = this.signInChange.bind(this);
        this.signUpChange = this.signUpChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    switchForms(){
        this.setState({
            signUp: !this.state.signUp
        });
    }

    signInChange(field, value){
        let stateCopy = {...this.state};

        switch(field){
            case "userName": 
                stateCopy.signInCreds.userName = value;
                break;
            case "password": 
                stateCopy.signInCreds.password = value;
                break;
        }
        this.setState({...stateCopy});
    }

    signUpChange(field, value){
        let stateCopy = {...this.state};

        switch(field){
            case "email": 
                stateCopy.signUpCreds.email = value;
                break;
            case "userName": 
                stateCopy.signUpCreds.userName = value;
                break;
            case "password": 
                stateCopy.signUpCreds.password = value;
                break;
            case "confirm": 
                stateCopy.signUpCreds.confirm = value;
                break;
        }
        this.setState({...stateCopy});
    }

    signIn(event){
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: "/api/signin.php", 
            data: {
                userName: this.state.signInCreds.userName, 
                password: this.state.signInCreds.password
            },
            success: res=>{
                console.log(res);
            }
        });
    }

    signUp(event){
        event.preventDefault();

        if (this.state.signUpCreds.password!==this.state.signUpCreds.confirm){
            let stateCopy = {...this.state};
            stateCopy.confirmError = true;
            this.setState({...stateCopy});
            return;
        }

        $.ajax({
            type: "POST", 
            url: "/api/signup.php", 
            data: {
                email: this.state.signUpCreds.email,
                userName: this.state.signUpCreds.userName,
                password: this.state.signUpCreds.password
            }, 
            success: res=>{
                console.log(res);
            }
        })
    }

    render(){
        if (this.state.signUp){
            return (
                <div>
                    <SignUpForm input={this.signUpChange} submit={this.signUp}></SignUpForm>
                    <div>{this.state.confirmError ? "Please make sure you confirm the correct password" : null}</div>
                    <div onClick={this.switchForms} className="switchLink">Already have an account? Sign in</div>
                </div>
            );
        }
        return (
            <div>
                <SignInForm input={this.signInChange} submit={this.signIn}></SignInForm>
                <div onClick={this.switchForms} className="switchLink">Don't have an account? Sign up</div>
            </div>
        );
    }

    componentDidMount(){
        this.props.dispatch({
            type: "ACCOUNT"
        });    
    }
}

export default connect()(Account);

