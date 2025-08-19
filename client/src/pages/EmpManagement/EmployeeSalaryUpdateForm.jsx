import React, { useEffect, useState } from "react";
import { User, Mail, Phone, Calendar, CreditCard, Briefcase, DollarSign, Save } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeSalaryUpdateForm = () => {
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
      .get(`${import.meta.env.VITE_API_URL}/api/empSalary/read/${id}`)
      .then((result) => {
        const employee = result.data.employee;
        employee.DOB = employee.DOB.split("T")[0];
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

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/empSalary/update/${id}`,
        employeeData
      )
      .then(() => {
        toast.success("Updated employee salary successfully!");
        setTimeout(() => {
          navigate("/employee-salary-management");
        }, 1000);
      })
      .catch((error) => {
        toast.error("Update employee failed!");
        console.error("Error updating employee:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 p-6">
      <div className="w-full max-w-4xl bg-slate-800/40 backdrop-blur-lg border border-slate-600/50 shadow-2xl rounded p-8">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-slate-100 mb-6 flex items-center gap-2">
          <User className="w-8 h-8 text-slate-300" />
          Employee Salary Update
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="text-slate-300 font-medium flex items-center gap-2">
              <User size={16} /> Name
            </label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded bg-slate-900/50 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-slate-300 font-medium flex items-center gap-2">
              <Phone size={16} /> Contact No
            </label>
            <input
              type="text"
              name="contactNo"
              value={employeeData.contactNo}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded bg-slate-900/50 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="text-slate-300 font-medium flex items-center gap-2">
              <Calendar size={16} /> Date of Birth
            </label>
            <input
              type="date"
              name="DOB"
              value={employeeData.DOB}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded bg-slate-900/50 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="text-slate-300 font-medium flex items-center gap-2">
              <DollarSign size={16} /> Salary
            </label>
            <input
              type="text"
              name="address"
              value={employeeData.address}
              onChange={handleChange}
              placeholder="Enter salary"
              className="w-full p-3 mt-1 rounded bg-slate-900/50 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-slate-300 font-medium flex items-center gap-2">
              <Mail size={16} /> Email
            </label>
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded bg-slate-900/50 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* NIC */}
          <div>
            <label className="text-slate-300 font-medium flex items-center gap-2">
              <CreditCard size={16} /> NIC
            </label>
            <input
              type="text"
              name="NIC"
              value={employeeData.NIC}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded bg-slate-900/50 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Job Role */}
          <div className="md:col-span-2">
            <label className="text-slate-300 font-medium flex items-center gap-2">
              <Briefcase size={16} /> Job Role
            </label>
            <select
              name="empRole"
              value={employeeData.empRole}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded bg-slate-900/50 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option>Delivery Manager</option>
              <option>Promotion Manager</option>
              <option>Supplier Manager</option>
              <option>Prescription Manager</option>
              <option>Employee Manager</option>
              <option>Payment Manager</option>
              <option>Inventory Manager</option>
              <option>User Manager</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded shadow-lg transition"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeSalaryUpdateForm
