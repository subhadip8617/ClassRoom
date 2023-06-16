import React from 'react'
import { useLocation } from 'react-router-dom'

const ClassDetailsPage = () => {
    const location = useLocation();
    const id = location.state.id;

    return (
        <div>ClassDetailsPage With Id {id}</div>
    )
}

export default ClassDetailsPage