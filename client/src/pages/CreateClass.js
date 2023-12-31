import React from "react";
import "./classPage.css";
import ClassComponent from "../components/ClassComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateClass = (props) => {
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
        const res = await axios.post('http://localhost:8080/api/v1/class/createClass', inputs, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if(res.data.success){
            alert('New Class Created');
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
        <div>Created Classes</div>
        {show ? (
          <>
            <form onSubmit={handleSubmit}>
              <label>
                Enter The ClassName:
                <input
                  name="className"
                  value={inputs.className || ""}
                  onChange={handleChange}
                />
              </label>
              <br/>
              <label>
                Enter The setion:
                <input
                  name="section"
                  value={inputs.section || ""}
                  onChange={handleChange}
                />
              </label>
              <br />
              <input type="submit" />
            </form>
            <button onClick={handleClick}> Go Back </button>
          </>
        ) : (
          <button onClick={handleClick}> Create Class</button>
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

export default CreateClass;
