import { useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        console.log(response.data);
        navigate("/");
      });
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
    </div>
  );
};

export default CreateUser;
