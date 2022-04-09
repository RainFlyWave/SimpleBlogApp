import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { NotLoggedIn } from './NotLoggedIn';
import { LoggedIn } from './LoggedIn';
import { IntroductionCards } from './IntroductionCards';
import { authenticate } from '../contexts/Authenticate';
import { Logout } from './Logout';
import { Login } from './Login';
import { LoginTest } from './LoginTest';
require('./../../static/css/Introduction.css');



export const Introduction = () => {

    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(authenticate(Cookies.get('isAuth')));
    let isfetched = false;


    // const isAuth = authenticate(Cookies.get('isAuth'));


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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#7d7d7d" fill-opacity="0.4" d="M0,32L6.2,32C12.3,32,25,32,37,53.3C49.2,75,62,117,74,117.3C86.2,117,98,75,111,96C123.1,117,135,203,148,202.7C160,203,172,117,185,117.3C196.9,117,209,203,222,208C233.8,213,246,139,258,112C270.8,85,283,107,295,138.7C307.7,171,320,213,332,240C344.6,267,357,277,369,234.7C381.5,192,394,96,406,90.7C418.5,85,431,171,443,181.3C455.4,192,468,128,480,106.7C492.3,85,505,107,517,112C529.2,117,542,107,554,122.7C566.2,139,578,181,591,176C603.1,171,615,117,628,133.3C640,149,652,235,665,256C676.9,277,689,235,702,197.3C713.8,160,726,128,738,128C750.8,128,763,160,775,181.3C787.7,203,800,213,812,186.7C824.6,160,837,96,849,90.7C861.5,85,874,139,886,154.7C898.5,171,911,149,923,122.7C935.4,96,948,64,960,80C972.3,96,985,160,997,197.3C1009.2,235,1022,245,1034,229.3C1046.2,213,1058,171,1071,170.7C1083.1,171,1095,213,1108,224C1120,235,1132,213,1145,218.7C1156.9,224,1169,256,1182,277.3C1193.8,299,1206,309,1218,282.7C1230.8,256,1243,192,1255,181.3C1267.7,171,1280,213,1292,229.3C1304.6,245,1317,235,1329,197.3C1341.5,160,1354,96,1366,74.7C1378.5,53,1391,75,1403,96C1415.4,117,1428,139,1434,149.3L1440,160L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z"></path></svg>
                {/* <h1>
                    Simple Blog <Badge bg="secondary">APP</Badge>
                </h1> */}
                <h1>
                    Sentino Król <Badge bg="secondary">MIDAS</Badge>
                </h1>
                <ul>
                    <li>

                        {isAuth ? `Hi, ${userData.username}` : <LoginTest setIsAuth={setIsAuth} />}
                    </li>
                    <li>
                        {isAuth ? <Logout isAuth={isAuth} setIsAuth={setIsAuth} /> : <Button variant="secondary">Sign Up</Button>}
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