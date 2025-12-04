import { useState } from 'react'
import Login from './pages/Login'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App
