import React from 'react'
import { useState } from 'react';
import { Dropdown, Offcanvas, Spinner, Button } from 'react-bootstrap';

export const UserProfile = ({ userData }) => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <div className='user-profile'>
            <Dropdown.Item as="button" onClick={handleShow}>My profile</Dropdown.Item>

            <Offcanvas show={show} placement="end" onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Customize your profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Remove passing props.userData from parent element */}
                    {JSON.stringify(userData)}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
