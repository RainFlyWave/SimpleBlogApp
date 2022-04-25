import React, { useEffect, useState } from 'react'
import { Button, Modal, FloatingLabel, Form, Spinner } from 'react-bootstrap'
import axios from 'axios';
import { URL } from '../contexts/UrlVar'

export const EditDescription = ({ userData, goFetch, style }) => {

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => setShow(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isDescription, setIsDescription] = useState('');






    const handlePost = async () => {
        setIsLoading(true);
        await axios.post(`${URL}:8000/api/details/`, {
            "description": isDescription
        })
            .then(({ data }) => {
                console.log(data)
                setTimeout(() => {
                    setIsLoading(false);
                    goFetch();
                    handleClose();
                }, 2000)
            })
            .catch(error => {
                console.error(error.response.status)
                if (error.response.status == '403') {
                    console.log("editing error")
                }
                setisLoading(false);
            });
    }




    return (
        <div>
            <Button style={style} variant="success" className='edit-description' onClick={handleShow}>
                Edit description
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Edit description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingTextarea2">
                        <Form.Control
                            as="textarea"

                            style={{ height: '120px' }}
                            maxLength="500"
                            className="edit-entry"
                            onChange={(e) => {
                                setIsDescription(e.target.value)
                            }}
                        >
                            {userData.user_description || null}
                        </Form.Control>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={style} variant="success" onClick={handlePost}>
                        {isLoading &&
                            <Spinner size="sm" animation="border" variant="dark" role="status">
                                <span className="visually-hidden">Loading... </span>
                            </Spinner>
                        }
                        {isLoading && <span> </span>} {/* Created only to increate space between text and spinner */}
                        Edit description
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
