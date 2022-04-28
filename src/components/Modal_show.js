import {Modal,Button} from 'react-bootstrap';
import React, { useState } from 'react';

function Modal_show(props) {
    
  
    return (
      <>
        
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're adding video up to 10 !</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={props.handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
}
export default Modal_show