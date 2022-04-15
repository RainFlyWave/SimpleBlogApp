import React, { useContext, useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import { NotLoggedIn } from './NotLoggedIn';
import { LoggedIn } from './LoggedIn';
import { authenticate } from '../contexts/Authenticate';
import { LoginTest } from './LoginTest';
import { SignUp } from './SignUp'
import { Settings } from './Settings';



export const Introduction = () => {

    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(authenticate(Cookies.get('isAuth')));
    let isfetched = false;


    const goFetch = async () => {
        await axios.get('http://127.0.0.1:8000/api/user/')
            .then(({ data }) => {
                setUserData(data);
                setIsLoading(false);
                isfetched = true;
            })
            .catch((err) => {
                setIsAuth(Cookies.set('isAuth', false));
            })
    }




    useEffect(() => {
        if (isAuth == true && isfetched == false) {
            goFetch();

        }


    }, [isAuth]);



    return (
        <div className='introduction-main'>
            <nav>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#7d7d7d" fill-opacity="1" d="M0,32L60,69.3C120,107,240,181,360,192C480,203,600,149,720,133.3C840,117,960,139,1080,138.7C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#407050" fill-opacity="1" d="M0,192L18.5,165.3C36.9,139,74,85,111,106.7C147.7,128,185,224,222,240C258.5,256,295,192,332,154.7C369.2,117,406,107,443,112C480,117,517,139,554,149.3C590.8,160,628,160,665,170.7C701.5,181,738,203,775,192C812.3,181,849,139,886,128C923.1,117,960,139,997,154.7C1033.8,171,1071,181,1108,181.3C1144.6,181,1182,171,1218,181.3C1255.4,192,1292,224,1329,218.7C1366.2,213,1403,171,1422,149.3L1440,128L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path></svg>
                <h1>
                    <span className="header-logo">Sample Text </span><Badge bg="success">APP</Badge>
                </h1>
                <ul>
                    <li>

                        {isAuth ? null : <LoginTest setIsAuth={setIsAuth} />}
                    </li>
                    <li>
                        {/* {isAuth ? <Logout isAuth={isAuth} setIsAuth={setIsAuth} /> : <SignUp setIsAuth={setIsAuth} />} */}
                        {isAuth ? <Settings isAuth={isAuth} setIsAuth={setIsAuth} userData={userData} /> : <SignUp setIsAuth={setIsAuth} />}
                    </li>
                </ul>
            </nav>
            <div className='introduction-background'></div>
            <div className='introduction-wrapper'>
                <div className='introduction-header'>

                    <div className='introduction-maintext'>
                        {isAuth ? <LoggedIn /> : <NotLoggedIn />}
                    </div>



                </div>

            </div>

        </div>
    )
}