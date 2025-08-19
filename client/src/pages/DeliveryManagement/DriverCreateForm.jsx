import React, { useState } from 'react';
import { ArrowLeft, Save, User, CreditCard, Phone, Car, Shield, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const DriverCreateForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    driverId: '',
    driverName: '',
    driverLicense: '',
    vehicleModel: 'Bike',
    availabilty: 'Available',
    contactNo: '',
    vehicleLicense: '',
    licenseValidity: 'Valid',
    password: ''
  });

  const [errors, setErrors] = useState({
    driverId: '',
    driverLicense: '',
    contactNo: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let error = '';

    if (name === 'contactNo' && value.charAt(0) === '0') {
      error = 'Enter the contact number without initial zero';
    } else if (name === 'driverLicense' && value.length !== 8) {
      error = 'Driver license should be 8 digits long';
    } else if (name === 'driverId' && !/^D\d{3}$/.test(value)) {
      error = 'Driver ID should be in the format D000';
    } else if (
      name === 'password' &&
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
    ) {
      error =
        'Password should contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));

    setValue((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? (checked ? 'Valid' : 'Expired') : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting data:", value);

    const fieldErrors = Object.entries(errors).filter(([, error]) => error !== '');
    const allErrors = [];

    if (fieldErrors.length > 0) {
      fieldErrors.forEach(([, error]) => {
        allErrors.push(error);
      });

      allErrors.forEach((error) => {
        toast.error(error);
      });

      console.warn("Validation errors:", allErrors);
      return;
    }

    try {
      const existingDriverId = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/driver/check?driverId=${value.driverId}`
      );
      if (existingDriverId.data.exists) {
        allErrors.push('Driver ID already exists');
      }
      const existingDriverLicense = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/driver/check?driverLicense=${value.driverLicense}`
      );
      if (existingDriverLicense.data.exists) {
        allErrors.push('Driver license already exists');
      }
      const existingVehicleLicense = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/driver/check?vehicleLicense=${value.vehicleLicense}`
      );
      if (existingVehicleLicense.data.exists) {
        allErrors.push('Vehicle license already exists');
      }
      const existingPassword = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/driver/check?password=${value.password}`
      );
      if (existingPassword.data.exists) {
        allErrors.push('Password already exists');
      }

      if (allErrors.length > 0) {
        allErrors.forEach((error) => {
          toast.error(error);
        });
        console.warn("Duplicate errors:", allErrors);
        return;
      }

      const addDriver = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/driver/create`,
        value
      );
      const response = addDriver.data;
      if (response.success) {
        toast.success(response.message, { duration: 2000 });
        setTimeout(() => {
          navigate('/driver-management');
        }, 2000);
      }
      console.log("API Response:", response);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-3xl font-bold text-white">Add New Driver</h1>
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
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Driver ID */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <CreditCard className="w-4 h-4" />
                    Driver ID
                  </label>
                  {errors.driverId && (
                    <p className="text-red-400 text-sm mb-1">{errors.driverId}</p>
                  )}
                  <input
                    type="text"
                    name="driverId"
                    value={value.driverId}
                    onChange={handleChange}
                    placeholder="e.g., D001"
                    className={`w-full p-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                      errors.driverId ? 'border-red-500/50' : 'border-white/20'
                    }`}
                  />
                </div>

                {/* Driver Name */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="driverName"
                    value={value.driverName}
                    onChange={handleChange}
                    placeholder="Enter driver's full name"
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                </div>

                {/* Driver License */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Shield className="w-4 h-4" />
                    Driver License
                  </label>
                  {errors.driverLicense && (
                    <p className="text-red-400 text-sm mb-1">{errors.driverLicense}</p>
                  )}
                  <input
                    type="text"
                    name="driverLicense"
                    value={value.driverLicense}
                    onChange={handleChange}
                    placeholder="8-digit license number"
                    maxLength="8"
                    className={`w-full p-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                      errors.driverLicense ? 'border-red-500/50' : 'border-white/20'
                    }`}
                  />
                </div>

                {/* Vehicle Model & Availability */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white font-medium mb-2">
                      <Car className="w-4 h-4" />
                      Vehicle Model
                    </label>
                    <select
                      name="vehicleModel"
                      value={value.vehicleModel}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    >
                      <option value="Bike" className="bg-slate-800">Bike</option>
                      <option value="Threewheel" className="bg-slate-800">Threewheel</option>
                      <option value="Car" className="bg-slate-800">Car</option>
                      <option value="Van" className="bg-slate-800">Van</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white font-medium mb-2">
                      <Shield className="w-4 h-4" />
                      Availability
                    </label>
                    <select
                      name="availability"
                      value={value.availability}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    >
                      <option value="Available" className="bg-slate-800">Available</option>
                      <option value="Unavailable" className="bg-slate-800">Unavailable</option>
                    </select>
                  </div>
                </div>

                {/* License Validity */}
                <div>
                  <label className="text-white font-medium mb-3 block">License Validity</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="licenseValidity"
                        value="Valid"
                        checked={value.licenseValidity === 'Valid'}
                        onChange={handleChange}
                        className="w-4 h-4 text-emerald-500 bg-white/10 border border-white/20 rounded focus:ring-emerald-500/50"
                      />
                      <span className="text-white">Valid</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="licenseValidity"
                        value="Expired"
                        checked={value.licenseValidity === 'Expired'}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-500 bg-white/10 border border-white/20 rounded focus:ring-red-500/50"
                      />
                      <span className="text-white">Expired</span>
                    </label>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    Select expired if either driver or vehicle license is expired
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Contact Number */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Phone className="w-4 h-4" />
                    Contact Number
                  </label>
                  {errors.contactNo && (
                    <p className="text-red-400 text-sm mb-1">{errors.contactNo}</p>
                  )}
                  <input
                    type="tel"
                    name="contactNo"
                    value={value.contactNo}
                    onChange={handleChange}
                    placeholder="Enter 9 digits without leading 0"
                    maxLength="9"
                    className={`w-full p-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                      errors.contactNo ? 'border-red-500/50' : 'border-white/20'
                    }`}
                  />
                </div>

                {/* Vehicle License */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Car className="w-4 h-4" />
                    Vehicle License
                  </label>
                  <input
                    type="text"
                    name="vehicleLicense"
                    value={value.vehicleLicense}
                    onChange={handleChange}
                    placeholder="Enter vehicle license number"
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Key className="w-4 h-4" />
                    Password
                  </label>
                  {errors.password && (
                    <p className="text-red-400 text-sm mb-1">{errors.password}</p>
                  )}
                  <input
                    type="password"
                    name="password"
                    value={value.password}
                    onChange={handleChange}
                    placeholder="Enter login password"
                    className={`w-full p-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                      errors.password ? 'border-red-500/50' : 'border-white/20'
                    }`}
                  />
                  <p className="text-slate-400 text-xs mt-1">
                    Must contain uppercase, lowercase, number, and be 8+ characters
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Save className="w-5 h-5" />
                    Register Driver
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverCreateForm;
