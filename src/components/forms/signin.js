import React from "react";

class SignInForm extends React.Component {
    constructor(props){
        super(props);

        this.userNameChange = this.userNameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    userNameChange(event){
        this.props.input("userName", event.target.value);
    }

    passwordChange(event){
        this.props.input("password", event.target.value);
    }

    render(){
        return (
            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="password"></input>
                </div>
                <div className="form-group form-check">
                    <input className="form-check-input" type="checkbox"></input>
                    <label>Remember Me</label>
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default SignInForm;


