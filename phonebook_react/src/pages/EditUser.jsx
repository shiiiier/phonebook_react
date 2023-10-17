import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
 
export default function EditUser(){
  
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const {id} = useParams();
  
    useEffect(() => {
        getUser();
    }, []);
  
    function getUser() {
        axios.get(`http://127.0.0.1:5000/userdetails/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        }).catch(err => {
            console.log(err)
        }
        );
    }
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("HandleSubmit Function")
        console.log(inputs)
  
        axios.put(`http://127.0.0.1:5000/userupdate/${id}`,inputs).then(function(response){
            console.log(id)
            console.log(response.data);

            navigate('/');
        });
        alert("Successfully Updated");
    }
     
    return (
    <div>
        <div className="container h-100">
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
            <h1>Edit user</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Name</label>
                  <input type="text" value={inputs.name} className="form-control" name="name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Phone Number</label>
                  <input type="text" value={inputs.phoneNumber} className="form-control" name="phoneNumber" onChange={handleChange} />
                </div>   
                <button type="submit" name="update" className="btn btn-primary">Save</button>
            </form>
            </div>
            <div className="col-2"></div>
        </div>
        </div>
    </div>
  );
}