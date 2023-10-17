import { useState } from 'react'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const CreateUser = () => {

    const navigate = useNavigate(); 
    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
      event.preventDefault();

      axios.post(`http://127.0.0.1:5000/useradd`, inputs).then(function(response){
        console.log(response.data);
        navigate('/');
      });
    }

    return(
        <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            required="required"
            placeholder='eg. Adam Lau'
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            required="required"
            placeholder='eg. 6588889999 / 60117778888'
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-danger">Add</button>
      </form>

    )
}

export default CreateUser