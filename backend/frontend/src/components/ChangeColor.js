import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { ThemeContext } from './App';
import { useContext } from 'react';

export const ChangeColor = ({ profileColor, setProfileColor }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
            <Button variant="success" className='upload-photo' onClick={handleShow}>
                Customize profile
            </Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        defaultValue={profileColor}
                        title="Choose your color"
                        onChange={(e) => {
                            setProfileColor(e.target.value)
                        }}
                    /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
