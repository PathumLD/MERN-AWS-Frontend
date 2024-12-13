import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/students/AddStudent';
import UpdateStudent from './pages/students/UpdateStudent';
import Dashboard2 from './pages/Dashboard2';

export default function App() {
  const user = false;
  return (
    <>
      <BrowserRouter>

      <Header />

        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/about' element = {<About />} />
          <Route path='/sign-in' element = {user ? <Navigate to='/dashboard' /> : <SignIn />} />
          <Route path='/sign-up' element = {<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/dashboard' element = {<Dashboard />} />
          <Route path='/dashboard2' element = {<Dashboard2 />} />
          <Route path='/addStudent' element = {<AddStudent />} />
          <Route path='/updateStudent/:id' element = {<UpdateStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
