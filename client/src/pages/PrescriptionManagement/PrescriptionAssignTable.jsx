import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trash2, CheckSquare } from 'lucide-react';
import { jsPDF } from "jspdf";
import axios from 'axios';
// import "jspdf-autotable";



const PrescriptionAssignTable = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/prescription/read`
      );
      const prescriptions = response.data.prescription;

      const updatedPrescription = await Promise.all(
        prescriptions.map(async (p) => {
          if (p.expiredAt && new Date(p.expiredAt) < new Date()) {
            p.status = "Inactive";
            try {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/prescription/update/${p._id}`,
                { status: "Inactive" }
              );
              console.log("Prescription status updated:", p._id);
            } catch (error) {
              console.error("Error updating Prescription status:", error);
            }
          }
          return p;
        })
      );

      setData(updatedPrescription);
      setSearchResults(updatedPrescription);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
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
    const filtered = data.filter(
      (elem) =>
        elem.PrescriptionID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.MedicationNames.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered || []);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/prescription/delete/${deleteId}`
      );

      setData((prev) => prev.filter((p) => p._id !== deleteId));
      setSearchResults((prev) => prev.filter((p) => p._id !== deleteId));

      setDeleteId(null);
      toast.success("Prescription deleted successfully!");
    } catch (error) {
      console.error("Error deleting prescription:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 rounded border border-white/20 bg-white/20 text-white placeholder-slate-200 focus:outline-none"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Search onClick={handleSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size={16} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-white/20 text-white">
          <thead className="bg-white/20">
            <tr>
              <th className="border border-white/20 px-4 py-2">Prescription ID</th>
              <th className="border border-white/20 px-4 py-2">First Name</th>
              <th className="border border-white/20 px-4 py-2">Last Name</th>
              <th className="border border-white/20 px-4 py-2">Medication Name</th>
              <th className="border border-white/20 px-4 py-2">Units</th>
              <th className="border border-white/20 px-4 py-2">Created At</th>
              <th className="border border-white/20 px-4 py-2">Status</th>
              <th className="border border-white/20 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map(p => (
              <tr key={p._id} className="hover:bg-white/10 transition">
                <td className="border border-white/20 px-4 py-2">{p.PrescriptionID}</td>
                <td className="border border-white/20 px-4 py-2">{p.firstName}</td>
                <td className="border border-white/20 px-4 py-2">{p.lastName}</td>
                <td className="border border-white/20 px-4 py-2">{p.MedicationNames}</td>
                <td className="border border-white/20 px-4 py-2">{p.units}</td>
                <td className="border border-white/20 px-4 py-2">{formatDate(p.createdAt)}</td>
                <td className="border border-white/20 px-4 py-2">{p.status}</td>
                <td className="border border-white/20 px-4 py-2 flex gap-2">
                  <Link to={`/prescription-assignform/${p._id}`}>
                    <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded flex items-center gap-1">
                      <CheckSquare size={16} /> Assign
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(p._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg text-white text-center">
            <p className="mb-4 text-lg font-semibold">Are you sure you want to delete this prescription?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-slate-200 text-slate-900 hover:bg-slate-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrescriptionAssignTable
