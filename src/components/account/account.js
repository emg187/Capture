import React from "react";
import {connect} from "react-redux";
import $ from "jquery";
import {Redirect} from "react-router-dom";

import SignUpForm from "../forms/signup";
import SignInForm from "../forms/signin";
import "./account.css";

import encrypt from "../../encrypt"; //contains custom encryption function to shield passwords

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
                userName: "", 
                password: "", 
                confirm: "", 
            }, 
            confirmError: false, 
            takenError: false, 
            userLengthError: false, 
            passwordLengthError: false,
            serviceError: false, 
            remember: false,
            complete: false
        };
        this.switchForms = this.switchForms.bind(this);
        this.signInChange = this.signInChange.bind(this);
        this.signUpChange = this.signUpChange.bind(this);
        this.remember = this.remember.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    setError(error){
        this.setState({
            [error]: true
        });
    }

    resetErrors(){
        this.setState({
            signInError: false,
            confirmError: false,
            takenError: false, 
            userLengthError: false, 
            passwordLengthError: false,
            serviceError: false
        });
    }

    switchForms(){
        this.setState({
            signUp: !this.state.signUp, 
        });
        if (this.state.remember){
            this.setState({
                remember: false
            });
        }
        this.resetErrors();
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

    remember(){
        this.setState({
            remember: !this.state.remember
        });
    }

    signIn(event){
        event.preventDefault();

        if (this.state.signInCreds.userName.length===0 || this.state.signInCreds.password.length===0){
            this.resetErrors();
            this.setError("signInError");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/api/signin.php", 
            data: {
                userName: this.state.signInCreds.userName, 
                password: encrypt(this.state.signInCreds.password)
            },
            success: res=>{
                res = JSON.parse(res);
                if (!res.success){
                    if (res.details==="failed query"){
                        this.resetErrors();
                        this.setError("serviceError");
                    } else {
                        this.resetErrors();
                        this.setError("signInError");
                    }
                } else {
                    this.props.dispatch({
                        type: "SIGN_IN",
                        userName: this.state.signInCreds.userName
                    });
                    this.setState({complete: true});
                    if (this.state.remember){
                        this.props.remember();
                    }
                }
            }
        });
    }

    signUp(event){
        event.preventDefault();

        if (this.state.signUpCreds.password!==this.state.signUpCreds.confirm){
            this.resetErrors();
            this.setError("confirmError");
            return;
        }

        if (this.state.signUpCreds.userName.length===0 || this.state.signUpCreds.userName.length>50){
            this.resetErrors();
            this.setError("userLengthError");
            return;
        } else if (this.state.signUpCreds.password.length<8 || this.state.signUpCreds.password.length>25){
            this.resetErrors();
            this.setError("passwordLengthError");
            return;
        }

        $.ajax({
            type: "POST", 
            url: "/api/signup.php", 
            data: {
                userName: this.state.signUpCreds.userName,
                password: encrypt(this.state.signUpCreds.password)
            }, 
            success: res=>{
                res = JSON.parse(res);
                if (!res.success){
                    this.setState({confirmError: false, userLengthError: false, passwordLengthError: false});
                    if (res.details==="failed query"){
                        this.resetErrors();
                        this.setError("serviceError");
                    } else {
                        this.resetErrors();
                        this.setError("takenError");
                    }
                } else {
                    this.props.dispatch({
                        type: "SIGN_IN",
                        userName: this.state.signInCreds.userName
                    });
                    this.setState({complete: true});
                    if (this.state.remember){
                        this.props.remember();
                    }
                }
            }
        })
    }

    render(){
        if (this.state.complete){
            return (<Redirect to="/"/>);
        }
        if (this.state.signUp){
            return (
                <div>
                    <SignUpForm input={this.signUpChange} remember={this.remember} submit={this.signUp}></SignUpForm>
                    <div>{this.state.userLengthError ? "Please make sure your username is between 1 and 50 characters" : null}</div>
                    <div>{this.state.passwordLengthError ? "Please make sure your password is between 8 and 25 characters" : null}</div>
                    <div>{this.state.confirmError ? "Please make sure you confirm the correct password" : null}</div>
                    <div>{this.state.takenError ? "We're sorry, that username is already taken" : null}</div>
                    <div>{this.state.serviceError ? "We're having some trouble processing your request, please try again later" : null}</div>
                    <div onClick={this.switchForms} className="switchLink">Already have an account? Sign in</div>
                </div>
            );
        }
        return (
            <div>
                <SignInForm input={this.signInChange} remember={this.remember} submit={this.signIn}></SignInForm>
                <div>{this.state.userLengthError ? "Please make sure your username is between 1 and 50 characters" : null}</div>
                <div>{this.state.passwordLengthError ? "Please make sure your password is between 8 and 25 characters" : null}</div>
                <div>{this.state.signInError ? "We don't recognize that username and password combination, please try again" : null}</div>
                <div>{this.state.serviceError ? "We're having some trouble processing your request, please try again later" : null}</div>
                <div onClick={this.switchForms} className="switchLink">Don't have an account? Sign up</div>
            </div>
        );
    }

    componentDidMount(){
        if (this.props.user){
            this.props.dispatch({
                type: "SIGN_OUT"
            });
        }
        //call clearcookie.php
        this.props.dispatch({
            type: "ACCOUNT"
        });    
    }
}

function mapStateToProps(state){
    return {
        user: state.user.auth
    };
}

export default connect(mapStateToProps)(Account);

