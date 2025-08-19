import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import SideBar from "../../components/SideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import toast from 'react-hot-toast';

const SupplyRequestForm = () => {
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [value, setValue] = useState({
        medicineName: '',
        quantity: '',
        supplier: '',
    });
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setValue((prev)=>({...prev , [name] : value}))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/supplyRequest/create`,value)
            if (data.success) {
                toast.success(response.message, { duration: 4000 });
                setValue({
                    medicineName: '',
                    quantity: '',
                    supplier: '',
                })
                navigate('/inventory-management')
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="flex bg-slate-900 min-h-screen text-white">
      <SideBar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <CheckCircle /> Create Supply Request
          </h1>
        </div>

        <div className="max-w-3xl mx-auto p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-slate-200">
                Medicine Name
              </label>
              <input
                type="text"
                name="medicineName"
                value={value.medicineName}
                onChange={handleChange}
                placeholder="Enter Medicine Name"
                className="p-2 rounded bg-white/20 border border-white/30 text-slate-100 placeholder:text-slate-300 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-slate-200">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={value.quantity}
                onChange={handleChange}
                placeholder="Enter Quantity"
                className="p-2 rounded bg-white/20 border border-white/30 text-slate-100 placeholder:text-slate-300 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-slate-200">Supplier</label>
              <input
                type="text"
                name="supplier"
                value={value.supplier}
                onChange={handleChange}
                placeholder="Enter Supplier Name"
                className="p-2 rounded bg-white/20 border border-white/30 text-slate-100 placeholder:text-slate-300 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded transition-transform transform hover:scale-105"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplyRequestForm;
