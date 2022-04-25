import React from 'react'
import { Button, Modal, Card, FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { useState } from 'react';
import { convertDate } from './../contexts/Authenticate'
import axios from 'axios';
import { URL } from '../contexts/UrlVar'

export const EditEntry = ({ editPost, setIsCreated }) => {
    const entryAuthor = editPost.author_name.username;
    const entryText = editPost.blog_entry;
    const entryDate = editPost.date_created;
    const entryId = editPost.pk;


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        setIsError(false)
    }
    const [isLoading, setIsLoading] = useState();
    const [isError, setIsError] = useState(false);
    const [editedEntry, setEditedEntry] = useState('');
    const editEntry = async () => {
        setIsLoading(true)
        setIsError(false);
        if (editedEntry.length <= 0) {
            setIsLoading(false)
        }
        else {
            await axios.post(`${URL}:8000/api/edit/`, {
                "pk": entryId,
                "entry": editedEntry
            })
                .then(({ data }) => {
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
                    console.log(editedEntry.length)
                })
        }

    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>Edit</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                centered
                size="lg"
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={editEntry} disabled={isLoading}>
                        {isLoading &&
                            <Spinner size="sm" animation="border" variant="dark" role="status">
                                <span className="visually-hidden">Loading... </span>
                            </Spinner>
                        }
                        {isLoading && <span> </span>} {/* Created only to increate space between text and spinner */}
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
