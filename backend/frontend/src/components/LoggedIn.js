import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Entries } from './Entries';
import { Button } from 'react-bootstrap';
import { CreateEntry } from './CreateEntry';
import { ExampleCreateEntry } from './ExampleCreateEntry';
import { ExampleEntries } from './ExampleEntries';
export const LoggedIn = () => {

    const [entryData, setEntryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreated, setIsCreated] = useState();

    const entryDataEntries = entryData.results; // making an array that contains only nesscessary data to show
    const entryDataCount = entryData.count;     //
    useEffect(() => {
        setIsLoading(true);
        axios.get('http://127.0.0.1:8000/api/entries/')
            .then(({ data }) => {
                setEntryData(data);
                setIsLoading(false);
                if (isCreated == true) {
                    setIsCreated(false);
                }
            })
    }, [isCreated])

    if (isLoading) {
        return (
            <div>
                <ExampleCreateEntry />
                <ExampleEntries />
                <div className='entries-navigate'>
                    <Button variant="primary" disabled={isLoading}>Previous Page</Button>
                    <Button variant="primary" disabled={isLoading}>Next Page</Button>
                </div>
            </div>
        )
    }
    return (
        <div>
            <CreateEntry entriesCount={entryDataCount} setIsCreated={setIsCreated} />
            <Entries entriesList={entryDataEntries} />
            <div className='entries-navigate'>
                <Button variant="primary" disabled={isLoading}>Previous Page</Button>
                <Button variant="primary" disabled={isLoading}>Next Page</Button>
            </div>
        </div>

    )
}
