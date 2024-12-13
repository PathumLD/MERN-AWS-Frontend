import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import FbAuth from '../components/FbAuth';

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in')
      
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='my-8 text-3xl font-bold text-center'>Sign Up</h1>
      <p className='my-5 font-bold text-center text-red-700'>{error && 'Something went wrong!. Please check again.'}</p>
      <form onSubmit = {handleSubmit} className='flex flex-col gap-4 '>
        <input 
          type ="text" 
          placeholder = "Username" 
          id = "username" 
          className='p-3 rounded-lg bg-slate-100' 
          onChange = {handleChange}
        />
        <input 
          type ="email" 
          placeholder = "Email" 
          id = "email" 
          className='p-3 rounded-lg bg-slate-100' 
          onChange = {handleChange}
        />
        <input 
          type ="password" 
          placeholder = "Password" 
          id = "password" 
          className='p-3 rounded-lg bg-slate-100' 
          onChange = {handleChange}
        />

        <button disabled={loading} className='py-3 font-bold text-white uppercase bg-blue-700 rounded-lg hover:opacity-90 disabled:opacity-50'>
          {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth />
          <FbAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to = '/sign-in'>
          <span className='font-semibold text-blue-500'>Sign In</span>
        </Link>
      </div>
      
    </div>
  )
}
