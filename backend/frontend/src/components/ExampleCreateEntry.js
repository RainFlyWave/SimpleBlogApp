import React from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';


export const ExampleCreateEntry = () => {
    return (
        <div className='create-entry-wrapper'>
            <p>What do ya think...</p>
            <div className='create-entry'>
                <FloatingLabel controlId="floatingTextarea2">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '120px' }}
                        maxLength="254"
                    />
                </FloatingLabel>
            </div>
            <div className='entries-info'>
                <div className='entries-count'></div>
                <Button variant="success" disabled>Share</Button>
            </div>
        </div>

    )
}
