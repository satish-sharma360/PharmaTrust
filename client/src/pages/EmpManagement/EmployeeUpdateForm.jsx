import React, { useEffect, useState } from "react";
import { User, Mail, Phone, Calendar, FileText, IdCard, Briefcase, Heart, Users } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EmployeeUpdateForm = () => {
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
    if (id) {
      axios
      .get(`${import.meta.env.VITE_API_URL}/api/employee/get/${id}`)
      .then((result) => {
        const employee = result.data.employee;
        employee.DOB = employee.DOB.split("T")[0]; // format date
        setEmployeeData(employee);
      })
      .catch((err) => console.log(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/employee/update/${id}`, employeeData)
      .then(() => {
        toast.success("Updated employee successfully!");
        setTimeout(() => {
          navigate("/employee-management");
        }, 1000);
      })
      .catch((error) => {
        toast.error("Update employee failed!");
        console.error("Error updating employee:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-10">
      <div className="w-full max-w-4xl bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded p-10 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-8">Update Employee</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-200"
        >
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 font-semibold">
              <User size={18} /> Employee Name
            </label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded bg-slate-900/60 border border-slate-700 outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="flex items-center gap-2 font-semibold">
              <Phone size={18} /> Contact No
            </label>
            <input
              type="text"
              name="contactNo"
              value={employeeData.contactNo}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded bg-slate-900/60 border border-slate-700 outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="flex items-center gap-2 font-semibold">
              <Calendar size={18} /> Date of Birth
            </label>
            <input
              type="date"
              name="DOB"
              value={employeeData.DOB}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded bg-slate-900/60 border border-slate-700 outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 font-semibold">
              <Mail size={18} /> Email
            </label>
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded bg-slate-900/60 border border-slate-700 outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* NIC */}
          <div>
            <label className="flex items-center gap-2 font-semibold">
              <IdCard size={18} /> NIC
            </label>
            <input
              type="text"
              name="NIC"
              value={employeeData.NIC}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded bg-slate-900/60 border border-slate-700 outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Job Role */}
          <div>
            <label className="flex items-center gap-2 font-semibold">
              <Briefcase size={18} /> Job Role
            </label>
            <select
              name="empRole"
              value={employeeData.empRole}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded bg-slate-900/60 border border-slate-700 outline-none focus:ring-2 focus:ring-slate-500"
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

          {/* Address */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 font-semibold">
              <FileText size={18} /> Address
            </label>
            <textarea
              name="address"
              value={employeeData.address}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded bg-slate-900/60 border border-slate-700 outline-none focus:ring-2 focus:ring-slate-500 min-h-24"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="flex items-center gap-2 font-semibold">
              <Heart size={18} /> Marital Status
            </label>
            <div className="flex gap-6 mt-2">
              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="maritalStatus"
                  value="Married"
                  checked={employeeData.maritalStatus === "Married"}
                  onChange={handleChange}
                />
                Married
              </label>
              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="maritalStatus"
                  value="Unmarried"
                  checked={employeeData.maritalStatus === "Unmarried"}
                  onChange={handleChange}
                />
                Unmarried
              </label>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="flex items-center gap-2 font-semibold">
              <Users size={18} /> Gender
            </label>
            <div className="flex gap-6 mt-2">
              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={employeeData.gender === "Male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={employeeData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 rounded bg-slate-700 hover:bg-slate-600 transition font-semibold text-white"
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeUpdateForm
