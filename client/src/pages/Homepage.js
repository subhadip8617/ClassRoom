import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import "./Homepage.css";
import CreateClass from "./CreateClass";
import JoinClass from "./JoinClass";

const HomePage = () => {
    const [user, setUser] = React.useState({});
    const navigate = useNavigate();
    const [counter, setCounter] = React.useState(1);

    const getUser = async() => {
        try {
            // console.log(localStorage.getItem('token'));
            const res = await axios.post('http://localhost:8080/api/v1/user/getUserData', {}, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if(res.data.success){
                setUser(res.data.data);
                // console.log(res.data.data)
            }
            else{
                alert("invalid token");
                navigate('/login');
            }
        } catch (error) {
            alert('Login Session Expired');
            navigate('/login');
        }
    }

    React.useEffect(() => {
        if(!localStorage.getItem('token')){
            alert("login session expired");
            navigate('/login');
        }
        else{
            getUser();
        }
    }, []);

    const logout=() => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleClick = () => {
        setCounter(1 - counter);
    }

    return (
        <div className="main-body">
            <header className="navbar">
                <p> Welcome {user && user.userName}</p>
                <button onClick={logout}> Logout </button>
            </header>
            <p> This is HomePage </p>
            <button onClick={handleClick}> Change Class Type </button>
            {counter === 1 ? 
                <CreateClass curClasses = {user.createdClasses} />
                :
                <JoinClass curClasses = {user.joinedClasses} />
            }
        </div>
    )
}

export default HomePage;