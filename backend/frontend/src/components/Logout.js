import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../contexts/Authenticate';
import { Modal, Button, Spinner, DropdownButton, Dropdown } from 'react-bootstrap';


export const Logout = ({ isAuth, setIsAuth }) => {
    const navigate = useNavigate();

    const [showLogout, setShowLogout] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleClose = () => {
        setShowLogout(false)
    };
    const handleShow = () => setShowLogout(true);
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
            {/* <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Settings
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#">My profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> */}


            <Dropdown.Item as="button" onClick={handleLogout}>Logout</Dropdown.Item>
            {/* <Button variant="light" onClick={handleLogout}>Logout</Button> */}
            <Modal show={showLogout}>
                <Modal.Header>
                    <Modal.Title>Loggin out</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='logout-wrapper'>
                        You're being logged out...
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>)
}
