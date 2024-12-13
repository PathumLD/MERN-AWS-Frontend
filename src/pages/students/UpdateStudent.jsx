import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/api/student/getStudentById/${id}`)
      .then((response) => {
        const { name, age, email, phone, address } = response.data;
        setUserForm({ name, age, email, phone, address });
      })
      .catch((error) => {
        console.error('Error fetching student details:', error);
      });
  }, [id]);

  const inputsHandler = (e) => {
    setUserForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/student/updateStudent/${id}`, userForm);
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">

<div className="sm:col-span-full">
    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
      Name
    </label>
    <div className="mt-2">
      <input
        type="text"
        name="name"
        id="name"
        value={userForm.name}
        onChange={inputsHandler}
        className="block w-full rounded-md pl-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
    </div>

    <div className="sm:col-span-full">
        <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
          Age
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="age"
            id="age"
            value={userForm.age}
            onChange={inputsHandler}
            className="block w-full rounded-md pl-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-full">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="email"
            id="email"
            value={userForm.email}
            onChange={inputsHandler}
            className="block w-full rounded-md pl-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-full">
        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
          Phone No
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="phone"
            id="phone"
            value={userForm.phone}
            onChange={inputsHandler}
            className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
          Address
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="address"
            id="address"
            value={userForm.address}
            onChange={inputsHandler}
            className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    
  </div>
        <button type="submit" className="px-4 py-2 mt-6 text-white bg-blue-700 rounded-lg">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateStudent;