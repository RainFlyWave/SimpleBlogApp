import React, { useEffect } from 'react'

export const Entries = ({ entriesList }) => {

    return (
        <ul>
            {entriesList.results.map((item) => (
                <li>{JSON.stringify(item)}</li>
            ))}
        </ul>

    )
}
