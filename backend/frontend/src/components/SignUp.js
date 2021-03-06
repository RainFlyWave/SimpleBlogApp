import React, { useState } from 'react'
import { Form, Button, InputGroup, Col, Spinner, Offcanvas } from 'react-bootstrap'
import Cookies from 'js-cookie';
import axios from 'axios';
require('./../../static/css/Login.css');
import { URL } from '../contexts/UrlVar'

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
            .post(`${URL}/api/register/`, registerData, {
            })
            .then(({ data }) => {
                setIsSpinning(true);

                axios
                    .post(`${URL}/api/login/`, registerData, {
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
                        setisLoading(false);
                    });
            }).catch(error => {
                console.error(error.response.status)
                if (error.response.status === 400) {
                    setIsData('User already exists!');
                }
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
            <Button variant="secondary" onClick={handleShow}>Sign Up</Button>
            <Offcanvas show={show} placement="end" onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Sign Up</Offcanvas.Title>
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
                        <div className='login-buttons'>
                            <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
                                Close
                            </Button>
                            <Button variant="success" onClick={checkValidation} disabled={isLoading}>
                                {isLoading &&
                                    <Spinner size="sm" animation="border" variant="dark" role="status">
                                        <span className="visually-hidden">Loading... </span>
                                    </Spinner>
                                }
                                {isLoading && <span> </span>} {/* Created only to increate space between text and spinner */}
                                Sign Up
                            </Button>
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )

}
