import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Badge, InputGroup, Col, Modal, Spinner } from 'react-bootstrap'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';
import { authenticate } from '../contexts/Authenticate';
require('./../../static/css/Login.css');

export const SignUp = ({ setIsAuth }) => {

    const [isLoading, setisLoading] = useState(false)
    const [usernameData, setUsernameData] = useState('');
    const [passwordData, setPassworData] = useState('');
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [isData, setIsData] = useState('');
    const [isSpinning, setIsSpinning] = useState();

    const handleClose = () => {
        setShow(false);
        setIsData('');
    }
    const handleShow = () => {
        setShow(true);
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        const registerData = {
            'username': usernameData,
            'password': passwordData
        };

        setisLoading(true);
        await axios
            .post('http://127.0.0.1:8000/api/register/', registerData, {
            })
            .then(({ data }) => {
                setIsSpinning(true);

                axios
                    .post('http://127.0.0.1:8000/api/login/', registerData, {
                    })
                    .then(({ data }) => {
                        setIsSpinning(true);
                        setTimeout(() => {
                            setIsAuth(Cookies.set('isAuth', true, { expires: 1 }));
                            handleClose();
                            setisLoading(false);
                            setIsSpinning(false);
                        }, 2000)
                    }).catch(error => {
                        console.error(error.response.status)
                        if (error.response.status == '403') {
                            setIsData('Wrong username or password!');
                        }
                        setisLoading(false);
                    });
            }).catch(error => {
                console.error(error.response.status)
                setisLoading(false);
            });
    }

    const checkValidation = (e) => {
        if (usernameData.length > 0 && passwordData.length > 0) {
            handleSubmit(e);
            setIsData('')
        }
        else {
            setIsData('You must provide login and password.')
        }

    }

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>Sign In</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title>
                        Simple Blog  <Badge bg="secondary">APP</Badge>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={validated}>
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
                                    Please enter your username.
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
                                    Please enter your password.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <p className='not-validated'>{isData}</p>
                        <div className='login-spinner'>
                            <div className='login-message'>
                                {isSpinning ? 'Signing Up...  ' : null}
                            </div>
                            {isSpinning ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                : null
                            }

                        </div>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={checkValidation} disabled={isLoading}>
                        Sign Up
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}
