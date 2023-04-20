import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';


function App() {

  return (
    <div className="App">
      <ToastContainer />
     <Header />
      <Outlet />
    </div>
  )
}

export default App
