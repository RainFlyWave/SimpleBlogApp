import React from 'react'
import { Login } from "./Login";
import { Badge, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


export const Introduction = () => {
    return (
        <div className='introduction-main'>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">
                            <Button variant="light">Sign In</Button>
                        </Link>
                    </li>
                    <li>
                        <Button variant="secondary">Sign Up</Button>
                    </li>
                </ul>
            </nav>

        </div>
    )
}