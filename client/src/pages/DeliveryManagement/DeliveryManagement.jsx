import { useState, useEffect } from 'react';
import DelivaryTaskTable from './DelivaryTaskTable';
import { Link } from 'react-router-dom';
import { MdDownload } from 'react-icons/md';
import SideBar from '../../components/SideBar';
import { jsPDF } from "jspdf";
import axios from 'axios';
// import "";

const DeliveryManagement = () => {
  const [taskCount, setTaskCount] = useState(0);
  const [deliveredTaskCount, setDeliveredTaskCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [availableDriverCount, setAvailableDriverCount] = useState(0);

  useEffect(() => {
    fetchDrivers()
  }, []);

  const fetchDrivers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/driver/get-driver`);

    if (response.status === 200) {
      const drivers = response.data.driver;

      setDriverCount(drivers.length);


      const availableDriverCount = drivers.filter(
        (driver) =>
          driver.availabilty === "Available" &&
          driver.licenseValidity === "Valid"
      );
      // console.log(response.data)

      setAvailableDriverCount(availableDriverCount.length);
    } else {
      console.error("Failed to fetch drivers:", response.statusText);
      throw new Error("Failed to fetch drivers");
    }
  } catch (error) {
    console.error("Error fetching drivers:", error);
  }
};

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'>
      <SideBar />
      <div className='flex-1 p-8'>
        {/* Header */}
        <div className='flex justify-between items-center bg-white/10 backdrop-blur-lg p-6 rounded shadow-lg border border-white/20'>
          <h1 className='text-3xl font-bold'>Task Management Dashboard</h1>
          <div className='flex gap-4'>
            <div className='flex items-center gap-3'>
              <div>
                <h1 className='font-semibold'>Dilmani Kiriella</h1>
                <p className='text-xs text-gray-300'>Delivery Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-3 gap-6 mt-8'>
          <div className='p-6 rounded bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 hover:scale-105 transition'>
            <p className='text-center text-lg'>Task Count</p>
            <p className='text-center text-4xl font-bold'>{taskCount}</p>
          </div>
          <div className='p-6 rounded bg-green-500/20 backdrop-blur-lg shadow-lg border border-green-400/30 hover:scale-105 transition'>
            <p className='text-center text-lg'>Delivered Orders</p>
            <p className='text-center text-4xl font-bold'>{deliveredTaskCount}</p>
          </div>
          <div className='p-6 rounded bg-red-500/20 backdrop-blur-lg shadow-lg border border-red-400/30 hover:scale-105 transition'>
            <p className='text-center text-lg'>Available Driver Count</p>
            <p className='text-center text-4xl font-bold'>{availableDriverCount}</p>
          </div>
        </div>

        {/* Add Task Button */}
        <div className='mt-6 flex justify-between items-center'>
          <Link
            to="/create-task"
            className='block w-fit bg-green-600/60 hover:bg-green-700 backdrop-blur-lg text-white font-semibold rounded px-6 py-3 shadow-lg'
          >
            Add New Task
          </Link>
          <Link
            to="/driver-create"
            className='block w-fit bg-green-600/50 hover:bg-green-700 backdrop-blur-lg text-white font-semibold rounded px-6 py-3 shadow-lg'
          >
            Manage Tasks
          </Link>
          <Link
            to="/driver-management"
            className='block w-fit bg-green-600/50 backdrop-blur-lg hover:bg-green-700 text-white font-semibold rounded px-6 py-3 shadow-lg'
          >
            Manage Drivers
          </Link>
        </div>

        {/* Table */}
        <div className='mt-8 bg-white/10 backdrop-blur-lg rounded p-4 shadow-lg border border-white/20'>
          <DelivaryTaskTable />
        </div>
      </div>
    </div>
  );
}


export default DeliveryManagement
