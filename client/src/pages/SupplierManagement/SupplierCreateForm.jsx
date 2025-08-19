import React, { useState } from "react";
import { UserPlus, Download } from "lucide-react";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import 'jspdf-autotable';

const SupplierCreateForm = () => {
  // Dummy supplier data
  const navigate = useNavigate();
  const [value, setValue] = useState({
    supplierID: "",
    firstName: "",
    lastName: "",
    DOB: "",
    email: "",
    contactNo: "",
    NIC: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSupplierIDUnique, setIsSupplierIDUnique] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the form value
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Reset errors for the changed field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error for this field
    }));
  };

  const handleSupplierIDBlur = async () => {
    const { supplierID } = value;

    if (!supplierID.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        supplierID: "Supplier ID is required.",
      }));
      setIsSupplierIDUnique(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/supplier/check/${supplierID}`
      );
      const isUnique = response.data.unique;

      if (!isUnique) {
        setIsSupplierIDUnique(false);
        toast.error(
          "Supplier ID already exists. Please choose a different one."
        );
      } else {
        setIsSupplierIDUnique(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          supplierID: "",
        }));
      }
    } catch (error) {
      console.error("Error checking supplier ID:", error);
      toast.error("Error checking Supplier ID. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSupplierIDUnique) {
      toast.error("Supplier ID must be unique. Please choose a different one.");
      return; // Prevent submission if the supplierID isn't unique
    }

    const validationErrors = validateInputs(value);
    if (Object.keys(validationErrors).length > 0) {
      // Display a toast for each error
      Object.values(validationErrors).forEach((error) => {
        toast.error(error);
      });
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/supplier/create`,
        value
      );
      if (response.data.success) {
        toast.success("Supplier created successfully!", { duration: 4000 });
        setTimeout(() => {
          navigate("/supplier-management");
        }, 1000);
      } else {
        toast.error("Failed to create supplier. Please try again.");
      }
    } catch (error) {
      console.error("Error creating supplier:", error);
      toast.error("Supplier ID already Exists.");
    }

    setLoading(false);
  };

  const validateInputs = (inputValues) => {
    const validationErrors = {};

    if (!inputValues.supplierID.trim()) {
      validationErrors.supplierID = "Supplier ID is required";
    }

    if (!inputValues.firstName.trim()) {
      validationErrors.firstName = "First name is required";
    }

    if (!inputValues.lastName.trim()) {
      validationErrors.lastName = "Last name is required";
    }

    if (!inputValues.DOB) {
      validationErrors.DOB = "Date Of Birth is required";
    }

    if (!inputValues.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(inputValues.email)) {
      validationErrors.email = "Invalid email format";
    }

    // Validate contact number: must be exactly 10 digits, no letters or special characters
    if (!/^\d{10}$/.test(inputValues.contactNo.trim())) {
      validationErrors.contactNo =
        "Contact Number must contain exactly 10 digits with no letters or special characters";
    }

    if (!inputValues.NIC.trim()) {
      validationErrors.NIC = "NIC is required";
    }

    if (!inputValues.address.trim()) {
      validationErrors.address = "Address is required";
    }

    return validationErrors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-start p-10">
      <div className="w-full max-w-5xl bg-white/30 backdrop-blur-md border border-slate-300 rounded-3xl p-8 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <UserPlus size={24} /> Add Supplier
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { label: "Supplier ID", name: "supplierID", type: "text" },
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "DOB", name: "DOB", type: "date" },
            { label: "Email", name: "email", type: "email" },
            { label: "Contact Number", name: "contactNo", type: "text" },
            { label: "NIC", name: "NIC", type: "text" },
            { label: "Address", name: "address", type: "textarea" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="font-semibold text-slate-800">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={value[field.name]}
                  onChange={handleChange}
                  className={`border border-slate-400 rounded-md p-2 mt-1 ${
                    errors[field.name] ? "border-red-500" : ""
                  }`}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={value[field.name]}
                  onChange={handleChange}
                  className={`border border-slate-400 rounded-md p-2 mt-1 ${
                    errors[field.name] ? "border-red-500" : ""
                  }`}
                />
              )}
              {errors[field.name] && (
                <span className="text-red-500 text-xs">
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-slate-700 text-white p-3 rounded-lg hover:bg-slate-800"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full border border-slate-300 rounded-lg overflow-hidden">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">DOB</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">NIC</th>
                <th className="px-4 py-2">Address</th>
              </tr>
            </thead>
            {/* <tbody>
              {suppliers.map((s) => (
                <tr
                  key={s.supplierID}
                  className="bg-white/50 backdrop-blur-sm border-b border-slate-300"
                >
                  <td className="px-4 py-2">{s.supplierID}</td>
                  <td className="px-4 py-2">
                    {s.firstName} {s.lastName}
                  </td>
                  <td className="px-4 py-2">{s.DOB}</td>
                  <td className="px-4 py-2">{s.email}</td>
                  <td className="px-4 py-2">{s.contactNo}</td>
                  <td className="px-4 py-2">{s.NIC}</td>
                  <td className="px-4 py-2">{s.address}</td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierCreateForm;
