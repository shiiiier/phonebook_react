import { useState, Fragment, useEffect } from 'react'
import ReadOnly from './ReadOnly';
import EditableRow from './EditableRow';
import axios from "axios";
import { Link } from 'react-router-dom';

const ViewUser = () => {

  // const [contacts, setContacts] = useState(data)

  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get(`http://127.0.0.1:5000/listContacts`).then(function(response) {
      
      console.log(response.data);
      setUsers(response.data);

    });
  }

  const deleteUser = (id) => {
    axios.delete(`http://127.0.0.1:5000/userdelete/${id}`).then(function(response){
        console.log(response.data);
        getUsers();
    });
    alert("Successfully Deleted");
  }
    
  return (
    <>
    <div className='appContainer'>
      <form>
        <table className='table-responsive'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, key) => 
                <tr key= {key}>
                  <td>{user.name}</td>
                  <td>{user.phoneNumber}</td>

                  <td>
                    <Link to={`user/${user.id}/edit`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
                // <ReadOnly user = {users}/>

            )}


          </tbody>
        </table>
        </form>


    </div>
    </>

  );
}

export default ViewUser
