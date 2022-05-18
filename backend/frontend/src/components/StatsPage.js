import React, { useEffect } from 'react'
import { useState } from 'react';
import { Dropdown, Modal, Button } from 'react-bootstrap'
import axios from 'axios';
import { URL } from '../contexts/UrlVar';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2'




export const StatsPage = ({ chartColor }) => {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
    const [show, setShow] = useState(false);


    const [isLoading, setIsLoading] = useState(false);
    const [dateLabels, setDateLabels] = useState();
    const [entryAmountData, setEntryAmountData] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        submitFetch();
    }

    const state = {
        labels: dateLabels,
        datasets: [
            {
                labels: 'posts',
                data: entryAmountData,
                backgroundColor: chartColor,
                borderColor: chartColor,
                borderWidth: 3
            }
        ]
    }

    const submitFetch = async () => {
        setIsLoading(true);
        await axios.post(`${URL}/api/userdetails/`)
            .then(({ data }) => {
                console.log(data)
                setDateLabels(data.axisX);
                setEntryAmountData(data.axisY);
                setIsLoading(false);
            },
                (err) => {
                    console.error(err)
                    setIsLoading(true);
                })
    }

    useEffect(() => {
        handleShow();
    }, [])

    return (
        <div>
            <Line
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Amount of posts in last 30 days',
                        fontSize: 30
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            color: 'rgb(255, 99, 132)'
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }}
            />

        </div>
    )
}
