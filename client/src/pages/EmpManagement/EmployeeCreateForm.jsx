import { useState } from 'react';
import { 
  User, 
  Phone, 
  Calendar, 
  Mail, 
  MapPin, 
  CreditCard, 
  Briefcase, 
  Heart,
  Users,
  CheckCircle,
  XCircle,
  UserPlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EmployeeCreateForm = () => {
  const jobRoles = [
    "Delivery Manager",
    "Promotion Manager", 
    "Supplier Manager",
    "Prescription Manager",
    "Employee Manager",
    "Payment Manager",
    "Inventory Manager",
    "User Manager"
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
        name === "maritalStatus" ? (checked ? id : "") : prevState.maritalStatus,
    }));
  };

  const handleGenderSelect = (selectedGender) => {
  setValue((prev) => ({
    ...prev,
    gender: prev.gender === selectedGender ? "" : selectedGender, // toggle
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addEmployee = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/employee/create`,
        value
      );
      const response = addEmployee.data;
      if (response.success) {
        toast.success(response.message, { duration: 4000 });
        setTimeout(() => {
          navigate("/employee-management");
        }, 1500);
      }
      console.log(response);
    } catch (error) {
      console.error("Error creating employee:", error);
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
              <h1 className="text-3xl font-bold text-slate-100 mb-2">Employee Registration</h1>
              <p className="text-slate-400">Create new employee profile and assign role</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200">Ashen Thiwanka</h3>
                <p className="text-sm text-slate-400">Employee Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Helper */}
        {/* <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-600/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm">Want to test the form?</p>
              <p className="text-slate-400 text-xs">Click to auto-fill with sample employee data</p>
            </div>
            <button
              type="button"
              onClick={fillDummyData}
              className="px-4 py-2 bg-slate-600/50 border border-slate-500/50 text-slate-300 rounded-lg hover:bg-slate-600/70 hover:text-slate-100 transition-all duration-200"
            >
              Fill Demo Data
            </button>
          </div>
        </div> */}

        {/* Form */}
        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-600/30 rounded-2xl p-8">
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

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Date of Birth
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

              {/* Address/Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Address & Description
                </label>
                <textarea
                  name="address"
                  value={value.address}
                  onChange={handleChange}
                  placeholder="Enter address and description"
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
                  {jobRoles.map(role => (
                    <option key={role} value={role} className="bg-slate-800 text-slate-200">
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Heart className="inline w-4 h-4 mr-2" />
                  Marital Status
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={(e) => handleChange({target: {name: 'maritalStatus', checked: value.maritalStatus !== 'Married', id: 'Married'}})}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                      value.maritalStatus === 'Married'
                        ? 'bg-slate-600/30 border-slate-500/50 text-slate-200'
                        : 'bg-slate-700/30 border-slate-600/50 text-slate-400 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      value.maritalStatus === 'Married' 
                        ? 'bg-slate-500 border-slate-400' 
                        : 'border-slate-500'
                    }`}>
                      {value.maritalStatus === 'Married' && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    Married
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleChange({target: {name: 'maritalStatus', checked: value.maritalStatus !== 'Unmarried', id: 'Unmarried'}})}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                      value.maritalStatus === 'Unmarried'
                        ? 'bg-slate-600/30 border-slate-500/50 text-slate-200'
                        : 'bg-slate-700/30 border-slate-600/50 text-slate-400 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      value.maritalStatus === 'Unmarried' 
                        ? 'bg-slate-500 border-slate-400' 
                        : 'border-slate-500'
                    }`}>
                      {value.maritalStatus === 'Unmarried' && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    Unmarried
                  </button>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Users className="inline w-4 h-4 mr-2" />
                  Gender
                </label>
                {/* Gender */}
<div className="flex gap-4">
  <button
    type="button"
    onClick={() => handleGenderSelect("Male")}
    className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${
      value.gender === "Male"
        ? "bg-slate-600/30 border-slate-500/50 text-slate-200"
        : "bg-slate-700/30 border-slate-600/50 text-slate-400"
    }`}
  >
    Male
  </button>
  <button
    type="button"
    onClick={() => handleGenderSelect("Female")}
    className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${
      value.gender === "Female"
        ? "bg-slate-600/30 border-slate-500/50 text-slate-200"
        : "bg-slate-700/30 border-slate-600/50 text-slate-400"
    }`}
  >
    Female
  </button>
</div>

              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                // disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                  <div className="flex items-center justify-center">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Register Employee
                  </div>
              </button>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {/* {showToast.show && (
          <div className="fixed top-4 right-4 z-50">
            <div className={`backdrop-blur-xl border rounded-2xl p-4 shadow-2xl ${
              showToast.type === 'success' 
                ? 'bg-green-800/90 border-green-600/50 text-green-100' 
                : 'bg-red-800/90 border-red-600/50 text-red-100'
            }`}>
              <div className="flex items-center">
                {showToast.type === 'success' ? (
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
}

export default EmployeeCreateForm
