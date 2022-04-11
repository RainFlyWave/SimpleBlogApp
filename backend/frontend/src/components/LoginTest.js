import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Badge, InputGroup, Col, Modal, Spinner, Offcanvas } from 'react-bootstrap'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';
import { authenticate } from '../contexts/Authenticate';


export const LoginTest = ({ setIsAuth }) => {

    const [isLoading, setisLoading] = useState(false)
    const [usernameData, setUsernameData] = useState('');
    const [passwordData, setPassworData] = useState('');
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [isData, setIsData] = useState('');
    const [isSpinning, setIsSpinning] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
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
    }

    const checkValidation = (e) => {
        if (usernameData.length > 0 && passwordData.length > 0) {
            handleSubmit(e);
            setIsData(true)
        }
        else {
            setIsData('You must provide login and password.')
        }

    }

    return (
        <>
            <Button variant="light" onClick={handleShow}>Sign In</Button>

            {/* <Modal show={show} onHide={handleClose} backdrop="static" centered>
                <Modal.Header closeButton >
                    <Modal.Title>
                        Simple Blog  <Badge bg="secondary">APP</Badge>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={validated} onKeyUp={e => {
                        if (e.key === "Enter") {
                            checkValidation(e);
                        }
                    }}>
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
                                    autoFocus
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
                                {isSpinning ? 'Logging In...  ' : null}
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
                    <Button variant="success" onClick={checkValidation} disabled={isLoading}>
                        Log In
                    </Button>
                </Modal.Footer>
            </Modal> */}

            <Offcanvas show={show} placement="end" onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Log In</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form validated={validated} onKeyUp={e => {
                        if (e.key === "Enter") {
                            checkValidation(e);
                        }
                    }}>
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
                                    autoFocus
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
                                {isSpinning ? 'Logging In...  ' : null}
                            </div>
                            {isSpinning ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                : null
                            }

                        </div>
                        <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
                            Close
                        </Button>
                        <Button variant="success" onClick={checkValidation} disabled={isLoading}>
                            Log In
                        </Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )

}
