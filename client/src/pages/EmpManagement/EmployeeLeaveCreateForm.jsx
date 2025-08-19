import { useState } from "react";
import {
  User,
  Phone,
  Calendar,
  Mail,
  FileText,
  CreditCard,
  Briefcase,
  CheckCircle,
  XCircle,
  CalendarPlus,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeLeaveCreateForm = () => {
  const jobRoles = [
    "Delivery Manager",
    "Promotion Manager",
    "Supplier Manager",
    "Prescription Manager",
    "Employee Manager",
    "Payment Manager",
    "Inventory Manager",
    "User Manager",
  ];
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
        name === "maritalStatus"
          ? checked
            ? id
            : ""
          : prevState.maritalStatus,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addEmployee = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/empLeave/create`,
        value
      );
      const response = addEmployee.data;

      if (response.success) {
        toast.success(response.message, { duration: 4000 });
        setTimeout(() => {
          navigate("/employee-leave-management");
        }, 1000);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add employee");
    }
    console.log(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,113,108,0.3),rgba(255,255,255,0))]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-600/30 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                Employee Leave Request
              </h1>
              <p className="text-slate-400">
                Submit leave application with required details
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200">Ashen Thiwanka</h3>
                <p className="text-sm text-slate-400">Employee Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Helper */}


        {/* Form */}
        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-600/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <CalendarPlus className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-200 mb-2">
              Add Leave Request
            </h2>
            <p className="text-slate-400">
              Fill in the details for your leave application
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Employee Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Employee Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={value.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Phone className="inline w-4 h-4 mr-2" />
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNo"
                  value={value.contactNo}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
              </div>

              {/* Date of Leave */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Date of Leave
                </label>
                <input
                  type="date"
                  name="DOB"
                  value={value.DOB}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
              </div>

              {/* Leave Reason/Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <FileText className="inline w-4 h-4 mr-2" />
                  Reason for Leave
                </label>
                <textarea
                  name="address"
                  value={value.address}
                  onChange={handleChange}
                  placeholder="Describe the reason for your leave request"
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={value.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
              </div>

              {/* NIC */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <CreditCard className="inline w-4 h-4 mr-2" />
                  National ID (NIC)
                </label>
                <input
                  type="text"
                  name="NIC"
                  value={value.NIC}
                  onChange={handleChange}
                  placeholder="Enter NIC number"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
              </div>

              {/* Job Role */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Briefcase className="inline w-4 h-4 mr-2" />
                  Job Role
                </label>
                <select
                  name="empRole"
                  value={value.empRole}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                >
                  {jobRoles.map((role) => (
                    <option
                      key={role}
                      value={role}
                      className="bg-slate-800 text-slate-200"
                    >
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Leave Information Card */}
              <div className="backdrop-blur-sm bg-slate-700/30 border border-slate-600/30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-slate-300 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Leave Policy Reminder
                </h3>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Submit requests at least 7 days in advance</li>
                  <li>• Annual leave balance will be automatically deducted</li>
                  <li>• Manager approval required for all leave requests</li>
                  <li>• Emergency leaves can be applied retrospectively</li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 px-6 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Submitting
              </button>
            </div>
          </div>
        </div>

        {/* Toast Notification
        {showToast.show && (
          <div className="fixed top-4 right-4 z-50">
            <div
              className={`backdrop-blur-xl border rounded-2xl p-4 shadow-2xl ${
                showToast.type === "success"
                  ? "bg-green-800/90 border-green-600/50 text-green-100"
                  : "bg-red-800/90 border-red-600/50 text-red-100"
              }`}
            >
              <div className="flex items-center">
                {showToast.type === "success" ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 mr-2" />
                )}
                {showToast.message}
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default EmployeeLeaveCreateForm;
