import React from "react";
import {
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Button
} from "reactstrap";

class SignUpForm extends React.Component {
    constructor(props){
        super(props);

        this.emailChange = this.emailChange.bind(this);
        this.userNameChange = this.userNameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.confirmChange = this.confirmChange.bind(this);
    }

    emailChange(event){
        this.props.input("email", event.target.value);
    }

    userNameChange(event){
        this.props.input("userName", event.target.value);
    }

    passwordChange(event){
        this.props.input("password", event.target.value);
    }

    confirmChange(event){
        this.props.input("confirm", event.target.value);
    }

    render(){
        return (
            <Form>
                <FormGroup>
                    <Label>Email</Label>
                    <Input onChange={this.emailChange}></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Username</Label>
                    <Input onChange={this.userNameChange}></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input onChange={this.passwordChange}></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input onChange={this.confirmChange}></Input>
                </FormGroup>
                <Button onClick={this.props.submit}>Submit</Button>
            </Form>
        );
    }
}

export default SignUpForm;

