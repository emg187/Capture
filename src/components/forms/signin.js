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
            <div>
                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" onChange={this.userNameChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" onChange={this.passwordChange}></input>
                    </div>
                    <div className="form-group form-check">
                        <input className="form-check-input" type="checkbox" onChange={this.props.remember}></input>
                        <label>Remember Me</label>
                    </div>
                    <button onClick={this.props.submit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default SignInForm;


