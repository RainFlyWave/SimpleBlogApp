import React from 'react'
import { Button, Modal, Card, Spinner } from 'react-bootstrap'
import { useState } from 'react';
import { convertDate } from './../contexts/Authenticate'
import axios from 'axios';

export const DeleteEntry = ({ deletePost, setIsCreated }) => {
    const entryAuthor = deletePost.author_name.username;
    const entryText = deletePost.blog_entry;
    const entryDate = deletePost.date_created;
    const entryId = deletePost.pk;


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [isSpinning, setIsSpinning] = useState();
    const handleShow = () => {
        setShow(true);
        setIsError(false)
    }
    const [isLoading, setIsLoading] = useState();
    const [isError, setIsError] = useState();

    const deleteEntry = async () => {
        setIsLoading(true)
        await axios.post('http://127.0.0.1:8000/api/delete/', {

            "pk": entryId,
            "chuj": "kurwa"

        })
            .then(({ data }) => {

                console.log("delete fetch");
                setIsSpinning(true);
                setIsError(false);

                setTimeout(() => {
                    setIsCreated(true);
                    setIsLoading(false)
                    setIsSpinning(false);
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
            <Button variant="outline-danger" onClick={handleShow}>Delete</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want delete this entry?</p>
                    <Card border="primary" className='entry-wrapper'>
                        <Card.Header className='entry-header'>
                            <span>{entryAuthor}</span>
                            <span>{convertDate(entryDate)}</span>

                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {entryText}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    {isError ? <p>An error has occured</p> : null}
                    <div className='login-spinner'>
                        <div className='login-message'>
                            {isSpinning ? 'Deleting entry...  ' : null}
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
                    <Button variant="danger" onClick={deleteEntry} disabled={isLoading}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
