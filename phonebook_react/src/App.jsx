import { useState } from 'react'
import './App.css'
import CreateUser from "./pages/CreateUser"
import Navbar from './Navbar'
import ViewUser from './pages/ViewUser'
import { Route, Routes } from "react-router-dom"
import EditUser from './pages/EditUser'

const App = () => {

  return (    
    <>
      <Navbar />
      <div className='appContainer'>

        <br></br>
        <Routes>
          <Route path="/" element={<ViewUser />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="user/:id/edit" element={<EditUser />} />
        </Routes>
      </div>
    </>

  );
}

export default App
