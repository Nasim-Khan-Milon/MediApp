import { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { UserContext } from './context/UserContext'
import { DoctorContext } from './context/DoctorContext'

import Navbar from './components/Navbar'
import DoctorNavbar from './components/DoctorNavbar'
import Sidebar from './components/Sidebar'

// Pages
import Login from './pages/Login'

import Home from './pages/User/Home'
import Contact from './pages/User/Contact'
import About from './pages/User/About'
import MyAppointments from './pages/User/MyAppointments'
import MyProfile from './pages/User/MyProfile'

import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorPatient from './pages/Doctor/DoctorPatient'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import Footer from './components/Footer'

function App() {

  const { token } = useContext(UserContext)
  const { dToken } = useContext(DoctorContext)

  const location = useLocation()
  const path = location.pathname

  const showUserLayout = path.startsWith('/user')
  const showDoctorLayout = path.startsWith('/doctor')


  return (
    <div className='bg-[#F8F9FD] min-h-screen'>
      <ToastContainer />

      {/* Layouts */}
      {showUserLayout && <Navbar />}
      {showDoctorLayout && dToken && <DoctorNavbar />}

      <div className='flex items-start'>
        {showDoctorLayout && dToken && <Sidebar />}
        {/* ALL ROUTES IN ONE PLACE */}
        <Routes>
          {/* Public */}
          <Route path='/login' element={<Login />} />

          {/* User Routes */}
          <Route path='/user/home' element={<Home />} />
          <Route path='/user/my-profile' element={<MyProfile />} />
          <Route path='/user/my-appointments' element={<MyAppointments />} />
          <Route path='/user/contact' element={<Contact />} />
          <Route path='/user/about' element={<About />} />


          {/* Doctor Routes */}
          {
            dToken && <>
              <Route path='/doctor/dashboard' element={<DoctorDashboard />} />
              <Route path='/doctor/appointments' element={<DoctorAppointments />} />
              <Route path='/doctor/patient' element={<DoctorPatient />} />
              <Route path='/doctor/profile' element={<DoctorProfile />} />
            </>
          }


        </Routes>
      </div>
      {showUserLayout && <Footer />}
    </div>
  )
}

export default App
