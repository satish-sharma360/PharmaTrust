import React, { useEffect, useState } from "react";
// import { Input, Button } from '@mui/material'; // optional, can use plain inputs too
import { Search, Check, X, Download } from "lucide-react";
import jsPDF from "jspdf";
import axios from "axios";
import toast from "react-hot-toast";
// import 'jspdf-autotable';

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const {data} = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/feedback/read`
      );
      setFeedbacks(data.feedback);
      setSearchResults(data.feedback);
    } catch (error) {
      console.error("Error fetching feedbacks:", error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = feedbacks.filter((elem) => {
      return (
        elem.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setSearchResults(filtered);
  };

  const results = searchResults.length > 0 ? searchResults : feedbacks;

  const approve = async (index) => {
    try {
      const updatedFeedbacks = [...results];
      updatedFeedbacks[index].status = "Approved";
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/feedback/update/${updatedFeedbacks[index]._id}`,
        { status: "Approved" }
      );
      setSearchResults(updatedFeedbacks);
      toast.success("Feedback approved successfully!");
    } catch (error) {
      console.error("Error approving feedback:", error.message);
    }
  };

  const reject = async (index) => {
    try {
      const updatedFeedbacks = [...results];
      updatedFeedbacks[index].status = "Rejected";
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/feedback/update/${updatedFeedbacks[index]._id}`,
        { status: "Rejected" }
      );
      setSearchResults(updatedFeedbacks);
      toast.success("Feedback rejected successfully!");
    } catch (error) {
      console.error("Error rejecting feedback:", error.message);
      toast.error("Failed to reject feedback.");
    }
  };

  return (
    <div className="p-6 bg-slate-200 min-h-screen">
      <div className="mb-5 flex justify-between items-center">
        <form className="flex" onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Feedback"
              className="pl-10 p-2 rounded-md border border-slate-300 bg-white/30 backdrop-blur-sm placeholder-slate-400 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute top-2.5 left-2 text-slate-500"
              size={16}
            />
          </div>
          <button
            type="submit"
            className="ml-2 px-4 py-2 rounded-md bg-slate-600 text-white hover:bg-slate-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full rounded-md bg-white/30 backdrop-blur-sm border border-slate-300">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Feedback</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((f, index) => (
              <tr key={index} className="text-slate-800">
                <td className="px-4 py-2">{f.name}</td>
                <td className="px-4 py-2">{f.email}</td>
                <td className="px-4 py-2">{f.rating}/10</td>
                <td className="px-4 py-2">{f.feedback}</td>
                <td className="px-4 py-2">{f.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => approve(index)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button
                    onClick={() => reject(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
                  >
                    <X size={14} /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackTable;
