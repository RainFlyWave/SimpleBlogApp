import React from 'react'
import { Form, Button, Modal, Spinner } from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';
import { URL } from '../contexts/UrlVar'

export const ChangePhoto = ({ goFetch, style }) => {

    const [show, setShow] = useState(false);
    const [userPhoto, setUserPhoto] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);



    const handleClose = () => setShow(false);
    const handleShow = () => {
        setIsError('');
        setShow(true);
    }
    const restrictedFormats = ['.jpg', '.png', '.jpeg']

    const handleSubmit = () => {

        if (userPhoto != undefined) {
            for (let i of restrictedFormats) {
                if (userPhoto.name.endsWith(i)) {
                    setIsError('');
                    handlePost();
                    break;
                }
                else {
                    const message = `You can only upload images! Allowed formats are: ${restrictedFormats.join(", ")}`;
                    setIsError(message)
                }
            }
        }

    }
    const handlePost = async () => {
        setIsLoading(true);
        const uploadData = new FormData();
        uploadData.append('photo', userPhoto);

        await axios.post(`${URL}/api/upload/`, uploadData)
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
                Upload your photo
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Profile picture changer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Change your photo</Form.Label>
                        <Form.Control type="file" onChange={(e) => setUserPhoto(e.target.files[0])} />
                    </Form.Group>
                    <p>{isError}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={style} variant="success" onClick={handleSubmit}>
                        {isLoading &&
                            <Spinner size="sm" animation="border" variant="dark" role="status">
                                <span className="visually-hidden">Loading... </span>
                            </Spinner>
                        }
                        {isLoading && <span> </span>} {/* Created only to increate space between text and spinner */}
                        Save Photo
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
