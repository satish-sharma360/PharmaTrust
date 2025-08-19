import { useEffect, useState } from 'react';
import { FileText, UserCheck, Calendar } from 'lucide-react';
import SideBar from '../../components/SideBar';
import { jsPDF } from "jspdf";
// import "jspdf-autotable";
import PrescriptionAssignTable from './PrescriptionAssignTable';
import axios from 'axios';

// Dummy prescription data

const PrescriptionAssignPage = () => {
 const [prescriptionCount, setPrescriptionsCount] = useState(0);
  const [activePrescriptionsCount, setActivePrescriptionsCount] = useState(0);
  const [inactivePrescriptionsCount, setInactivePrescriptionsCount] = useState(0);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/prescription/read`
      );

      const prescription = response.data.prescription;
      setPrescriptionsCount(prescription.length);

      const activePrescriptions = prescription.filter(
        (p) => p.status === "Active"
      );
      const inactivePrescriptions = prescription.filter(
        (p) => p.status === "Inactive"
      );

      setActivePrescriptionsCount(activePrescriptions.length);
      setInactivePrescriptionsCount(inactivePrescriptions.length);
    } catch (error) {
      console.error("Error fetching prescription:", error);
    }
  };

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const generateReport = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/prescription/read`
      );

      const prescription = response.data.prescription;

      const doc = new jsPDF();

      const tableHeader = [
        [
          "Prescription ID",
          "First Name",
          "Last Name",
          "Medication Name",
          "Units",
          "Created At",
          "Status",
        ],
      ];

      const tableData = prescription.map((p) => [
        p.PrescriptionID,
        p.firstName,
        p.lastName,
        p.MedicationNames,
        p.units,
        formatDate(p.createdAt),
        p.status,
      ]);

      doc.autoTable({
        head: tableHeader,
        body: tableData,
      });

      doc.save("Prescription_Management_Report.pdf");
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div className="flex bg-slate-900 min-h-screen text-white">
      <SideBar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center p-8 mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded shadow-lg">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <UserCheck /> Prescription Assign Page
          </h1>
          <div className="flex gap-4 items-center">

            <div className="flex flex-col">
              <span className="font-bold">Dummy</span>
              <span className="text-xs text-slate-300">Prescription Manager</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-semibold">
            Prescriptions ({prescriptionCount})
          </div>
        </div>

        <div className="max-w-full bg-white/10 backdrop-blur-md border border-white/20 rounded p-6 shadow-lg">
          <PrescriptionAssignTable />
        </div>

        <div className="mt-6 flex gap-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded p-4 flex-1 text-center">
            <span className="block text-lg font-bold">{activePrescriptionsCount}</span>
            <span className="text-sm text-slate-300">Active Prescriptions</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded p-4 flex-1 text-center">
            <span className="block text-lg font-bold">{inactivePrescriptionsCount}</span>
            <span className="text-sm text-slate-300">Inactive Prescriptions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrescriptionAssignPage
