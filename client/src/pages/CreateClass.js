import React from 'react'
import './classPage.css';
import ClassComponent from '../components/ClassComponent';
import { useNavigate } from 'react-router-dom';

const CreateClass = (props) => {
    const navigate =  useNavigate();

    const [curClass, setCurClass] = React.useState(null);

    if(curClass){
        navigate("/class-details", {state : {id : curClass}})
    }

    return (
        <>
            <div className='mainclass-body'>
                <div>Created Classes</div>
                {props.curClass &&  props.curClass.map((ele) => (
                    <ClassComponent curClass = {ele} key = {ele._id} setCurClass = {setCurClass}/>
                ))}
            </div>
            <button> Create Class</button>
        </>
    )
}

export default CreateClass;