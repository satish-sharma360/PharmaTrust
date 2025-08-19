import React, { useEffect, useState } from 'react';
import SupplierTable from './SupplierTable'; // Updated table with dummy data
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
// import 'jspdf-autotable';

const SupplyManagement = () => {
  const [suppliersCount, setSuppliersCount] = useState(0);
  const [activeSuppliersCount, setActiveSuppliersCount] = useState(0);
  const [inactiveSuppliersCount, setInactiveSuppliersCount] = useState(0);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/supplier/read`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch suppliers:', response.statusText);
          throw new Error('Failed to fetch suppliers');
        }
      })
      .then(data => {
        const suppliers = data.supplier;
        setSuppliersCount(suppliers.length);
  
        const activeSuppliers = suppliers.filter(supplier => supplier.status === 'Active');
        const inactiveSuppliers = suppliers.filter(supplier => supplier.status === 'Inactive');
  
        setActiveSuppliersCount(activeSuppliers.length);
        setInactiveSuppliersCount(inactiveSuppliers.length);
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
  };

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
};

  const generateReport = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/supplier/read`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to generate report:', response.statusText);
          throw new Error('Failed to generate report');
        }
      })
      .then(data => {
        const suppliers = data.supplier;

        const doc = new jsPDF();

        const tableHeader = [['Supplier ID', 'Supplier Name', 'Last Name', 'NIC', 'Address', 'Contact No', 'Email']];

        const tableData = suppliers.map(supplier => [
          supplier.supplierID,
          supplier.firstName,
          supplier.lastName,
          supplier.NIC,
          supplier.address,
          supplier.contactNo,
          supplier.email
        ]);

        doc.autoTable({
          head: tableHeader,
          body: tableData,
        });

        doc.save('Supplier Management Report.pdf');
      })
      .catch(error => {
        console.error('Error generating report:', error);
      });
  };

  return (
    <div className="min-h-screen flex bg-slate-800 p-10">
      <div className="w-64 backdrop-blur-md bg-slate-700 border border-slate-300 rounded p-5 mr-10">
        <h2 className="text-xl font-bold text-white mb-4">Menu</h2>
        <Link to="/create-supplier" className="block bg-green-600 text-white hover:bg-green-700 rounded-lg p-3 mb-2 text-center font-semibold">Create New Supplier</Link>
        <Link to="/orders" className="block bg-slate-700 text-white hover:bg-slate-800 rounded-lg p-3 text-center font-semibold">View Orders</Link>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {/* Header */}
        <div className="backdrop-blur-md bg-slate-700 border border-slate-300 rounded-3xl flex justify-between items-center px-10 py-6">
          <h1 className="text-3xl font-bold text-white">Supplier Management Dashboard</h1>
          <button
            onClick={generateReport}
            className="flex items-center gap-2 bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            <Download size={18} /> Export PDF
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          <div className="backdrop-blur-md bg-slate-700 border border-slate-300 rounded-3xl p-6 flex-1 text-center">
            <p className="text-white font-semibold">Total Suppliers</p>
            <p className="text-2xl font-bold text-white">{suppliersCount}</p>
          </div>
          <div className="backdrop-blur-md bg-slate-700 border border-slate-300 rounded-3xl p-6 flex-1 text-center">
            <p className="text-white font-semibold">Active Suppliers</p>
            <p className="text-2xl font-bold text-green-600">{activeSuppliersCount}</p>
          </div>
          <div className="backdrop-blur-md bg-slate-700 border border-slate-300 rounded-3xl p-6 flex-1 text-center">
            <p className="text-white font-semibold">Inactive Suppliers</p>
            <p className="text-2xl font-bold text-red-600">{inactiveSuppliersCount}</p>
          </div>
        </div>

        {/* Table */}
        <div className="backdrop-blur-md bg-slate-700 border border-slate-300 rounded-3xl p-6">
          <SupplierTable />
        </div>
      </div>
    </div>
  );
}


export default SupplyManagement
