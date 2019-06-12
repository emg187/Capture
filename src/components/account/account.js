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
            signInCreds: {
                userName: "",
                password: ""
            }, 
            signUpCreds: {
                email: "", 
                userName: "", 
                password: "", 
                confirm: "", 
                confirmError: false
            }
        };
        this.switch = this.switch.bind(this);
        this.signInUsername = this.signInUsername.bind(this);
        this.signInPassword = this.signInPassword.bind(this);
        this.email = this.email.bind(this);
        this.signUpUsername = this.signUpUsername.bind(this);
        this.signUpPassword = this.signUpPassword.bind(this);
        this.confirm = this.confirm.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    switch(){
        this.setState({
            signUp: !this.state.signUp
        });
    }

    signInUsername(event){
        this.setState({
            signInCreds: {
                userName: event.target.value,
                password: this.state.signInCreds.password
            }
        });
    }

    signInPassword(event){
        this.setState({
            signInCreds: {
                userName: this.state.signInCreds.userName,
                password: event.target.value
            }
        });
    }

    email(event){
        this.setState({
            signUpCreds: {
                email: event.target.value,
                userName: this.state.signUpCreds.userName, 
                password: this.state.signUpCreds.password, 
                confirm: this.state.signUpCreds.confirm, 
                confirmError: false
            }
        });
    }

    signUpUsername(event){
        this.setState({
            signUpCreds: {
                email: this.state.signUpCreds.email,
                userName: event.target.value, 
                password: this.state.signUpCreds.password, 
                confirm: this.state.signUpCreds.confirm, 
                confirmError: false
            }
        });
    }

    signUpPassword(event){
        this.setState({
            signUpCreds: {
                email: this.state.signUpCreds.email,
                userName: this.state.signUpCreds.userName, 
                password: event.target.value, 
                confirm: this.state.signUpCreds.confirm,
                confirmError: false
            }
        });
    }

    confirm(event){
        this.setState({
            signUpCreds:{
                email: this.state.signUpCreds.email,
                userName: this.state.signUpCreds.userName, 
                password: this.state.signUpCreds.password, 
                confirm: event.target.value, 
                confirmError: false
            }
        });
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
            this.setState({
                signUpCreds: {
                    email: this.state.signUpCreds.email,
                    userName: this.state.signUpCreds.userName, 
                    password: this.state.signUpCreds.password, 
                    confirm: this.state.signUpCreds.confirm, 
                    confirmError: true
                }
            });
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
        this.props.dispatch({
            type: "ACCOUNT"
        });
        if (this.state.signUp){
            return (
                <div>
                    <SignUpForm email={this.email} userName={this.signUpUsername} 
                    password={this.signUpPassword} confirm={this.confirm} signUp={this.signUp}></SignUpForm>
                    <div>{this.state.signUpCreds.confirmError ? "Please make sure you confirm the correct password" : null}</div>
                    <div onClick={this.switch} className="switchLink">Already have an account? Sign in</div>
                </div>
            );
        }
        return (
            <div>
                <SignInForm userName={this.signInUsername} password={this.signInPassword} signIn={this.signIn}></SignInForm>
                <div onClick={this.switch} className="switchLink">Don't have an account? Sign up</div>
            </div>
        );
    }
}

export default connect()(Account);

