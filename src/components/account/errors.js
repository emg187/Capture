import React from "react";

export default props=>{
    return (
        <div>
            <div>{props.error==="userLengthError" ? "Please make sure your username is between 1 and 25 characters" : null}</div>
            <div>{props.error==="passwordLengthError" ? "Please make sure your password is between 8 and 40 characters" : null}</div>
            <div>{props.error==="confirmError" ? "Please make sure you confirm the correct password" : null}</div>
            <div>{props.error==="signInError" ? "We don't recognize that username and password combination, please try again" : null}</div>
            <div>{props.error==="takenError" ? "We're sorry, that username is already taken" : null}</div>
            <div>{props.error==="serviceError" ? "We're having some trouble processing your request, please try again later" : null}</div>
        </div>
    );
}

