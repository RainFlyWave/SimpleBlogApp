import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react';

export const NavigateButton = ({ isLoading, entryDataNextPage, entryDataPreviousPage, fetchData }) => {
    const [isPrevious, setIsPrevious] = useState();
    const [isNext, setIsNext] = useState();
    const [whichPage, setWhichPage] = useState(1);

    useEffect(() => {

        setIsNext(entryDataNextPage);
        setIsPrevious(entryDataPreviousPage);
    }, [])

    return (
        <div className='entries-navigate'>
            <Button variant="primary" disabled={isLoading || !isPrevious} onClick={
                () => {
                    fetchData(isPrevious);

                }
            }>Previous Page</Button>
            <Button variant="primary" disabled={isLoading || !isNext} onClick={
                () => {
                    fetchData(isNext);

                }
            }>Next Page</Button>

        </div>
    )
}
