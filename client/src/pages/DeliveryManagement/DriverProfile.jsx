import React, { useState } from 'react';
import { LogOut, Save, User, CreditCard, Shield, Phone, Car, CheckCircle, Clock } from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteDriverFailure, deleteDriverSuccess, updateDriverFailure, updateDriverSuccess } from '../../redux/driverSlice';
import axios from 'axios';


const DriverProfile = () => {
  const { currentDriver, loading, error } = useSelector((state) => state.driver);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateDriverStart());

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/driver/updatedriver/${currentDriver._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data)

      if (res.data.success === false) {
        dispatch(updateDriverFailure(res.data.message));
        return;
      }

      dispatch(updateDriverSuccess(res.data));
      setUpdateSuccess(true);
      
    } catch (error) {
      dispatch(updateDriverFailure(error.response?.data?.message || error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutDriverStart());

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/driver/signout`);

      if (res.data.success === false) {
        dispatch(deleteDriverFailure(res.data.message));
        return;
      }

      dispatch(deleteDriverSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(deleteDriverFailure(error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Navigation Bar */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {currentDriver.driverName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-white font-semibold">Welcome back, {currentDriver.driverName}</h2>
                <p className="text-slate-300 text-sm">Driver Portal</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 font-semibold py-2 px-4 rounded-xl flex items-center gap-2 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                {currentDriver.driverName.split(' ').map(n => n[0]).join('')}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Driver Profile</h1>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${
                currentDriver.availability === 'Available' 
                  ? 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30' 
                  : 'text-red-400 bg-red-500/20 border-red-500/30'
              }`}>
                {currentDriver.availability === 'Available' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                {currentDriver.availability}
              </div>
            </div>

            {/* Success Message */}
            {updateSuccess && (
              <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Profile updated successfully!
              </div>
            )}

            {/* Profile Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Driver ID */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <CreditCard className="w-4 h-4" />
                    Driver ID
                  </label>
                  <input
                    type="text"
                    name="driverId"
                    value={currentDriver.driverId}
                    readOnly
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 cursor-not-allowed"
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
                    value={currentDriver.driverName}
                    readOnly
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 cursor-not-allowed"
                  />
                </div>

                {/* Driver License */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Shield className="w-4 h-4" />
                    Driver License
                  </label>
                  <input
                    type="text"
                    name="driverLicense"
                    value={currentDriver.driverLicense}
                    readOnly
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 cursor-not-allowed"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <Phone className="w-4 h-4" />
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contactNo"
                    value={currentDriver.contactNo}
                    readOnly
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 cursor-not-allowed"
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
                    value={currentDriver.vehicleLicense}
                    readOnly
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 cursor-not-allowed"
                  />
                </div>

                {/* Availability - Editable */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2">
                    <CheckCircle className="w-4 h-4" />
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={currentDriver.availability}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  >
                    <option value="Available" className="bg-slate-800 text-white">Available</option>
                    <option value="Unavailable" className="bg-slate-800 text-white">Unavailable</option>
                  </select>
                </div>
              </div>

              {/* Vehicle Info Display */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-medium mb-3">Vehicle Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Vehicle Type</p>
                      <p className="text-white">{currentDriver.vehicleModel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-slate-400 text-sm">License Status</p>
                      <p className={`${currentDriver.licenseValidity === 'Valid' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {currentDriver.licenseValidity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Update Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={ ()=> navigate(`/driver-update/${currentDriver._id}`)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Save className="w-5 h-5" />
                  Update Profile
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-slate-400 text-sm">
              © 2024 Delivery Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile
