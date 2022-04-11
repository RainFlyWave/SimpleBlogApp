import React from 'react'
import { Logout } from './Logout'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { UserProfile } from './UserProfile'

export const Settings = ({ isAuth, setIsAuth }) => {
    return (
        <DropdownButton id="dropdown-item-button" variant='light' title="Settings">
            <UserProfile />
            <Logout isAuth={isAuth} setIsAuth={setIsAuth} />
        </DropdownButton>
    )
}
