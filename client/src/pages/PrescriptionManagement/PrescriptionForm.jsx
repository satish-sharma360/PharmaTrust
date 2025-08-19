import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from 'react-hot-toast';
import { FileText, CheckSquare } from "lucide-react";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
import axios from "axios";

const PrescriptionForm = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    PrescriptionID: "", // unified casing
    firstname: "",
    lastname: "",
    age: "",
    contactNo: "",
    MedicationNames: "",
    units: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = value;

    // Validate PrescriptionID
    if (name === "PrescriptionID") {
      if (!value.startsWith("P")) {
        toast.error('Prescription ID must start with "P"', { duration: 4000 });
        return;
      }
    }

    // Validate contactNo
    if (name === "contactNo") {
      if (value && !/^\d+$/.test(value)) {
        toast.error("Contact number must contain only numeric characters", {
          duration: 4000,
        });
        return;
      }
      if (value.length > 10) {
        toast.error("Contact number cannot exceed 10 digits", {
          duration: 4000,
        });
        return;
      }
    }

    setValue((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? (checked ? "Active" : "Inactive") : updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addPrescription = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/prescription/create`,
        value
      );

      const response = addPrescription.data;
      if (response.success) {
        console.log(response.message);
        toast.success(response.message, { duration: 4000 });

        setTimeout(() => {
          navigate("/payment"); // payment page after success
        }, 1000);
      }
      console.log(response);
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast.error("Failed to create prescription", { duration: 4000 });
    }
    console.log(value);
  };

  return (
    <div className="flex justify-center p-8 bg-slate-900 min-h-screen">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded shadow-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl text-white font-bold mb-6 flex items-center gap-2">
          <FileText size={24} /> Prescription Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-8"
        >
          <div className="flex flex-col gap-4 flex-1">
            <label className="text-white font-semibold">Prescription ID</label>
            <input
              type="text"
              name="PrescriptionID"
              value={value.PrescriptionID}
              onChange={handleChange}
              placeholder="Enter Prescription ID"
              className="p-2 rounded bg-white/20 text-white placeholder-slate-200 border border-white/20 focus:outline-none"
              required
            />
            <label className="text-white font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={value.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              className="p-2 rounded bg-white/20 text-white placeholder-slate-200 border border-white/20 focus:outline-none"
              required
            />
            <label className="text-white font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={value.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
              className="p-2 rounded bg-white/20 text-white placeholder-slate-200 border border-white/20 focus:outline-none"
              required
            />
            <label className="text-white font-semibold">Age</label>
            <input
              type="text"
              name="age"
              value={value.age}
              onChange={handleChange}
              placeholder="Enter Age"
              className="p-2 rounded bg-white/20 text-white placeholder-slate-200 border border-white/20 focus:outline-none"
              required
            />
            <label className="text-white font-semibold">Contact Number</label>
            <input
              type="text"
              name="contactNo"
              value={value.contactNo}
              onChange={handleChange}
              placeholder="Enter Contact Number"
              className="p-2 rounded bg-white/20 text-white placeholder-slate-200 border border-white/20 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <label className="text-white font-semibold">Medication Name</label>
            <textarea
              name="MedicationNames"
              value={value.MedicationNames}
              onChange={handleChange}
              placeholder="Enter Medication Name"
              className="p-2 rounded bg-white/20 text-white placeholder-slate-200 border border-white/20 focus:outline-none"
              required
            />
            <label className="text-white font-semibold">Units</label>
            <input
              type="text"
              name="units"
              value={value.units}
              onChange={handleChange}
              placeholder="Enter Units"
              className="p-2 rounded bg-white/20 text-white placeholder-slate-200 border border-white/20 focus:outline-none"
              required
            />
            <label className="text-white font-semibold">Notes</label>
            <textarea
              name="notes"
              value={value.notes}
              onChange={handleChange}
              placeholder="Enter Notes"
              className="p-2 rounded bg-white/20 text-white placeholder-slate-200 border border-white/20 focus:outline-none"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-700 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 justify-center"
            >
              <CheckSquare size={20} /> Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionForm;
