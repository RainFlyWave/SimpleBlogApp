import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { DeleteEntry } from './DeleteEntry'
import { EditEntry } from './EditEntry'
import { convertDate } from './../contexts/Authenticate'


export const Entries = ({ entriesList, setIsCreated }) => {
    const MAX_ENTRY_LENGTH = 150;

    const [showMore, setShowMore] = useState(false);

    const enableMore = () => {
        setShowMore(true)

    };
    const disableMore = () => {
        setShowMore(false);
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
                                    {item.blog_entry.length >= MAX_ENTRY_LENGTH && !showMore ? `${item.blog_entry.slice(0, MAX_ENTRY_LENGTH)}(...)` : item.blog_entry}
                                    {item.blog_entry.length >= MAX_ENTRY_LENGTH && !showMore ? <button className='more-button' onClick={enableMore}> Show more</button> : null}
                                </Card.Text>
                                <div className='button-flex'>
                                    {showMore && <Button variant="outline-secondary" onClick={disableMore}>Show less...</Button>}
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
