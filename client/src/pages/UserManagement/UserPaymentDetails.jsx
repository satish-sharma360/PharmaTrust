import React, { useState } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UserPaymentDetails = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState({
    firstName: '',
    lastName: '',
    NIC: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    state: ''
  });

  const handleChange = (e) => {
    const { name, value: val } = e.target;
    setValue(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/create`,value)
      if (data.success) {
        toast.success(data.message,{duration:4000})
        setTimeout(()=>{
          navigate('/')
        })
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    generatePDF();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Payment Details Report', 40, 40);

    const entries = Object.entries(value);
    entries.forEach(([key, val], i) => {
      doc.setFontSize(14);
      doc.text(`${key}: ${val}`, 40, 60 + i * 15);
    });

    doc.save('PaymentDetails.pdf');
  };

  return (
    <div className="min-h-screen p-6 bg-slate-100 flex justify-center items-start">
      <div className="bg-white/20 backdrop-blur-md border border-slate-300 rounded-3xl p-10 w-full max-w-4xl shadow-lg">
        <h1 className="text-3xl font-bold text-slate-700 mb-6">Add New Payment</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-slate-700">First Name</label>
            <div className="flex items-center gap-2 bg-white/30 p-2 rounded-md">
              <User size={18} />
              <input type="text" name="firstName" value={value.firstName} onChange={handleChange} placeholder="Enter First Name" className="bg-transparent outline-none w-full"/>
            </div>

            <label className="font-semibold text-slate-700">Last Name</label>
            <div className="flex items-center gap-2 bg-white/30 p-2 rounded-md">
              <User size={18} />
              <input type="text" name="lastName" value={value.lastName} onChange={handleChange} placeholder="Enter Last Name" className="bg-transparent outline-none w-full"/>
            </div>

            <label className="font-semibold text-slate-700">ID Number</label>
            <input type="text" name="NIC" value={value.NIC} onChange={handleChange} placeholder="Enter ID Number" className="border border-slate-300 rounded-md p-2"/>

            <label className="font-semibold text-slate-700">Contact Number</label>
            <div className="flex items-center gap-2 bg-white/30 p-2 rounded-md">
              <Phone size={18} />
              <input type="text" name="phoneNumber" value={value.phoneNumber} onChange={handleChange} placeholder="Enter Contact Number" className="bg-transparent outline-none w-full"/>
            </div>

            <label className="font-semibold text-slate-700">Address</label>
            <div className="flex items-center gap-2 bg-white/30 p-2 rounded-md">
              <MapPin size={18} />
              <textarea name="address" value={value.address} onChange={handleChange} placeholder="Enter Address" className="bg-transparent outline-none w-full resize-none"/>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-slate-700">City</label>
            <input type="text" name="city" value={value.city} onChange={handleChange} placeholder="Enter City" className="border border-slate-300 rounded-md p-2"/>

            <label className="font-semibold text-slate-700">Postal Code</label>
            <input type="text" name="postalCode" value={value.postalCode} onChange={handleChange} placeholder="Enter Postal Code" className="border border-slate-300 rounded-md p-2"/>

            <label className="font-semibold text-slate-700">State</label>
            <input type="text" name="state" value={value.state} onChange={handleChange} placeholder="Enter State" className="border border-slate-300 rounded-md p-2"/>

            <input type="submit" value="Submit" className="mt-auto bg-slate-700 hover:bg-slate-800 text-white font-semibold p-3 rounded-lg cursor-pointer"/>
          </div>
        </form>
      </div>
    </div>
  );
}


export default UserPaymentDetails
