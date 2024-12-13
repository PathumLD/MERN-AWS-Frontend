import React, { useState } from 'react';
import { FacebookAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function FbAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleFacebookClick = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          // You may also pass the credential: result.credential if needed in backend
        }),
      });

      const data = await res.json();
      console.log(data);

      dispatch(signInSuccess(data));

      navigate('/dashboard'); // Redirect after successful login
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        setError('An account with this email already exists using a different sign-in method.');
        // Implement code to handle account linking or inform the user about the situation
        // You should allow the user to link accounts or choose an appropriate action
      } else {
        setError('Could not login with Facebook');
        console.error('Could not login with Facebook', error);
      }
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <button
        type='button'
        onClick={handleFacebookClick}
        className='p-3 text-white uppercase bg-blue-800 rounded-lg hover:opacity-95'
      >
        Continue with Facebook
      </button>
      </>
  );
}
