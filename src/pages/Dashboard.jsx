import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [counter, setCounter] = useState(1);

  const { currentUser } = useSelector((state) => state.user); // Get currentUser from Redux state
  const navigate = useNavigate(); // Initialize useNavigate hook

  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
   
    try {
      const response = await axios.get('http://localhost:3000/api/student/get');
      setStudentList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    if (!currentUser) {
      return <navigate to="/sign-in" />;
    }
  };
  

  const handleDelete = (studentId) => {
    const studentToDelete = studentList.find((student) => student._id === studentId);
    setSelectedStudent(studentToDelete);
    setShowConfirmation(true);
  };
  if (!currentUser) {
    navigate('/sign-in'); // Use navigate('/sign-in') for redirection
    return null; // Optionally return null or loading indicator
  }

  const confirmDelete = async () => {
    try {
      if (selectedStudent) {
        const response = await axios.put(`http://localhost:3000/api/student/delete/${selectedStudent._id}`);
        if (response && response.status === 200) {
          setShowConfirmation(false);
          setSelectedStudent(null);
          fetchData();
        } else {
          console.error('Failed to delete student');
        }
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setSelectedStudent(null);
  };
  


  return (
    <div className='p-3 '>
      <h1 className='text-3xl font-semibold text-center my-7'>Student Details</h1>

      <div className='my-6'>
      <Link to={`/addStudent/`} className='p-4 my-2 ml-8 font-medium text-white bg-blue-600 rounded-lg hover:opacity-80'>
            Add new student
      </Link>
      </div>

      <div className='flex justify-center border '>
      {showConfirmation && (
        <div className="p-3 border-red-500 rounded delete-confirmation ">
          <p className='font-bold text-red-700'>Are you sure you want to delete <span className='fw-bold text-dark'> {selectedStudent && selectedStudent.name}</span>?</p>
          <button className="p-2 ml-12 bg-red-300 rounded-lg hover:opacity-80 " onClick={confirmDelete}>Delete</button>
          <span className='mx-1'> | </span>
          <button className="p-2 bg-green-300 rounded-lg hover:opacity-80 " onClick={cancelDelete}>Cancel</button>
        </div>
      )}
      </div>
      <table className="table w-full p-4 mx-auto bg-white rounded-lg shadow">
          <thead>
              <tr>
                  <th className="p-4 font-bold text-gray-900 border-b-2 dark:border-dark-5 whitespace-nowrap">
                      #
                  </th>
                  <th className="p-4 font-bold text-gray-900 border-b-2 dark:border-dark-5 whitespace-nowrap">
                      Name
                  </th>
                  <th className="p-4 font-bold text-gray-900 border-b-2 dark:border-dark-5 whitespace-nowrap">
                      Age
                  </th>
                  <th className="p-4 font-bold text-gray-900 border-b-2 dark:border-dark-5 whitespace-nowrap">
                      Email
                  </th>
                  <th className="p-4 font-bold text-gray-900 border-b-2 dark:border-dark-5 whitespace-nowrap">
                      Phone
                  </th>
                  <th className="p-4 font-bold text-gray-900 border-b-2 dark:border-dark-5 whitespace-nowrap">
                      Address
                  </th>
                  <th className="p-4 font-bold text-gray-900 border-b-2 dark:border-dark-5 whitespace-nowrap">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody>
          {studentList.map((student, idx) => (
              <tr key={student._id}>
                <th scope='row'>{counter + idx}</th>
                <td className='p-4 border bg-slate-50 border-b-slate-500'>{student.name}</td>
                <td className='p-4 border bg-slate-50 border-b-slate-500'>{student.age}</td>
                <td className='p-4 border bg-slate-50 border-b-slate-500'>{student.email}</td>
                <td className='p-4 border bg-slate-50 border-b-slate-500'>{student.phone}</td>
                <td className='p-4 border bg-slate-50 border-b-slate-500'>{student.address}</td>
                <td className='p-4 border bg-slate-50 border-b-slate-500'>
                  <Link to={`/updateStudent/${student._id}`} className='font-bold text-green-500 rounded-lg hover:bg-green-200 hover:text-green-700'>
                    Edit
                  </Link>
                  <span className='mx-1'> | </span>
                  <button className="font-bold text-red-500 rounded-lg hover:bg-red-200 hover:text-red-700" onClick={() => handleDelete(student._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
             
          </tbody>
      </table>

    </div>
  )
}