import './App.css'
import { lazy, Suspense } from 'react'
const HomePage = lazy(() => import('./pages/Home'));
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router";
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const EventDetails = lazy(() => import('./pages/Event'));
const MyBookings = lazy(() => import('./pages/MyBooking'));
import Footer from './components/Footer'
import PageLoader from './components/Loder';


function App() {

  return (
   <div className="min-h-screen bg-slate-50">
      <Navbar/>
      <Suspense fallback={<PageLoader />}> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/event/:eventId' element={<EventDetails />} />
            <Route path='/my-bookings' element={<MyBookings />} />
          </Routes>
        </Suspense>
      <Footer />
   </div>
  )
}

export default App
