import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeliveryTaskcreateForm = () => {
  const navigate = useNavigate();
    const [value, setValue] = useState({
        orderId: '',
        cusName: '',
        cusAddress: '',
        deliDate: '',
        assignDriv: '',
        deliStatus: 'Delivered'
    });

    const [errors, setErrors] = useState({});
    const [filteredDrivers, setAvailableDrivers] = useState([]);

    useEffect(() => {
      const fetchAvailableDrivers = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/driver/get-driver`);
          console.log(response.data); 
          const filteredDrivers = response.data.driver.filter(driver => driver.availabilty === 'Available' && driver.licenseValidity === 'Valid');
          setAvailableDrivers(filteredDrivers);
        } catch (error) {
          console.error('Error fetching available drivers:', error);
        }
      };

      fetchAvailableDrivers();
    }, []);

  

    const handleChange = (e) => {
        const { name, value} = e.target;
        setValue(prevState => ({
            ...prevState,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

 

    const checkOrderID = async (orderId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/task/checkorder`, {
                params: { orderId }
            });
            return response.data.exists;
        } catch (error) {
            console.error("Error checking order ID:", error);
            return false;
        }
    };

    const validateInputs = async (values) => {
        const validationErrors = {};

        const orderIDRegex = /^O\d{3}$/;

        if (!values.orderId.trim()) {
            validationErrors.orderId = 'Order ID is required';
        } else if (!orderIDRegex.test(values.orderId.trim())) {
            validationErrors.orderId = 'Order ID must be in the format "O001"';
        } else {
            const exists = await checkOrderID(values.orderId);
            if (exists) {
                validationErrors.orderId = 'Order ID already exists';
            }
        }
        if (!values.cusName.trim()) {
          validationErrors.cusName = 'Customer Name is required';
        }

        if (!values.cusAddress.trim()) {
          validationErrors.cusAddress = 'Customer Address is required';
        }
        if (!values.assignDriv.trim()) {
          validationErrors.assignDriv = 'A Driver should be assigned';
        }

        if (!values.deliDate.trim()) {
            validationErrors.deliDate = 'Delivery Date is required';
        } else {
            const deliveryDate = new Date(values.deliDate);
            const currentDate = new Date();

        if (deliveryDate < currentDate) {
          validationErrors.deliDate = 'Delivery Date must be on or after current date';
      }
  }     

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = await validateInputs(value);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            Object.values(validationErrors).forEach(error => toast.error(error, { duration: 6000, position: 'top-right' }));
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/task/create`, value);
            if (response.data.success) {
                toast.success("Task created successfully!", { duration: 4000 });
                setTimeout(() => {
                    navigate('/taskpage');
                }, 1000);
                console.log(response.data)
            } else {
                toast.error("Failed to create task.");
            }
        } catch (error) {
            console.error("Error creating task:", error);
            toast.error("Error creating task. Please try again.");
        }
    };

  return (
    <div className="flex min-h-screen bg-slate-900">
      <SideBar />
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-white">Add New Task</h1>
          <div className="flex gap-2 items-center">
            <img className="w-12 h-12 border-2 border-gray-200 rounded-full" src="https://avatars.githubusercontent.com/u/135573281?s=400&u=b5f0d9838a0b5191e9b7f8e32eaaa69b5974847b&v=4" alt="profile" />
            <div>
              <h2 className="font-bold text-white">Dilmani Kiriella</h2>
              <p className="text-xs text-white">Delivery Manager</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/20 rounded shadow-xl border border-gray-800 p-10 max-w-4xl">
          <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <label className="font-semibold text-gray-300">Order ID</label>
                <input type="text" name="orderId" value={value.orderId} onChange={handleChange} placeholder="Enter order ID" className="border border-gray-800 rounded p-3  w-full focus:outline-none focus:border-blue-100 text-white" />
              </div>
              <div>
                <label className="font-semibold text-gray-300">Customer Name</label>
                <input type="text" name="cusName" value={value.cusName} onChange={handleChange} placeholder="Enter customer name" className="border border-gray-800 rounded p-3 w-full focus:outline-none focus:border-blue-400 text-white" />
              </div>
              <div>
                <label className="font-semibold text-gray-300">Customer Address</label>
                <input type="text" name="cusAddress" value={value.cusAddress} onChange={handleChange} placeholder="Enter customer address" className="border border-gray-800 rounded p-3 w-full focus:outline-none focus:border-blue-400 text-white" />
              </div>
              <input type="submit" value="Submit" className="bg-slate-950 hover:border hover:border-gray-800 hover:bg-slate-900 shadow-2xl text-white font-semibold p-3 rounded cursor-pointer " />
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <div>
                <label className="font-semibold text-gray-300">Delivery Date</label>
                <input type="date" name="deliDate" value={value.deliDate} onChange={handleChange} className="border border-gray-800 rounded p-3 w-full focus:outline-none focus:border-blue-400 text-white" />
              </div>
              <div>
                <label className="font-semibold text-gray-300">Driver</label>
                <select name="assignDriv" value={value.assignDriv} onChange={handleChange} className="border border-gray-800 rounded p-3 w-full focus:outline-none focus:border-blue-400 text-white">
                  <option value="">Select a driver</option>
                  {filteredDrivers.map(driver => (
                    <option key={driver.driverId} value={driver.driverId}>{driver.driverName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold text-gray-300">Delivery Status</label>
                <select name="deliStatus" value={value.deliStatus} onChange={handleChange} className="border border-gray-800 rounded p-3 w-full focus:outline-none focus:border-blue-400">
                  <option value="Order Confirmed">Order Confirmed</option>
                  <option value="On the way">On the way</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeliveryTaskcreateForm
