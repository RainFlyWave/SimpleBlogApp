import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
require('./../../static/css/Entry.css')

export const Entries = ({ entriesList }) => {

    const convertDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleString('pl-PL');
    }
    return (
        <ul className='entry-list'>
            {entriesList.results.map((item) => (
                <li>
                    <Card border="primary" className='entry-wrapper' style={{ width: '35rem' }}>
                        <Card.Header className='entry-header'>
                            <span>{item.author_name.username}</span>
                            <span>{convertDate(item.date_created)}</span>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {item.blog_entry}
                            </Card.Text>
                        </Card.Body>
                    </Card>


                </li>
            ))
            }
        </ul >

    )
}
