import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Dropdown, Offcanvas } from 'react-bootstrap';
import axios from 'axios';
import { ChangePhoto } from './ChangePhoto';
import { EditDescription } from './EditDescription';
import { ChangeColor } from './ChangeColor';
import { authenticate } from '../contexts/Authenticate';
import { URL } from '../contexts/UrlVar'



export const UserProfile = ({ setIsAuth }) => {

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
    const [profileColor, setProfileColor] = useState()



    const goFetch = async () => {
        await axios.get(`${URL}/api/user/`)
            .then(({ data }) => {
                setUserData(data);
                console.log(data);
                setIsLoading(false);
                setProfileColor(data.user_profile_color)
                setProfilePic(data.profile_pic)
                if (data.username.username.email > 0) {
                    setUserEmail(data.username.username.email);
                }
            })
            .catch(error => {
                console.error(error.response.status)
                if (error.response.status == '403') {
                    setIsAuth(authenticate(Cookies.get('isAuth')))
                }
                setisLoading(false);
            });
    }

    const profileTheme = {
        outline: `6px solid ${profileColor}`,
    }

    const buttonTheme = {
        backgroundColor: profileColor,
        borderColor: profileColor,
    }

    useEffect(() => {

    }, [profileColor])

    return (
        <div className='user-profile'>
            <Dropdown.Item as="button" onClick={handleShow}>My profile</Dropdown.Item>

            <Offcanvas show={show} placement="end" onHide={handleClose} style={profileTheme}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Customize your profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Remove passing props.userData from parent element */}
                    <div className='profile-wrapper'>
                        <div className='profile-picture-wrapper'>
                            {isLoading ||
                                <img src={profilePic} className='profile-photo' style={profileTheme} />
                            }



                        </div>
                        <div className='profile-buttons'>
                            <ChangePhoto goFetch={goFetch} style={buttonTheme} />
                            <EditDescription style={buttonTheme} goFetch={goFetch} userData={userData} />
                            <ChangeColor goFetch={goFetch} profileColor={profileColor} setProfileColor={setProfileColor} style={buttonTheme} />
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
