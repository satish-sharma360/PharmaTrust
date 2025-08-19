import { useEffect, useState } from 'react';
import PrescriptionTable from './PrescriptionTable';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import axios from 'axios';
import "jspdf-autotable";

const PrescriptionManagement = () => {
  // Dummy prescription data
  // const dummyPrescriptions = [
  //   {
  //     PrescriptionID: 'P001',
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     age: 35,
  //     contactNo: '9876543210',
  //     MedicationNames: 'Paracetamol',
  //     units: 10,
  //     notes: 'Take after meals',
  //     status: 'Active'
  //   },
  //   {
  //     PrescriptionID: 'P002',
  //     firstName: 'Jane',
  //     lastName: 'Smith',
  //     age: 28,
  //     contactNo: '9876543211',
  //     MedicationNames: 'Amoxicillin',
  //     units: 5,
  //     notes: 'Twice a day',
  //     status: 'Inactive'
  //   },
  //   {
  //     PrescriptionID: 'P003',
  //     firstName: 'Alice',
  //     lastName: 'Johnson',
  //     age: 42,
  //     contactNo: '9876543212',
  //     MedicationNames: 'Ibuprofen',
  //     units: 15,
  //     notes: 'Once daily',
  //     status: 'Active'
  //   },
  // ];

  const [prescriptionCount, setPrescriptionCount] = useState(0);
  const [activePrescriptionCount, setActivePrescriptionCount] = useState(0);
  const [inactivePrescriptionCount, setInactivePrescriptionCount] = useState(0);

  useEffect(() => {
    fetchPrescription();
  }, []);

  const fetchPrescription = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/prescription/read`
      );

      const prescriptions = response.data.prescription;

      setPrescriptionCount(prescriptions.length);

      const activePrescription = prescriptions.filter(
        (prescription) => prescription.status === "Active"
      );
      const inactivePrescription = prescriptions.filter(
        (prescription) => prescription.status === "Inactive"
      );

      setActivePrescriptionCount(activePrescription.length);
      setInactivePrescriptionCount(inactivePrescription.length);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };

  const generateReport = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/prescription/read`
    );

    const prescriptions = response.data.prescription;

    const doc = new jsPDF();

    const totalPrescriptions = prescriptions.length;

    // Adding counts
    doc.text(`Total Prescriptions: ${totalPrescriptions}`, 20, 20);
    doc.text(`Active Prescriptions: ${activePrescriptionCount}`, 20, 30);
    doc.text(`Inactive Prescriptions: ${inactivePrescriptionCount}`, 20, 40);

    // Table header + data
    const tableHeader = [
      [
        "Prescription ID",
        "First Name",
        "Last Name",
        "Age",
        "Contact No",
        "Medication Names",
        "Units",
        "Notes",
      ],
    ];
    const tableData = prescriptions.map((p) => [
      p.PrescriptionID,
      p.firstName,
      p.lastName,
      p.age,
      p.contactNo,
      p.MedicationNames,
      p.units,
      p.notes,
    ]);

    // ✅ Works now
    doc.autoTable({
      head: tableHeader,
      body: tableData,
      startY: 50,
    });

    doc.save("PrescriptionManagementReport.pdf");
  } catch (error) {
    console.error("Error generating report:", error);
  }
};


  return (
    <div className="flex bg-slate-900 min-h-screen">
      <div className="w-64">
        {/* Replace with your SideBar */}
      </div>
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6">
          <h1 className="text-3xl text-white font-bold">Prescription Management Dashboard</h1>
          <button
            onClick={generateReport}
            className="bg-white/20 hover:bg-blue-600 hover:text-white text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <Download size={20} />
            Download Report
          </button>
        </div>

        <div className="flex flex-wrap justify-between mb-6 gap-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-white font-semibold">Total: {prescriptionCount}</div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-white font-semibold">Active: {activePrescriptionCount}</div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-white font-semibold">Inactive: {inactivePrescriptionCount}</div>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          <Link to="/create-prescription" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">Create New Prescription</Link>
          <Link to="/prescription-assign" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">Assign Page</Link>
          <Link to="/inventory-management" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">Check Inventory</Link>
          <Link to="/user-payment" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">Check Payment</Link>
        </div>

        <PrescriptionTable/>
      </div>
    </div>
  );
}


export default PrescriptionManagement
