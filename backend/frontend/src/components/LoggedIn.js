import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Entries } from './Entries';
export const LoggedIn = () => {

    const [entryData, setEntryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://127.0.0.1:8000/api/entries/')
            .then(({ data }) => {
                setEntryData(data);
                setIsLoading(false);
            })
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <div>Logged In</div>
            <div>Your entries count: {entryData.count}</div>
            <Entries entriesList={entryData} />
        </div>

    )
}
