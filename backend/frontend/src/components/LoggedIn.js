import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Entries } from './Entries';
import { Button } from 'react-bootstrap';
import { CreateEntry } from './CreateEntry';
import { ExampleCreateEntry } from './ExampleCreateEntry';
import { ExampleEntries } from './ExampleEntries';
import { NavigateButton } from './NavigateButton';
import { URL } from '../contexts/UrlVar'

export const LoggedIn = ({ setIsAuth }) => {

    const [entryData, setEntryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreated, setIsCreated] = useState();

    const entryDataEntries = entryData.results;         // making an array that contains only nesscessary data to show
    const entryDataCount = entryData.count;             //
    const entryDataNextPage = entryData.next;           //
    const entryDataPreviousPage = entryData.previous;


    const fetchData = async (url = `${URL}/api/entries/`) => {
        setIsLoading(true);
        await axios.get(url)
            .then(({ data }) => {
                setEntryData(data);
                setIsLoading(false);
                if (isCreated == true) {
                    setIsCreated(false);
                }
            },
                (err) => {
                    console.log("LOGGEDIN.JS" + err.response.status)
                    if (err.response.status == 403) {
                        setIsAuth(false)
                    }
                })
    }

    useEffect(() => {
        fetchData();
    }, [isCreated])

    if (isLoading) {
        return (
            <div>
                <ExampleCreateEntry />
                <ExampleEntries />
                <div className='entries-navigate'>
                    <Button variant="outline-primary" disabled={isLoading}>Previous Page</Button>
                    <Button variant="outline-primary" disabled={isLoading}>Next Page</Button>
                </div>
            </div>
        )
    }
    return (
        <div>
            <CreateEntry entriesCount={entryDataCount} setIsCreated={setIsCreated} />
            <Entries entriesList={entryDataEntries} setIsCreated={setIsCreated} />
            <NavigateButton fetchData={fetchData} isLoading={isLoading} entryDataNextPage={entryDataNextPage} entryDataPreviousPage={entryDataPreviousPage} />
        </div>

    )
}
