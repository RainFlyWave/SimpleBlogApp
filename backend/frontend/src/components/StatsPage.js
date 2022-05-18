import React from 'react'
import { useState } from 'react';
import { Dropdown, Modal, Button } from 'react-bootstrap'
import axios from 'axios';
import { URL } from '../contexts/UrlVar';


export const StatsPage = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const submitFetch = async () => {
        await axios.post(`${URL}/api/userdetails/`)
            .then(({ data }) => {
                console.log(data)
            },
                (err) => {
                    console.error(err)
                })
    }

    return (
        <div>

            <Dropdown.Item as="button" onClick={handleShow}>My stats</Dropdown.Item>

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>GRAPH HERE</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={submitFetch}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
