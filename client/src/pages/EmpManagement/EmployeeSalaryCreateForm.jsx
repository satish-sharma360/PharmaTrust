import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EmployeeSalaryCreateForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked, id } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox"
          ? id === "Male" && checked
            ? "Male"
            : "Female"
          : value,
      maritalStatus:
        name === "maritalStatus" ? (checked ? id : "") : prevState.maritalStatus,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addEmployee = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/empSalary/create`,
        value
      );

      const response = addEmployee.data;
      if (response.success) {
        toast.success(response.message, { duration: 4000 });
        setTimeout(() => {
          navigate("/employee-Salary-management");
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(value);
  };

  return (
    <div className="flex bg-slate-900 min-h-screen text-white">
      <SideBar />
      <div className="flex-1">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 border-b border-slate-700 flex justify-between px-10 py-8 shadow-lg">
          <h1 className="text-3xl font-bold text-slate-100">
            Employee Salary Registration Form
          </h1>
          <div className="flex gap-2 bg-slate-800/40 px-3 py-2 rounded border border-slate-700 shadow-md">
            <img
              className="w-12 h-12 border-2 border-slate-600 rounded-full"
              src="https://avatars.githubusercontent.com/u/135573281?s=400&u=b5f0d9838a0b5191e9b7f8e32eaaa69b5974847b&v=4"
              alt="manager"
            />
            <div className="flex w-full flex-col gap-0.5">
              <h1 className="font-bold">Ashen Thiwanka</h1>
              <p className="text-xs text-slate-300">Employee Manager</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="px-10 text-2xl font-semibold pt-5 text-slate-100">
          Assign Salary
        </div>

        {/* Form */}
        <div className="p-10 m-10 rounded max-w-5xl backdrop-blur-xl bg-white/10 border border-slate-700 shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-10"
          >
            {/* Left */}
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <label className="block mb-1 font-semibold text-slate-200">
                  Employee Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={value.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full p-2 rounded bg-slate-800/50 border border-slate-600 outline-none focus:ring-2 focus:ring-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-200">
                  Contact No
                </label>
                <input
                  type="text"
                  name="contactNo"
                  value={value.contactNo}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="w-full p-2 rounded bg-slate-800/50 border border-slate-600 outline-none focus:ring-2 focus:ring-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-200">
                  Salary assigning date
                </label>
                <input
                  type="date"
                  name="DOB"
                  value={value.DOB}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-slate-800/50 border border-slate-600 outline-none focus:ring-2 focus:ring-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-200">
                  Salary
                </label>
                <textarea
                  name="address"
                  value={value.address}
                  onChange={handleChange}
                  placeholder="Assign the salary"
                  className="w-full p-2 rounded bg-slate-800/50 border border-slate-600 outline-none focus:ring-2 focus:ring-slate-400 min-h-24"
                  required
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <label className="block mb-1 font-semibold text-slate-200">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={value.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full p-2 rounded bg-slate-800/50 border border-slate-600 outline-none focus:ring-2 focus:ring-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-200">
                  NIC
                </label>
                <input
                  type="text"
                  name="NIC"
                  value={value.NIC}
                  onChange={handleChange}
                  placeholder="Enter NIC"
                  className="w-full p-2 rounded bg-slate-800/50 border border-slate-600 outline-none focus:ring-2 focus:ring-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-200">
                  Job Role
                </label>
                <select
                  name="empRole"
                  value={value.empRole}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-slate-800/50 border border-slate-600 outline-none focus:ring-2 focus:ring-slate-400"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="Delivery Manager">Delivery Manager</option>
                  <option value="Promotion Manager">Promotion Manager</option>
                  <option value="Supplier Manager">Supplier Manager</option>
                  <option value="Prescription Manager">Prescription Manager</option>
                  <option value="Employee Manager">Employee Manager</option>
                  <option value="Payment Manager">Payment Manager</option>
                  <option value="Inventory Manager">Inventory Manager</option>
                  <option value="User Manager">User Manager</option>
                </select>
              </div>

              <div>
                <input
                  type="submit"
                  value="Submit"
                  className="bg-slate-700 hover:bg-slate-600 transition-all font-semibold text-white p-3 rounded w-full cursor-pointer shadow-md"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeSalaryCreateForm
