import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../contexts/Authenticate';


export const Logout = () => {
    const navigate = useNavigate();
    let isAuth = authenticate(Cookies.get('isAuth'));

    useEffect(() => {
        if (isAuth == true) {
            axios.post('http://127.0.0.1:8000/api/logout/')
                .then(({ data }) => {
                    console.log(data);
                    Cookies.set('isAuth', 'false', { expiries: 1 });
                    setTimeout(() => {
                        navigate('/');
                    }, 2000)
                })
        }
        else {
            navigate('/');
        }
    }, [])


    return (<div>Logging Out...</div>)
}
