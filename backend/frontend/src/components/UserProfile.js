import React from 'react'
import { useState } from 'react';
import { Dropdown, Offcanvas, Spinner, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ChangePhoto } from './ChangePhoto';
import { EditDescription } from './EditDescription';

export const UserProfile = () => {

    const [show, setShow] = useState(false);
    const handleShow = () => {
        goFetch();
        setShow(true);
    }
    const handleClose = () => setShow(false);


    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('not provided');
    const [profilePic, setProfilePic] = useState('');


    const goFetch = async () => {
        await axios.get('http://127.0.0.1:8000/api/user/')
            .then(({ data }) => {
                setUserData(data);
                console.log(data);
                setIsLoading(false);
                setProfilePic(data.profile_pic)
                if (data.username.username.email > 0) {
                    setUserEmail(data.username.username.email);
                }


            })
    }


    return (
        <div className='user-profile'>
            <Dropdown.Item as="button" onClick={handleShow}>My profile</Dropdown.Item>

            <Offcanvas show={show} placement="end" onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Customize your profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Remove passing props.userData from parent element */}
                    <div className='profile-wrapper'>
                        <div className='profile-picture-wrapper'>
                            {isLoading ||
                                <img src={profilePic} className='profile-photo' />
                            }
                            <ChangePhoto goFetch={goFetch} />
                            <EditDescription goFetch={goFetch} userData={userData} />
                        </div>
                        <div className='credentials-wrapper'>
                            <div>Username: {isLoading || userData.username.username}</div>
                            <div>E-mail:  {isLoading || userEmail}</div>
                            <div>Description: {isLoading || userData.user_description}</div>

                        </div>
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
