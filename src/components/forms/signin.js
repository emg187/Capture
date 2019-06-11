import React from "react";
import {
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Button} from "reactstrap";

export default props=>{
    return (
        <Form>
            <FormGroup>
                <Label>Username</Label>
                <Input onChange={props.userName}></Input>
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input onChange={props.password}></Input>
            </FormGroup>
            <Button onClick={props.signIn}>Submit</Button>
        </Form>
    );
}

