import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeLeaveUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: "",
    contactNo: "",
    DOB: "",
    address: "",
    email: "",
    NIC: "",
    empRole: "",
    maritalStatus: "",
    gender: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/empLeave/get/${id}`)
      .then((result) => {
        const employee = result.data.employee;
        employee.DOB = employee.DOB.split("T")[0]; // format date
        setEmployeeData(employee);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleMaritalStatusChange = (e) => {
  //   const { id, checked } = e.target;
  //   const newMaritalStatus = checked ? id : "";
  //   setEmployeeData((prevState) => ({
  //     ...prevState,
  //     maritalStatus: newMaritalStatus,
  //   }));
  // };

  // const handleGenderChange = (e) => {
  //   const { id, checked } = e.target;
  //   const newGender = checked ? id : "";
  //   setEmployeeData((prevState) => ({
  //     ...prevState,
  //     gender: newGender,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(
        `${import.meta.env.VITE_API_URL}/api/empLeave/update/${id}`,
        employeeData
      )
      .then(() => {
        toast.success("Updated leave successfully!");
        setTimeout(() => {
          navigate("/employee-leave-management");
        });
      })
      .catch((error) => {
        toast.error("Update employee failed!");
        console.error("Error updating employee:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100">
            Employee Leave Update
          </h1>
          <div className="flex items-center gap-3">
            <img
              className="w-12 h-12 border-2 border-slate-300 rounded-full"
              src="https://avatars.githubusercontent.com/u/135573281?s=400&u=b5f0d9838a0b5191e9b7f8e32eaaa69b5974847b&v=4"
              alt="avatar"
            />
            <div>
              <h2 className="text-slate-200 font-semibold">Ashen Thiwanka</h2>
              <p className="text-slate-400 text-sm">Employee Manager</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          {/* Left Side */}
          <div>
            <label className="block font-semibold text-slate-200">
              Employee Name
            </label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-xl border border-slate-500 bg-slate-800/40 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />

            <label className="block font-semibold text-slate-200">
              Contact No
            </label>
            <input
              type="text"
              name="contactNo"
              value={employeeData.contactNo}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-xl border border-slate-500 bg-slate-800/40 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />

            <label className="block font-semibold text-slate-200">
              Date of Leave
            </label>
            <input
              type="date"
              name="DOB"
              value={employeeData.DOB}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-xl border border-slate-500 bg-slate-800/40 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />

            <label className="block font-semibold text-slate-200">
              Address
            </label>
            <textarea
              name="address"
              value={employeeData.address}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-xl border border-slate-500 bg-slate-800/40 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 min-h-[100px]"
              required
            />
          </div>

          {/* Right Side */}
          <div>
            <label className="block font-semibold text-slate-200">Email</label>
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-xl border border-slate-500 bg-slate-800/40 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />

            <label className="block font-semibold text-slate-200">NIC</label>
            <input
              type="text"
              name="NIC"
              value={employeeData.NIC}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-xl border border-slate-500 bg-slate-800/40 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />

            <label className="block font-semibold text-slate-200">
              Job Role
            </label>
            <select
              name="empRole"
              value={employeeData.empRole}
              onChange={handleChange}
              className="w-full p-3 mb-6 rounded-xl border border-slate-500 bg-slate-800/40 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            >
              <option value="Delivery Manager">Delivery Manager</option>
              <option value="Promotion Manager">Promotion Manager</option>
              <option value="Supplier Manager">Supplier Manager</option>
              <option value="Prescription Manager">Prescription Manager</option>
              <option value="Employee Manager">Employee Manager</option>
              <option value="Payment Manager">Payment Manager</option>
              <option value="Inventory Manager">Inventory Manager</option>
              <option value="User Manager">User Manager</option>
            </select>

            <input
              type="submit"
              value="Update Leave"
              className="w-full p-3 rounded-xl bg-slate-600 hover:bg-slate-500 transition text-white font-semibold cursor-pointer shadow-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeLeaveUpdateForm
