import React from "react";
import "./classPage.css";
import ClassComponent from "../components/ClassComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JoinClass = (props) => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [inputs, setInputs] = React.useState({});
  const [curClass, setCurClass] = React.useState(null);

  if (curClass) {
    navigate("/class-details", { state: { id: curClass } });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = async (event) => {
    try {
        event.preventDefault();
        const res = await axios.post('http://localhost:8080/api/v1/class/joinClass', inputs, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if(res.data.success){
            alert(res.data.msg);
            setShow(!show);
        }
        else{
            alert(res.data.msg)
        }
    } catch (error) {
        alert(error);
    }
  }

  return (
    <>
      <div className="mainclass-body">
        <div>Joined Classes</div>
        {show ? (
          <>
            <form onSubmit={handleSubmit}>
              <label>
                Enter The ClassID:
                <input
                  name="classId"
                  value={inputs.classId || ""}
                  onChange={handleChange}
                />
              </label>
              <br />
              <input type="submit" />
            </form>
            <button onClick={handleClick}> Go Back </button>
          </>
        ) : (
          <button onClick={handleClick}> Join Class</button>
        )}
        {props.curClasses &&
          props.curClasses.map((ele) => (
            <ClassComponent
              curClass={ele}
              key={ele._id}
              setCurClass={setCurClass}
            />
          ))}
      </div>
    </>
  );
};

export default JoinClass;
