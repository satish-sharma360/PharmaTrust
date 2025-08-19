import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, Edit, Trash2, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';
import axios from 'axios';
// import 'jspdf-autotable';

const PrescriptionTable = () => {
  // Dummy data
  // const dummyPrescriptions = [
  //   { _id: '1', PrescriptionID: 'P001', firstName: 'John', lastName: 'Doe', MedicationNames: 'Paracetamol', units: 10, status: 'Active' },
  //   { _id: '2', PrescriptionID: 'P002', firstName: 'Jane', lastName: 'Smith', MedicationNames: 'Amoxicillin', units: 5, status: 'Inactive' },
  //   { _id: '3', PrescriptionID: 'P003', firstName: 'Alice', lastName: 'Johnson', MedicationNames: 'Ibuprofen', units: 15, status: 'Active' },
  // ];

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/prescription/read`); // baseURL auto-added
      const prescriptions = res.data.prescription;

      const updatedPrescription = await Promise.all(
        prescriptions.map(async (promo) => {
          if (promo.expiredAt && new Date(promo.expiredAt) < new Date()) {
            try {
              await axios.put(`${import.meta.env.VITE_API_URL}/api/prescription/update/${promo._id}`, {
                status: "Inactive",
              });
              return { ...promo, status: "Inactive" };
            } catch (error) {
              console.error("Error updating Prescription status:", error);
            }
          }
          return promo;
        })
      );

      setData(updatedPrescription);
      setSearchResults(updatedPrescription);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = data.filter((elem) => {
      return (
        elem.PrescriptionID?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.MedicationNames?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setSearchResults(filtered || []);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/prescription/delete/${deleteId}`);
      setData((prev) => prev.filter((promo) => promo._id !== deleteId));
      setSearchResults((prev) =>
        prev.filter((promo) => promo._id !== deleteId)
      );
      setDeleteId(null);
      toast.success("Prescription deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between mb-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-gray-300 backdrop-blur-md focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={18} />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-all">
            Search
          </button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
        <table className="min-w-full text-left text-white">
          <thead className="bg-white/20">
            <tr>
              <th className="px-4 py-2">Prescription ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Medication</th>
              <th className="px-4 py-2">Units</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map(p => (
              <tr key={p._id} className="border-b border-white/20">
                <td className="px-4 py-2">{p.PrescriptionID}</td>
                <td className="px-4 py-2">{p.firstName}</td>
                <td className="px-4 py-2">{p.lastName}</td>
                <td className="px-4 py-2">{p.MedicationNames}</td>
                <td className="px-4 py-2">{p.units}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link to={`/prescription-view-details/${p._id}`}>
                    <Eye className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                  </Link>
                  <Link to={`/update-prescription/${p._id}`}>
                    <Edit className="text-green-500 hover:text-green-700 cursor-pointer" />
                  </Link>
                  <Trash2
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDeleteConfirmation(p._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 flex flex-col items-center gap-4">
            <p className="text-white font-semibold">Are you sure you want to delete this Prescription?</p>
            <div className="flex gap-4">
              <button onClick={handleDeleteConfirmed} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
                Delete
              </button>
              <button onClick={handleCancelDelete} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default PrescriptionTable
