import React, { useState, useEffect } from "react";
import { Search, Trash2, Download } from "lucide-react";
import jsPDF from "jspdf";
import axios from "axios";
import toast from "react-hot-toast";
// import 'jspdf-autotable';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [request, setRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const fetchSupplyrequest = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/supplyrequest/read`
      );
      setRequests(data.requests);
      setSearchResults(data.requests);
      console.log(data);
    } catch (error) {
      console.log("Error fetching supply request", error);
      toast.error("Failed to fetch supply requests. Please try again.");
    }
  };
  useEffect(() => {
    fetchSupplyrequest();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredResults = request.filter(
      (request) =>
        request.medicineName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        request.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleDeleteConfirmed = async () => {
    if (deleteId) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/supplyrequest/delete/${deleteId}`
        );
        setRequests((prev) =>
          prev.filter((reques) => request._id !== deleteId)
        );
        setSearchResults((prev) =>
          prev.filter((reques) => request._id !== deleteId)
        );
        setDeleteId(null);
        toast.success("Supply request deleted successfully");
      } catch (error) {
        console.error("Error deleting supply request:", error);
        toast.error("Failed to delete supply request.");
      }
    }
  };

  const handleCancelDelete = () => setDeleteId(null)
  const handleDeleteConfirmation = (id) => setDeleteId(id)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Supply Request Report", 14, 20);

    const tableColumns = [
      "Medicine Name",
      "Quantity",
      "Supplier",
      "Created At",
    ];
    const tableData = searchResults.map((r) => [
      r.medicineName,
      r.quantity,
      r.supplier,
      formatDate(r.createdAt),
    ]);

    doc.autoTable({
      head: [tableColumns],
      body: tableData,
      startY: 30,
      theme: "grid",
      styles: { fontSize: 12 },
    });

    doc.save("SupplyRequestReport.pdf");
  };

  return (
    <div className="min-h-screen bg-slate-800 flex justify-center p-10">
      <div className="w-full max-w-6xl bg-white/30 backdrop-blur-md rounded-3xl border border-slate-300 p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Supply Orders</h1>
          <button
            onClick={generateReport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
          >
            <Download size={18} /> Export PDF
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex justify-end gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Supply Orders"
              className="pl-10 p-2 rounded-md border border-slate-400 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={16}
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800">
            Search
          </button>
        </form>

        <table className="w-full border border-slate-400 rounded-lg overflow-hidden">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="px-4 py-2">Medicine Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Supplier</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((r) => (
              <tr
                key={r._id}
                className="bg-white/50 backdrop-blur-sm border-b border-slate-300"
              >
                <td className="px-4 py-2">{r.medicineName}</td>
                <td className="px-4 py-2">{r.quantity}</td>
                <td className="px-4 py-2">{r.supplier}</td>
                <td className="px-4 py-2">{formatDate(r.createdAt)}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteConfirmation(r._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-slate-900/70">
            <div className="bg-white p-6 rounded-2xl flex flex-col gap-4">
              <p className="text-lg font-semibold">
                Are you sure you want to delete this request?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteConfirmed}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleCancelDelete}
                  className="px-4 py-2 bg-slate-300 text-slate-900 rounded-lg hover:bg-slate-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
