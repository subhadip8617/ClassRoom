import React from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const ClassDetailsPage = () => {
    const location = useLocation();
    const id = location.state.id;

    const [curClass, setCurClass] = React.useState(null);

    const getClass = async() => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/class/getClassDetails', {
                "classId" : id
            }, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if(res.data.success){
                setCurClass(res.data.data);
            }
            else{
                alert(res.data.msg);
            }
        } catch (error) {
            alert(error);
        }
    }

    React.useEffect(() => {
        getClass();
    }, [])

    console.log(curClass)

    return (
        <>
            {curClass && 
                <>
                    <h1> {curClass.className} </h1>
                    <p> {curClass.section} </p>
                    <p> Created By - {curClass.createdBy}</p>
                    {curClass.joinedBy.length ? 
                        <>
                            <p> Joined By </p>
                            {curClass.joinedBy.map((ele) => (
                                <p> {ele} </p>
                            ))}
                        </> :
                        <p> No one Joined </p>
                    }
                    {curClass.messages.length ? 
                        <>
                            <p> Messages Are </p>
                            {curClass.messages.map((ele) => (
                                <p> {ele} </p>
                            ))}
                        </> :
                        <p> No messages yet </p>
                    }
                </>
            }
        </>
        // <div>ClassDetailsPage With Id {id}</div>
    )
}

export default ClassDetailsPage