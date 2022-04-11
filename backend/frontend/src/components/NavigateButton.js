import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react';

export const NavigateButton = ({ isLoading, entryDataNextPage, entryDataPreviousPage, fetchData }) => {
    const [isPrevious, setIsPrevious] = useState();
    const [isNext, setIsNext] = useState();

    useEffect(() => {

        setIsNext(entryDataNextPage);
        setIsPrevious(entryDataPreviousPage);

    }, [])

    return (
        <div className='entries-navigate'>

            <Button variant="success" style={!isPrevious ? { visibility: 'hidden' } : { visibility: 'visible' }} disabled={isLoading || !isPrevious} onClick={
                () => {
                    fetchData(isPrevious);

                }
            }>Previous Page</Button>
            <Button variant="success" style={!isNext ? { visibility: 'hidden' } : { visibility: 'visible' }} disabled={isLoading || !isNext} onClick={
                () => {
                    fetchData(isNext);

                }
            }>Next Page</Button>

        </div>
    )
}
