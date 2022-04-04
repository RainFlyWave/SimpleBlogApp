import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


export const Logout = () => {
    let isAuth = Cookies.get('isAuth');

    const navigate = useNavigate();
    if (isAuth == 'true') {
        axios.post('http://127.0.0.1:8000/api/logout/')
            .then(({ data }) => {
                console.log(data);
                Cookies.set('isAuth', 'false');
            })
        setTimeout(() => {
            return (<div>logout</div>)
        }, 3000);
        return <Navigate to="/" />
    }


    return <Navigate to="/" />
}
