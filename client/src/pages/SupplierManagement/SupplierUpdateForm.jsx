import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { toast } from 'react-hot-toast';
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import axios from "axios";
import toast from "react-hot-toast";
// import 'jspdf-autotable';

const SupplierUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [supplierData, setSupplierData] = useState({
    supplierID: "",
    firstName: "",
    lastName: "",
    contactNo: "",
    address: "",
    email: "",
    DOB: "",
    NIC: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/supplier/get/${id}`)
      .then((result) => {
        const supplier = result.data.supplier;

        setSupplierData(supplier);

        console.log(supplier);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    const { id } = e.target;
    const newStatus = id === "Active" ? "Active" : "Inactive";
    setSupplierData((prevState) => ({
      ...prevState,
      status: newStatus,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/supplier/update/${id}`,
        supplierData
      );
      toast.success("Supplier updated successfully!");

      // ✅ Only navigate once where you really want to go
      navigate("/supplier-management");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-start p-10">
      <div className="w-full max-w-4xl backdrop-blur-md bg-white/30 border border-slate-300 rounded-3xl p-10 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Update Supplier</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-10"
        >
          <div className="flex flex-col gap-4 flex-1">
            <label className="font-semibold text-slate-800">Supplier ID</label>
            <input
              type="text"
              name="supplierID"
              value={supplierData.supplierID}
              readOnly
              className="border-2 border-slate-400 bg-slate-200 rounded-md p-2"
            />

            <label className="font-semibold text-slate-800">First Name</label>
            <input
              type="text"
              name="firstName"
              value={supplierData.firstName}
              onChange={handleChange}
              className="border-2 border-slate-400 rounded-md p-2"
            />

            <label className="font-semibold text-slate-800">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={supplierData.lastName}
              onChange={handleChange}
              className="border-2 border-slate-400 rounded-md p-2"
            />

            <label className="font-semibold text-slate-800">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNo"
              value={supplierData.contactNo}
              onChange={handleChange}
              className="border-2 border-slate-400 rounded-md p-2"
            />

            <label className="font-semibold text-slate-800">Address</label>
            <textarea
              name="address"
              value={supplierData.address}
              onChange={handleChange}
              className="border-2 border-slate-400 rounded-md p-2 min-h-[100px]"
            />

            <input
              type="submit"
              value="Update"
              className="bg-slate-700 text-white p-3 rounded-lg font-semibold hover:bg-slate-800 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <label className="font-semibold text-slate-800">Email</label>
            <input
              type="text"
              name="email"
              value={supplierData.email}
              onChange={handleChange}
              className="border-2 border-slate-400 rounded-md p-2"
            />

            <label className="font-semibold text-slate-800">
              Date of Birth
            </label>
            <input
              type="date"
              name="DOB"
              value={supplierData.DOB}
              onChange={handleChange}
              className="border-2 border-slate-400 rounded-md p-2"
            />

            <label className="font-semibold text-slate-800">NIC</label>
            <input
              type="text"
              name="NIC"
              value={supplierData.NIC}
              onChange={handleChange}
              className="border-2 border-slate-400 rounded-md p-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierUpdateForm;
