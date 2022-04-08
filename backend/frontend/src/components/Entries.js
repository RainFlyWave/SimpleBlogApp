import React, { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
require('./../../static/css/Entry.css')

export const Entries = ({ entriesList }) => {

    const convertDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleString('pl-PL');
    }



    return (
        <>
            <ul className='entry-list'>

                {entriesList.map((item, i) => (
                    <li key={i}>
                        <Card border="primary" className='entry-wrapper'>
                            <Card.Header className='entry-header'>
                                <span>{item.author_name.username}</span>
                                <span>{convertDate(item.date_created)}</span>

                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {item.blog_entry}
                                </Card.Text>
                                <div className='button-flex'>
                                    <Button variant="outline-primary" disabled>Editing feature soon...</Button>
                                </div>
                            </Card.Body>
                        </Card>


                    </li>
                ))
                }
            </ul >
        </>

    )
}
