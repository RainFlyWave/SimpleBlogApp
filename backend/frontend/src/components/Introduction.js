import React, { useEffect, useState } from 'react'
import { Badge, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';


export const Introduction = () => {

    const [userData, setUserData] = useState([]);
    let isfetched = false;

    const kurwa = async () => {
        await axios.get('http://127.0.0.1:8000/api/user/')
            .then(({ data }) => {
                setUserData((data) => {
                    console.log(data)
                    return data;
                });

                isfetched = true;
            })
    }

    const isAuth = Cookies.get('isAuth');
    useEffect(() => {
        if (isAuth == 'true' && isfetched == false) {
            kurwa();

        }
    }, []);


    return (
        <div className='introduction-main'>
            <nav>
                <h1>
                    Simple Blog <Badge bg="secondary">APP</Badge>
                </h1>
                <ul>
                    <li>
                        {isAuth ? 'Hi' : <Link to="/login">
                            <Button variant="light">Sign In</Button>
                        </Link>}
                    </li>
                    <li>
                        {isAuth ? <Link to="/logout">
                            <Button variant="light">Logout</Button>
                        </Link> : <Button variant="secondary">Sign Up</Button>}
                    </li>
                </ul>
            </nav>
            <div className='introduction-wrapper'>
                <div className='introduction-header'>
                    <div className='introduction-maintext'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. At officia, repellendus quaerat nemo dolorum
                        eveniet, aperiam modi explicabo magnam quod sunt illo, repudiandae aliquam adipisci. Voluptates, aliquam
                        quae soluta eveniet fugit non itaque vero obcaecati ducimus autem debitis repudiandae corrupti incidunt
                        magni necessitatibus inventore, odit error consequatur earum odio beatae quis. Culpa porro natus ducimus
                        rerum minus. Quia molestias maxime illo nulla, consectetur sequi amet eligendi harum corporis obcaecati
                        dolorum ullam vero enim odit minima voluptatem assumenda sit vitae magnam quod temporibus magni
                        quisquam? Aut temporibus cum totam ipsa, veniam animi amet sit quasi, illo asperiores suscipit accusamus
                        voluptates culpa.
                    </div>
                    <div className='introduction-cards'></div>
                </div>

            </div>

        </div>
    )
}