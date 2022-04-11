import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Badge, InputGroup, Col, Modal } from 'react-bootstrap'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';
import { authenticate } from '../contexts/Authenticate';


export const LoginTest = ({ setIsAuth }) => {

    const [isLoading, setisLoading] = useState(false)
    const [usernameData, setUsernameData] = useState('');
    const [passwordData, setPassworData] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    async function handleSubmit(e) {
        e.preventDefault();
        const loginData = {
            'username': usernameData,
            'password': passwordData
        };

        setisLoading(true);
        await axios
            .post('http://127.0.0.1:8000/api/login/', loginData, {
            })
            .then(({ data }) => {
                console.log("login tests");

                setTimeout(() => {
                    setIsAuth(Cookies.set('isAuth', true, { expires: 1 }));
                    handleClose();
                    setisLoading(false);
                }, 2000)



            }).catch(error => {
                console.error(error)
                setisLoading(false);
            });
    }

    return (
        <>
            <Button variant="light" onClick={handleShow}>Sign In</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>

                        Simple Blog  <Badge bg="secondary">APP</Badge>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>



                    <Form>
                        <Form.Group as={Col} md="mb-3 input-field" controlId="validationCustomUsername">
                            <Form.Label>Login</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    onChange={e => setUsernameData(e.target.value)}
                                    disabled={isLoading}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="mb-3 input-field" controlId="validationCustomPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    onChange={e => setPassworData(e.target.value)}
                                    disabled={isLoading}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
                        Log In
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}
