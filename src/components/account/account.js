import React from "react";
import {connect} from "react-redux";
import $ from "jquery";
import {Redirect} from "react-router-dom";

import SignUpForm from "../forms/signup";
import SignInForm from "../forms/signin";
import Error from "./errors";
import "./account.css";

import encrypt from "../../encrypt"; //contains custom encryption function to shield passwords

class Account extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            signUp: false,
            signInCreds: {
                username: "",
                password: ""
            }, 
            signUpCreds: {
                username: "", 
                password: "", 
                confirm: "", 
            }, 
            error: "",
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
            error: error
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
        this.setError("");
    }

    signInChange(field, value){
        let stateCopy = {...this.state};

        switch(field){
            case "userName": 
                stateCopy.signInCreds.username = value;
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
                stateCopy.signUpCreds.username = value;
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

        if (this.state.signInCreds.username.length===0 || this.state.signInCreds.password.length===0){
            this.setError("signInError");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/api/signin.php", 
            data: {
                username: this.state.signInCreds.username, 
                password: encrypt(this.state.signInCreds.password)
            },
            success: res=>{
                res = JSON.parse(res);
                if (!res.success){
                    if (res.details==="failed query"){
                        this.setError("serviceError");
                    } else {
                        this.setError("signInError");
                    }
                } else {
                    this.props.dispatch({
                        type: "SIGN_IN",
                        username: this.state.signInCreds.username
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
            this.setError("confirmError");
            return;
        }

        if (this.state.signUpCreds.username.length===0 || this.state.signUpCreds.username.length>25){
            this.setError("userLengthError");
            return;
        } else if (this.state.signUpCreds.password.length<8 || this.state.signUpCreds.password.length>40){
            this.setError("passwordLengthError");
            return;
        }

        $.ajax({
            type: "POST", 
            url: "/api/signup.php", 
            data: {
                username: this.state.signUpCreds.username,
                password: encrypt(this.state.signUpCreds.password)
            }, 
            success: res=>{
                res = JSON.parse(res);
                if (!res.success){
                    if (res.details==="failed query"){
                        this.setError("serviceError");
                    } else {
                        this.setError("takenError");
                    }
                } else {
                    this.props.dispatch({
                        type: "SIGN_IN",
                        username: this.state.signUpCreds.username
                    });
                    this.setState({complete: true});
                    if (this.state.remember){
                        this.props.remember();
                    }
                }
            }
        });
    }

    render(){
        if (this.state.complete){
            return (<Redirect to="/"/>);
        }
        if (this.state.signUp){
            return (
                <div>
                    <SignUpForm input={this.signUpChange} remember={this.remember} submit={this.signUp}></SignUpForm>
                    <Error error={this.state.error}/>
                    <div onClick={this.switchForms} className="switchLink">Already have an account? Sign in</div>
                </div>
            );
        }
        return (
            <div>
                <SignInForm input={this.signInChange} remember={this.remember} submit={this.signIn}></SignInForm>
                <Error error={this.state.error}/>
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

