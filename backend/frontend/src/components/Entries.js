import React, { useState } from 'react'
import { SingleEntry } from './SingleEntry'


export const Entries = ({ entriesList, setIsCreated }) => {
    return (
        <>
            <ul className='entry-list'>
                {entriesList.map((item, i) => (
                    < SingleEntry key={i} item={item} setIsCreated={setIsCreated} />
                ))
                }
            </ul >
        </>

    )
}
