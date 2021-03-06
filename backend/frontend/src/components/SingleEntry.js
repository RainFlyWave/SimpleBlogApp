import React from 'react'
import { convertDate } from './../contexts/Authenticate'
import { Card, Button } from 'react-bootstrap'
import { DeleteEntry } from './DeleteEntry'
import { EditEntry } from './EditEntry'
import { MAX_ENTRY_LENGTH } from '../contexts/UrlVar'
import { useState } from 'react'

export const SingleEntry = ({ key, item, setIsCreated }) => {

    const [showMore, setShowMore] = useState(false);

    const enableMore = () => {
        setShowMore(true)

    };
    const disableMore = () => {
        setShowMore(false);
    }
    return (
        <li key={key}>
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
    )
}
