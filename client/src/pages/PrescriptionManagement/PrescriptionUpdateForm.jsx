import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar';
// import { toast } from 'react-hot-toast';
import { Save } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PrescriptionUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [prescriptionData, setPrescriptionData] = useState({
    PrescriptionID: "",
    firstName: "",
    lastName: "",
    age: "",
    contactNo: "",
    MedicationNames: "",
    units: "",
    notes: "",
    status: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/prescription/get/${id}`)
      .then((result) => {
        const prescription = result.data.prescription;
        setPrescriptionData(prescription);
        console.log(prescription);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    const { id } = e.target;
    const newStatus = id === "Active" ? "Active" : "Inactive";
    setPrescriptionData((prevState) => ({
      ...prevState,
      status: newStatus,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/prescription/update/${id}`,
        prescriptionData
      )
      .then(() => {
        toast.success("Prescription updated successfully!");
        setTimeout(() => {
          navigate("/prescription-management");
        }, 1500);
      })
      .catch((error) => {
        toast.error("Prescription update failed!");
        console.error("Error updating prescription:", error);
      });
  };

  return (
    <div className="flex bg-slate-900 min-h-screen">
      <SideBar />
      <div className="flex-1 p-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded flex justify-between items-center px-8 py-6 mb-8">
          <h1 className="text-3xl font-bold text-white">Update Prescription</h1>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col text-white">
              <span className="font-semibold">Dummy</span>
              <span className="text-xs">Prescription Manager</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-10">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              name="PrescriptionID"
              value={prescriptionData.PrescriptionID}
              onChange={handleChange}
              readOnly
              className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
              placeholder="Prescription ID"
            />
            <input
              type="text"
              name="firstName"
              value={prescriptionData.firstName}
              onChange={handleChange}
              className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={prescriptionData.lastName}
              onChange={handleChange}
              className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
              placeholder="Last Name"
            />
            <input
              type="text"
              name="age"
              value={prescriptionData.age}
              onChange={handleChange}
              className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
              placeholder="Age"
            />
            <input
              type="text"
              name="contactNo"
              value={prescriptionData.contactNo}
              onChange={handleChange}
              className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
              placeholder="Contact Number"
            />
            <div className="flex gap-2">
              <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold">
                <Save size={18} />
                Update
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              name="MedicationNames"
              value={prescriptionData.MedicationNames}
              onChange={handleChange}
              className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
              placeholder="Medication Name"
            />
            <input
              type="text"
              name="units"
              value={prescriptionData.units}
              onChange={handleChange}
              className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
              placeholder="Units"
            />
            <textarea
              name="notes"
              value={prescriptionData.notes}
              onChange={handleChange}
              className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
              placeholder="Notes"
            />
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                id="Active"
                onClick={handleStatusChange}
                className={`px-4 py-2 rounded ${prescriptionData.status === 'Active' ? 'bg-green-600' : 'bg-white/10'} text-white`}
              >
                Active
              </button>
              <button
                type="button"
                id="Inactive"
                onClick={handleStatusChange}
                className={`px-4 py-2 rounded ${prescriptionData.status === 'Inactive' ? 'bg-red-600' : 'bg-white/10'} text-white`}
              >
                Inactive
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrescriptionUpdateForm
