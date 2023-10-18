import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditUser() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get(`http://127.0.0.1:5000/userdetails/${id}`)
      .then(function (response) {
        console.log(response.data);
        setInputs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("HandleSubmit Function");
    console.log(inputs);

    axios
      .put(`http://127.0.0.1:5000/userupdate/${id}`, inputs)
      .then(function (response) {
        console.log(id);
        console.log(response.data);

        navigate("/");
      });

    toast("Contact updated!",{
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
            {/* <h1>Edit user</h1> */}

            <form onSubmit={handleSubmit} className="new-item-form">
              <div className="form-row">
                <label>Name</label>
                <input
                  type="text"
                  value={inputs.name}
                  className="form-control"
                  required="required"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={inputs.phoneNumber}
                  className="form-control"
                  name="phoneNumber"
                  required="required"
                  onChange={handleChange}
                />
              </div>
              <div className="row">
                <div className="col-6 form-row">
                  <button
                    type="submit"
                    name="update"
                    className="btn btn-success"
                  >
                    Save
                  </button>
                </div>
                <div className="col-6 form-row">
                  <Link to={`/`} className="btn btn-danger">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}
