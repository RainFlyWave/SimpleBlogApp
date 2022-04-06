import React, { useContext, useEffect, useState, setTimeout } from 'react'
import { Form, Button, Badge, InputGroup, Col } from 'react-bootstrap'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';
import { authenticate } from '../contexts/Authenticate';




export const Login = () => {




    const [isLoading, setisLoading] = useState(false)
    const [usernameData, setUsernameData] = useState('');
    const [passwordData, setPassworData] = useState('');
    const navigate = useNavigate();


    const isAuth = authenticate(Cookies.get('isAuth'));
    if (isAuth == true) {
        return <Navigate to='/' />
    }


    async function handleSubmit(e) {
        e.preventDefault();
        const loginData = {
            'username': usernameData,
            'password': passwordData
        };

        setisLoading(true);
        await axios
            .post('http://127.0.0.1:8000/api/login/', loginData, {
            })
            .then(({ data }) => {
                console.log(data);

                setisLoading(false);
                Cookies.set('isAuth', true);
                navigate('/')

            }).catch(error => {
                console.error(error)
                setisLoading(false);
            });



    };



    // If user exists, reidrect to entry page
    // If user doesnt exist, throw exception
    return (
        <div className='main-wrapper'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#273036" fill-opacity="0.3" d="M0,224L26.7,208C53.3,192,107,160,160,170.7C213.3,181,267,235,320,245.3C373.3,256,427,224,480,202.7C533.3,181,587,171,640,154.7C693.3,139,747,117,800,101.3C853.3,85,907,75,960,90.7C1013.3,107,1067,149,1120,176C1173.3,203,1227,213,1280,229.3C1333.3,245,1387,267,1413,277.3L1440,288L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>
            <div className='main-login-div'>
                <h1>
                    Simple Blog  <Badge bg="secondary">APP</Badge>
                </h1>
                <Form>
                    <Form.Group as={Col} md="mb-3 input-field" controlId="validationCustomUsername">
                        <Form.Label>Login</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                onChange={e => setUsernameData(e.target.value)}
                                disabled={isLoading}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="mb-3 input-field" controlId="validationCustomPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                aria-describedby="inputGroupPrepend"
                                required
                                onChange={e => setPassworData(e.target.value)}
                                disabled={isLoading}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>



                    <Button disabled={isLoading} variant="primary" type="submit" className='input-field' onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>

            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#273036" fill-opacity="0.3" d="M0,288L15,266.7C30,245,60,203,90,192C120,181,150,203,180,186.7C210,171,240,117,270,133.3C300,149,330,235,360,250.7C390,267,420,213,450,165.3C480,117,510,75,540,58.7C570,43,600,53,630,80C660,107,690,149,720,181.3C750,213,780,235,810,202.7C840,171,870,85,900,80C930,75,960,149,990,165.3C1020,181,1050,139,1080,101.3C1110,64,1140,32,1170,37.3C1200,43,1230,85,1260,106.7C1290,128,1320,128,1350,122.7C1380,117,1410,107,1425,101.3L1440,96L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"></path>
            </svg>
        </div >
    )
}
