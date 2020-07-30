import React, { useState, useEffect, useContext } from 'react'
import {Link, useHistory} from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { ContainerDiv, CardDiv } from '../styles/userprofile-styles'
import styled from 'styled-components'


import {UserContext} from '../context/UserContext'

const initialUserValue = {
    username: '',
    firstname: '',
    lastname: '',
    primaryemail: '',
    phone: '',
    password: ''
}


export default function UserProfile() {
    const [user, setUser] = useState(initialUserValue)
    const {userInfo} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        axiosWithAuth()
            .get('/myinfo')
            .then((resp) => {
                console.log('RESP', resp.data)
                setUser(resp.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const deleteUser = () => {
        axiosWithAuth()
            .delete(`/user/${userInfo.userid}`)
            .then(res => {
                console.log(res);
                localStorage.clear();
                history.push('/');
            })
            .catch(err => console.log(err))
    }
    

    return (
        <ContainerDiv>
            <CardDiv>
                <h1>Profile</h1>
                <h2>{user.username}</h2>
                <p>First Name: {user.firstname}</p>
                <p>Last Name: {user.lastname}</p>
                <p>email: {user.primaryemail}</p>
                <p>phone: {user.phone}</p>
            </CardDiv>
            <div>
                <Link to="/private/edituser"><button>Edit User Profile</button></Link>
                <button onClick={() => deleteUser()}>Delete User Profile</button>
            </div>
        </ContainerDiv>
    )
}