import React, { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'


export const ExampleEntries = () => {
    return (
        <>
            <ul className='entry-list'>
                <li>
                    <Card border="primary" className='entry-wrapper'>
                        <Card.Header className='entry-header'>
                            <span></span>
                            <span></span>

                        </Card.Header>
                        <Card.Body>
                            <Card.Text>

                            </Card.Text>
                            <div className='button-flex'>
                                <Button variant="outline-primary" disabled>Edit</Button>
                                <Button variant="outline-danger" disabled>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </li>
                <li>
                    <Card border="primary" className='entry-wrapper'>
                        <Card.Header className='entry-header'>
                            <span></span>
                            <span></span>

                        </Card.Header>
                        <Card.Body>
                            <Card.Text>

                            </Card.Text>
                            <div className='button-flex'>
                                <Button variant="outline-primary" disabled>Edit</Button>
                                <Button variant="outline-danger" disabled>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </li>
                <li>
                    <Card border="primary" className='entry-wrapper'>
                        <Card.Header className='entry-header'>
                            <span></span>
                            <span></span>

                        </Card.Header>
                        <Card.Body>
                            <Card.Text>

                            </Card.Text>
                            <div className='button-flex'>
                                <Button variant="outline-primary" disabled>Edit</Button>
                                <Button variant="outline-danger" disabled>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </li>
                <li>
                    <Card border="primary" className='entry-wrapper'>
                        <Card.Header className='entry-header'>
                            <span></span>
                            <span></span>

                        </Card.Header>
                        <Card.Body>
                            <Card.Text>

                            </Card.Text>
                            <div className='button-flex'>
                                <Button variant="outline-primary" disabled>Edit</Button>
                                <Button variant="outline-danger" disabled>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </li>
            </ul >
        </>

    )
}