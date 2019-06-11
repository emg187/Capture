import React from "react";
import {Modal, ModalHeader} from "reactstrap";
import "./modals.css";

export default props=>{
    return (
        <Modal isOpen={props.isOpen} className="statsModal">
            <ModalHeader toggle={props.toggle}>This is the "your stats" modal</ModalHeader>
        </Modal>
    );
}


