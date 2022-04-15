import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingLabel, Form, Button, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';


export const CreateEntry = ({ entriesCount, setIsCreated, isParentLoading }) => {
    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [createdEntry, setCreatedEntry] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [modalMessage, setModalMessage] = useState('');


    const sendEntry = async () => {


        if (createdEntry.length > 0) {
            setIsLoading(true);
            await axios.post('http://127.0.0.1:8000/api/create/', {
                "blog_entry": createdEntry
            })
                .then((data) => {
                    console.log("create Entry");
                    setTimeout(() => {
                        setIsLoading(false);
                        setIsCreated(true);
                    }, 2000);


                }, (err) => {

                    setIsLoading(false);
                    if (err.response.status == 403) {
                        axios.post('http://127.0.0.1:8000/api/logout/')
                    }

                    if (err.response.status === 406) {
                        setModalMessage("You have reached maximum amount of entries for today. Take a quick nap.");
                        handleShow();
                    }
                })

        }
        else {
            setModalMessage("Please, enter at least one character!");
            handleShow();
        }

    }

    return (
        <div className='create-entry-wrapper'>
            <p>What do ya think...</p>
            <div className='create-entry'>
                <FloatingLabel controlId="floatingTextarea2">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '120px' }}
                        maxLength="512"
                        onChange={e => setCreatedEntry(e.target.value)}
                    />
                </FloatingLabel>
            </div>
            <div className='entries-info'>

                <div className='entries-count'>{entriesCount > 0 ? `Your entries count: ${entriesCount}` : 'You have no entries.'}</div>
                <Button variant="success" onClick={!isLoading ? sendEntry : null} disabled={isLoading}>
                    {isLoading &&
                        <Spinner size="sm" animation="border" variant="dark" role="status">
                            <span className="visually-hidden">Loading... </span>
                        </Spinner>

                    }
                    {isLoading && <span> </span>} {/* Created only to increate space between text and spinner */}
                    Share
                </Button>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}
