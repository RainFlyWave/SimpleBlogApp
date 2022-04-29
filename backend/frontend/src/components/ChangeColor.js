import React from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { URL } from '../contexts/UrlVar'


export const ChangeColor = ({ goFetch, profileColor, setProfileColor, style }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isLoading, setIsLoading] = useState(false);

    const postChangedColor = async () => {
        setIsLoading(true)
        await axios.post(`${URL}/api/details/`, {
            themeColor: profileColor,
        })
            .then(({ data }) => {
                setTimeout(() => {
                    setIsLoading(false);
                    goFetch();
                    handleClose();
                }, 2000)
            })
    }

    return (
        <div>
            <Button style={style} variant="success" className='upload-photo' onClick={handleShow}>
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
                    <Button style={style} variant="success" onClick={postChangedColor}>
                        {isLoading &&
                            <Spinner size="sm" animation="border" variant="dark" role="status">
                                <span className="visually-hidden">Loading... </span>
                            </Spinner>
                        }
                        {isLoading && <span> </span>} {/* Created only to increate space between text and spinner */}
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
