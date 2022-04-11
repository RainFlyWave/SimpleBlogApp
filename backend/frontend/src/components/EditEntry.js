import React from 'react'
import { Button, Modal, Card, FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { useState } from 'react';
import { convertDate } from './../contexts/Authenticate'
import axios from 'axios';

export const EditEntry = ({ editPost, setIsCreated }) => {
    const entryAuthor = editPost.author_name.username;
    const entryText = editPost.blog_entry;
    const entryDate = editPost.date_created;
    const entryId = editPost.pk;


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [isSpinning, setIsSpinning] = useState();
    const handleShow = () => {
        setShow(true)
        setIsError(false)
    }
    const [isLoading, setIsLoading] = useState();
    const [isError, setIsError] = useState();
    const [editedEntry, setEditedEntry] = useState('');
    const editEntry = async () => {
        setIsLoading(true)
        await axios.post('http://127.0.0.1:8000/api/edit/', {
            "pk": entryId,
            "entry": editedEntry
        })
            .then(({ data }) => {

                setIsError(false);
                setIsSpinning(true);
                setTimeout(() => {
                    setIsSpinning(false);
                    setIsCreated(true);
                    setIsLoading(false)
                    handleClose();
                }, 2000)

            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false)
                setIsError(true);
            })

    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>Edit</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card border="primary" className='entry-wrapper'>
                        <Card.Header className='entry-header'>
                            <span>{entryAuthor}</span>
                            <span>{convertDate(entryDate)}</span>

                        </Card.Header>

                        <FloatingLabel controlId="floatingTextarea2">
                            <Form.Control
                                as="textarea"

                                style={{ height: '120px' }}
                                maxLength="254"
                                className="edit-entry"
                                onChange={(e) => {
                                    setEditedEntry(e.target.value)
                                }}
                            >
                                {entryText}
                            </Form.Control>
                        </FloatingLabel>
                    </Card>
                    {isError ? <p>An error has occured</p> : null}
                    <div className='login-spinner'>
                        <div className='login-message'>
                            {isSpinning ? 'Editing entry...  ' : null}
                        </div>
                        {isSpinning ?
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            : null
                        }

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={editEntry} disabled={isLoading}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}