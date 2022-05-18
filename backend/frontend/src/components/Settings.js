import React from 'react'
import { Logout } from './Logout'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { UserProfile } from './UserProfile'
import { StatsPage } from './StatsPage'

export const Settings = ({ isAuth, setIsAuth }) => {
    return (
        <DropdownButton id="dropdown-item-button" variant='light' title="Settings">
            <UserProfile setIsAuth={setIsAuth} />
            <StatsPage />
            <Logout isAuth={isAuth} setIsAuth={setIsAuth} />
        </DropdownButton>
    )
}
