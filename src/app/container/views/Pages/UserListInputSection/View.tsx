import React from 'react'
import HalamanInputUser from './components/UserInputSection'
import {UserListInputController} from './Controller'

const UserListInputSection = () => {
    return (
        <UserListInputController>
            <HalamanInputUser />
        </UserListInputController>
    )
}

export default UserListInputSection