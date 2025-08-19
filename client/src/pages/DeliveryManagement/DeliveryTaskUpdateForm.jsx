import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save, User, MapPin, Calendar, Truck, Package } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';


const DeliveryTaskUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, settaskData] = useState({
        orderId: '',
        cusName: '',
        cusAddress: '',
        deliDate: '',
        assignDriv: '',
        deliStatus: ''
    });

    const [errors, setErrors] = useState({});
    const [filteredDrivers, setAvailableDrivers] = useState([]);

  useEffect(() => {
      axios.get(`${import.meta.env.VITE_API_URL}/api/task/get/${id}`)
          .then(result => {
              const task = result.data.task;
              task.deliDate = task.deliDate.split('T')[0];
              settaskData(task);
          })
          .catch(err => console.error(err));
  }, [id]);   

    
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
        settaskData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };


    const validateInputs = async (taskData) => {
        const validationErrors = {};
        
        if (!taskData.deliDate.trim()) {
            validationErrors.deliDate = 'Delivery Date is required';
        } else {
            const deliveryDate = new Date(taskData.deliDate);
            const currentDate = new Date();

        if (deliveryDate < currentDate) {
          validationErrors.deliDate = 'Delivery Date must be on or after current date';
      }
  }     
        if (!taskData.cusName.trim()) {
          validationErrors.cusName = 'Customer Name is required';
      }
        if (!taskData.cusAddress.trim()) {
          validationErrors.cusAddress = 'Delivery Address is required';
      }
        if (!taskData.assignDriv.trim()) {
          validationErrors.assignDriv = 'A Driver should be assigned';
      }
       
        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = await validateInputs(taskData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            Object.values(validationErrors).forEach(error => toast.error(error, { duration: 6000, position: 'top-right' }));
            return;
        }

        try {
          await axios.put(`${import.meta.env.VITE_API_URL}/api/task/update/${id}`, taskData);
          toast.success('Task updated successfully!');
          setTimeout(() => {
              navigate('/taskpage');
          }, 1000);
      } catch (error) {
          toast.error('Task update failed!');
          console.error('Error updating task:', error);
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-3xl font-bold text-white">Update Task</h1>
            </div>
            <div className="flex items-center gap-3">
              <img 
                className="w-12 h-12 border-2 border-white/30 rounded-full" 
                src="https://avatars.githubusercontent.com/u/120442263?s=400&u=7520de9a5dfa3a68aa9b35c51ff4a845145e3d6d&v=4" 
                alt="Profile"
              />
              <div>
                <h3 className="text-white font-semibold">Dilmani Kiriella</h3>
                <p className="text-slate-300 text-sm">Delivery Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Order ID */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Package className="w-4 h-4" />
                    Order ID
                  </label>
                  <input
                    type="text"
                    name="orderId"
                    value={taskData.orderId}
                    readOnly
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 cursor-not-allowed"
                  />
                </div>

                {/* Customer Name */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <User className="w-4 h-4" />
                    Customer Name
                  </label>
                  {errors.cusName && (
                    <p className="text-red-400 text-sm mb-1">{errors.cusName}</p>
                  )}
                  <input
                    type="text"
                    name="cusName"
                    value={taskData.cusName}
                    onChange={handleChange}
                    placeholder="Enter customer name"
                    className={`w-full p-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                      errors.cusName ? 'border-red-500/50' : 'border-white/20'
                    }`}
                  />
                </div>

                {/* Customer Address */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <MapPin className="w-4 h-4" />
                    Customer Address
                  </label>
                  {errors.cusAddress && (
                    <p className="text-red-400 text-sm mb-1">{errors.cusAddress}</p>
                  )}
                  <textarea
                    name="cusAddress"
                    value={taskData.cusAddress}
                    onChange={handleChange}
                    placeholder="Enter customer address"
                    rows="3"
                    className={`w-full p-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none ${
                      errors.cusAddress ? 'border-red-500/50' : 'border-white/20'
                    }`}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Delivery Date */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    Delivery Date
                  </label>
                  {errors.deliDate && (
                    <p className="text-red-400 text-sm mb-1">{errors.deliDate}</p>
                  )}
                  <input
                    type="date"
                    name="deliDate"
                    value={taskData.deliDate}
                    onChange={handleChange}
                    className={`w-full p-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                      errors.deliDate ? 'border-red-500/50' : 'border-white/20'
                    }`}
                  />
                </div>

                {/* Assigned Driver */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Truck className="w-4 h-4" />
                    Assigned Driver
                  </label>
                  {errors.assignDriv && (
                    <p className="text-red-400 text-sm mb-1">{errors.assignDriv}</p>
                  )}
                  <select
                    name="assignDriv"
                    value={taskData.assignDriv}
                    onChange={handleChange}
                    className={`w-full p-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                      errors.assignDriv ? 'border-red-500/50' : 'border-white/20'
                    }`}
                  >
                    <option value="" className="bg-slate-800 text-white">Select a driver</option>
                    {filteredDrivers.map(driver => (
                      <option key={driver.id} value={driver.driverId} className="bg-slate-800 text-white">
                        {driver.driverName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivery Status */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Package className="w-4 h-4" />
                    Delivery Status
                  </label>
                  <select
                    name="deliStatus"
                    value={taskData.deliStatus}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  >
                    <option value="Order Confirmed" className="bg-slate-800 text-white">Order Confirmed</option>
                    <option value="On the way" className="bg-slate-800 text-white">On the way</option>
                    <option value="Delivered" className="bg-slate-800 text-white">Delivered</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Save className="w-5 h-5" />
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeliveryTaskUpdateForm
