import React from 'react';
import './classComponent.css';
import ClassDetails from './ClassDetails';

const ClassComponent = (props) => {
    const {className, section, subject, creator, _id} = props.curClass;

    const handleClick = (e) => {
        props.setCurClass(_id);
    }

    return (
        <div className='class-body'>
            <div className='subject-body'>
                <p> {className} </p>
                <p> {subject} </p>
                <button onClick={handleClick}> View </button>
            </div>
            <p> {section} </p>
            <p> {creator} </p>
            <p> {_id} </p>
        </div>
    )
}

export default ClassComponent