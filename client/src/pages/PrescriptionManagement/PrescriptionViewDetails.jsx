import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { Download } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PrescriptionViewDetails = () => {
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
  });

  // Fetch prescription by ID
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/prescription/get/${id}`)
      .then((result) => {
        const prescription = result.data.prescription;
        setPrescriptionData(prescription);
        console.log("Fetched:", prescription);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="flex bg-slate-900 min-h-screen">
      <SideBar />
      <div className="flex-1 p-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded flex justify-between items-center px-8 py-6 mb-8">
          <h1 className="text-3xl font-bold text-white">View Prescription Details</h1>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col text-white">
              <span className="font-semibold">Dummy</span>
              <span className="text-xs">Prescription Manager</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded max-w-4xl mx-auto">
          <form className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col gap-4 flex-1">
              <input
                type="text"
                name="PrescriptionID"
                value={prescriptionData.PrescriptionID}
                readOnly
                className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
                placeholder="Prescription ID"
              />
              <input
                type="text"
                name="firstName"
                value={prescriptionData.firstName}
                readOnly
                className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={prescriptionData.lastName}
                readOnly
                className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
                placeholder="Last Name"
              />
              <input
                type="text"
                name="age"
                value={prescriptionData.age}
                readOnly
                className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
                placeholder="Age"
              />
              <input
                type="text"
                name="contactNo"
                value={prescriptionData.contactNo}
                readOnly
                className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
                placeholder="Contact Number"
              />
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <textarea
                name="MedicationNames"
                value={prescriptionData.MedicationNames}
                readOnly
                className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
                placeholder="Medication Names"
              />
              <input
                type="text"
                name="units"
                value={prescriptionData.units}
                readOnly
                className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
                placeholder="Units"
              />
              <textarea
                name="notes"
                value={prescriptionData.notes}
                readOnly
                className="p-2 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white"
                placeholder="Notes"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default PrescriptionViewDetails
