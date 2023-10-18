import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://127.0.0.1:5000/useradd`, inputs)
      .then(function (response) {
        navigate("/");
      });

    toast("Contact added!",{
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
  };

  return (
    <div>
    <div className="container h-100">
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                required="required"
                placeholder="eg. Adam Lau"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                required="required"
                placeholder="eg. 88889999"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success">Add</button>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
    </div>
  );
};

export default CreateUser;
