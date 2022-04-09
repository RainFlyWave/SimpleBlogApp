import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../contexts/Authenticate';
import { Modal, Button } from 'react-bootstrap';


export const Logout = ({ isAuth, setIsAuth }) => {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const handleLogout = () => {
        axios.post('http://127.0.0.1:8000/api/logout/')
            .then(({ data }) => {
                handleShow();
                console.log("logout");
                setTimeout(() => {
                    setIsAuth(false);
                    handleClose();
                }, 2000)
            })
    }






    return (
        <>
            <Button variant="light" onClick={handleLogout}>Logout</Button>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Loggin out</Modal.Title>
                </Modal.Header>
                <Modal.Body>You're being logged out</Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>)
}
