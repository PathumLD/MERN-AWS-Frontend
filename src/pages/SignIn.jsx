import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import FbAuth from '../components/FbAuth';

export default function SignIn() {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/dashboard');
      
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='my-8 text-3xl font-bold text-center'>Sign In</h1>
      <p className='my-5 font-bold text-center text-red-700'>
        {error ? error || 'Something went wrong!. Please check again.' : ''}
      </p>
      <form onSubmit = {handleSubmit} className='flex flex-col gap-4 '>
        
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
          {loading ? 'Loading...' : 'Sign In'}
          </button>
          <OAuth />
          <FbAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to = '/sign-up'>
          <span className='font-semibold text-blue-500'>Sign Up</span>
        </Link>
      </div>
      
    </div>
  )
}
