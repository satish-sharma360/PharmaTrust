import React, { useState } from "react";
import { UserCheck, FileText, ClipboardList, Calendar } from "lucide-react";
// import toast from 'react-hot-toast';
import SideBar from "../../components/SideBar";
import jsPDF from "jspdf";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const PrescriptionAssignForm = () => {
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
    status: "",
    notes: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/prescription/get/${id}`)
      .then((result) => {
        const prescription = result.data.prescription;

        prescription.createdAt = prescription.createdAt.split("T")[0];
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
    const newStatus = id === "Ashen" ? "Ashen" : "Kavindu";
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
        toast.success("Prescription Assigned successfully!");
        setTimeout(() => {
          navigate("/prescription-assign");
        });
      })
      .catch((error) => {
        toast.error("Prescription assign failed!");
        console.error("Error assigning prescription:", error);
      });
  };

  return (
    <div className="flex bg-slate-900 min-h-screen text-white">
      <SideBar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <UserCheck /> Assign Medications
          </h1>
        </div>

        <div className="max-w-4xl mx-auto p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-8"
          >
            <div className="flex flex-col gap-4 flex-1">
              <label className="font-semibold text-slate-200">
                Prescription ID
              </label>
              <input
                type="text"
                name="PrescriptionID"
                value={prescriptionData.PrescriptionID}
                readOnly
                className="p-2 rounded bg-white/20 border border-white/30 text-slate-100"
              />

              <label className="font-semibold text-slate-200">First Name</label>
              <input
                type="text"
                name="firstName"
                value={prescriptionData.firstName}
                onChange={handleChange}
                className="p-2 rounded bg-white/20 border border-white/30 text-slate-100"
              />

              <label className="font-semibold text-slate-200">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={prescriptionData.lastName}
                onChange={handleChange}
                className="p-2 rounded bg-white/20 border border-white/30 text-slate-100"
              />

              <label className="font-semibold text-slate-200">Age</label>
              <input
                type="text"
                name="age"
                value={prescriptionData.age}
                onChange={handleChange}
                className="p-2 rounded bg-white/20 border border-white/30 text-slate-100"
              />

              <label className="font-semibold text-slate-200">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNo"
                value={prescriptionData.contactNo}
                onChange={handleChange}
                className="p-2 rounded bg-white/20 border border-white/30 text-slate-100"
              />

              <button
                type="submit"
                className="bg-slate-700 hover:bg-slate-600 py-3 rounded font-semibold transition-transform transform hover:scale-105"
              >
                Assign Prescription
              </button>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <label className="font-semibold text-slate-200">
                Medication Name
              </label>
              <input
                type="text"
                name="MedicationNames"
                value={prescriptionData.MedicationNames}
                onChange={handleChange}
                className="p-2 rounded bg-white/20 border border-white/30 text-slate-100"
              />

              <label className="font-semibold text-slate-200">Units</label>
              <input
                type="text"
                name="units"
                value={prescriptionData.units}
                onChange={handleChange}
                className="p-2 rounded bg-white/20 border border-white/30 text-slate-100"
              />

              <label className="font-semibold text-slate-200">Notes</label>
              <textarea
                name="notes"
                value={prescriptionData.notes}
                onChange={handleChange}
                className="p-2 rounded bg-white/20 border border-white/30 text-slate-100"
              />

              <label className="font-semibold text-slate-200">Assign To</label>
              <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="Ashen"
                    checked={prescriptionData.status === "Ashen"}
                    onChange={handleStatusChange}
                    className="w-5"
                  />
                  <span>Ashen</span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="Kavindu"
                    checked={prescriptionData.status === "Kavindu"}
                    onChange={handleStatusChange}
                    className="w-5"
                  />
                  <span>Kavindu</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionAssignForm;
