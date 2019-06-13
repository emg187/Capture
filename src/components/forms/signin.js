import React from "react";
import {
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Button} from "reactstrap";

class SignInForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            remember: false
        };
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
            <Form>
                <FormGroup>
                    <Label>Username</Label>
                    <Input onChange={this.userNameChange}></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input onChange={this.passwordChange}></Input>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" onChange={this.props.remember}/>
                        Remember Me
                    </Label>
                </FormGroup>
                <Button onClick={this.props.submit}>Submit</Button>
            </Form>
        );
    }
}

export default SignInForm;


