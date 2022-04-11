import React, { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { DeleteEntry } from './DeleteEntry'
import { EditEntry } from './EditEntry'
import { convertDate } from './../contexts/Authenticate'


export const Entries = ({ entriesList, setIsCreated }) => {





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
                                    <EditEntry editPost={item} setIsCreated={setIsCreated} />
                                    <DeleteEntry deletePost={item} setIsCreated={setIsCreated} />
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
