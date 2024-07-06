import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const { authData, user } = useAuth();
  
  const [statusFilter, setStatusFilter] = useState('all'); 

  // Fetch tasks based on title and status filter
  const fetchTasks = async (title = '', status = '') => {
    try {
      const response = await axios.get('http://localhost:8000/tasks', {
        params: { title, status:status==="all"?"":status },
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authData?.token,
        },
      }); 

      if(response.data && Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
      } else {
        console.error('Response is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 
  useEffect(() => {
    fetchTasks();
  }, [authData?.token]);

  
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    fetchTasks(searchTitle, status === 'all' ? '' : status); 
  };

 
  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
  };

  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTasks(searchTitle, statusFilter); 
  };

  // Function to handle task status update
  const handleChange = async (e, task) => {
    const { value } = e.target;

    try {
      await axios.put(
        `http://localhost:8000/tasks/${task._id}`,
        { status: value, user: user?._id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authData?.token,
          },
        }
      );

      toast.success('Status updated successfully', { position: 'top-right' });
      fetchTasks(searchTitle, statusFilter); // Fetch tasks with current search title and status filter
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Function to delete a task
  const deleteUser = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${taskId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authData?.token,
        },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <main className="md:container mx-auto">
      <div>
        <h1 className="font-extrabold text-lg m-7">Welcome, {user?.name}</h1>

        <div className="font-semibold text-lg m-7 flex items-center">
          <Link className="text-white bg-[#2d9732] p-3 rounded-xl m-5" to={'/add'}>
            Add Task
          </Link>
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              value={searchTitle}
              onChange={handleSearchChange}
              placeholder="Search here by title"
              className="border border-gray-300 p-2 rounded-l-md"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md">
              Search
            </button>
          </form>
        </div>

        {/* Radio buttons for status filter */}
        <div className="m-7">
          <input
            type="radio"
            id="all"
            name="status"
            value="all"
            checked={statusFilter === 'all'}
            onChange={() => handleStatusFilterChange('all')}
            className="mr-2"
          />
          <label htmlFor="all">All</label>

          <input
            type="radio"
            id="Pending"
            name="status"
            value="Pending"
            checked={statusFilter === 'Pending'}
            onChange={() => handleStatusFilterChange('Pending')}
            className="mx-2"
          />
          <label htmlFor="Pending">Pending</label>

          <input
            type="radio"
            id="complete"
            name="status"
            value="Complete"
            checked={statusFilter === 'Complete'}
            onChange={() => handleStatusFilterChange('Complete')}
            className="mx-2"
          />
          <label htmlFor="Complete">Complete</label>
        </div>

        <table className="border-separate border-spacing-2 border-2 border-slate-400 mx-7 mb-5">
          <thead className="bg-black text-white">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr className="my-4" key={index}>
                <td>{task.title}</td>
                <td>{task.describe}</td>
                <td>
                  <div className="flex gap-1 my-2">
                    <select
                      id="status"
                      name="status"
                      value={task.status}
                      onChange={(e) => handleChange(e, task)}
                      className="sm:text-sm rounded-md bg-blue-600 text-white p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Complete">Complete</option>
                    </select>
                    <button
                      onClick={() => deleteUser(task._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <Link
                      className="ml-4 py-[6px] px-3 bg-[#929b16] rounded-lg text-white"
                      to={`/edit/${task._id}`}
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
