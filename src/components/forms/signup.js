import React from "react";
import {
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Button
} from "reactstrap";

export default props=>{
    return (
        <Form>
            <FormGroup>
                <Label>Email</Label>
                <Input onChange={props.email}></Input>
            </FormGroup>
            <FormGroup>
                <Label>Username</Label>
                <Input onChange={props.userName}></Input>
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input onChange={props.password}></Input>
            </FormGroup>
            <FormGroup>
                <Label>Confirm Password</Label>
                <Input onChange={props.confirm}></Input>
            </FormGroup>
            <Button onClick={props.signUp}>Submit</Button>
        </Form>
    );
}

