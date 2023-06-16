import React from "react";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import "./Loginpage.css";

const LoginPage = () => {
    const [inputs, setInputs] = React.useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({
            ...values,
            [name] : value
        }))
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post('http://localhost:8080/api/v1/user/login', inputs);
            if(res.data.success){
                localStorage.setItem('token', res.data.token);
                alert(res.data.msg);
                navigate('/');
            }
            else{
                alert(res.data.msg);
            }
        } catch (error) {
            alert(error);
        }

    }

    const validToken = async() => {
        const res = await axios.post('http://localhost:8080/api/v1/user/getUserData', {}, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if(res.data.success){
            alert(`Hello ${res.data.data.userName}, your token is still valid`);
            navigate('/');
        }
    }

    React.useEffect(() => {
        if(localStorage.getItem('token')){
            validToken();
        }
    }, []);

    return (
        <div className="outer-body">
        <form onSubmit={handleSubmit} className="user-form">
            <h1>Login Here</h1>
            <label>
                Enter Your Email:
                <input
                    type="email"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}
                /> 
            </label>
            <br/>
            <label>
                Enter Your password:
                <input
                    type="password"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                /> 
            </label>
            <br/>
            <Link to='/register'>Register Here</Link>
            <br/>
            <input type="submit" />
        </form>
        </div>
    )
}

export default LoginPage;