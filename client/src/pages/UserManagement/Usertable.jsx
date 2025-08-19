import React, { useState, useEffect } from 'react';
import { Download, Search, Trash2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'jspdf-autotable'; // Ensure this import is uncommented if you intend to use it

const Usertable = () => {
  // State to hold the original fetched list of all users
  const [allUsers, setAllUsers] = useState([]);
  // State to hold the users currently displayed in the table (all users or search results)
  const [displayedUsers, setDisplayedUsers] = useState([]);
  // State to hold the value of the search input field
  const [searchInputValue, setSearchInputValue] = useState('');
  // State to hold the ID of the user to be deleted (for the confirmation modal)
  const [deleteId, setDeleteId] = useState(null);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Function to fetch user data from the backend
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/read`);
      console.log("Fetched Data:", data); // Log the full data response

      // Assuming 'data' contains an object like { user: [...] }
      if (data && Array.isArray(data.user)) {
        setAllUsers(data.user); // Store the original list of users
        setDisplayedUsers(data.user); // Initially display all users
      } else {
        console.error("Fetched data is not in expected format:", data);
        setAllUsers([]);
        setDisplayedUsers([]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data.");
    }
  };

  // Function to handle changes in the search input
  const handleSearchInputChange = (e) => {
    setSearchInputValue(e.target.value);
    // Optional: Live search as user types
    if (e.target.value === '') {
      setDisplayedUsers(allUsers); // If search input is cleared, show all users
    } else {
      const filterData = allUsers.filter(user =>
        user.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setDisplayedUsers(filterData);
    }
  };

  // Function to handle search button click (if you prefer explicit search)
  // For simplicity, the handleSearchInputChange now does live search.
  // This function would be used if you wanted search only on button click.
  const executeSearch = () => {
    const filterData = allUsers.filter(user =>
      user.username.toLowerCase().includes(searchInputValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInputValue.toLowerCase())
    );
    setDisplayedUsers(filterData);
  };

  // Function to set the ID of the user to be deleted
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  // Function to confirm and execute the delete operation
  const confirmDelete = async () => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/deleteall/${deleteId}`);
      
      if (data.success) { // Check if the deletion was successful based on backend response
        toast.success('User deleted successfully');
        // Update both allUsers and displayedUsers to remove the deleted user
        setAllUsers(prevUsers => prevUsers.filter(user => user._id !== deleteId));
        setDisplayedUsers(prevUsers => prevUsers.filter(user => user._id !== deleteId));
      } else {
        toast.error(data.message || 'Failed to delete user.');
      }
      setDeleteId(null); // Close the confirmation modal
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error('Error deleting user. Please try again.');
      setDeleteId(null); // Close the confirmation modal even on error
    }
  };

  // Function to cancel the delete operation
  const cancelDelete = () => setDeleteId(null);

  // Function to generate and download a PDF report
  const generateReport = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
    doc.setFontSize(24);
    doc.text('User Management Report', 40, 60);

    const tableColumns = ['User Name', 'Email', 'Phone Number', 'Address'];
    // Map from allUsers (original data) to ensure all users are in the report
    const tableData = allUsers.map(u => [u.username, u.email, u.phonenumber, u.address]);

    // Ensure jspdf-autotable is correctly loaded for this to work
    doc.autoTable({ startY: 90, head: [tableColumns], body: tableData, theme: 'grid', styles: { fontSize: 12 } });
    doc.save('UserReport.pdf');
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search User Accounts"
            className="w-full p-2 pl-10 rounded-lg bg-white/20 backdrop-blur-md border border-slate-300 focus:outline-none"
            value={searchInputValue} // Bind to searchInputValue
            onChange={handleSearchInputChange} // Use the new handler
          />
          <Search 
            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500 cursor-pointer" 
            size={16} 
            onClick={executeSearch} // Call executeSearch on icon click if desired
          />
        </div>
        <button
          onClick={generateReport}
          className="flex items-center gap-2 bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          <Download size={16} /> Download Report {/* Changed icon to Download for consistency with action */}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="p-3 border border-slate-300 text-left">User Name</th>
              <th className="p-3 border border-slate-300 text-left">Email</th>
              <th className="p-3 border border-slate-300 text-left">Phone Number</th>
              <th className="p-3 border border-slate-300 text-left">Address</th>
              <th className="p-3 border border-slate-300 text-left">Actions</th> {/* Changed to Actions */}
            </tr>
          </thead>
          <tbody>
            {/* Map over displayedUsers to render the table rows */}
            {displayedUsers.length > 0 ? (
              displayedUsers.map(user => (
                <tr key={user._id} className="bg-slate-800/30 backdrop-blur-md border text-white border-slate-300">
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phonenumber}</td>
                  <td className="p-3">{user.address}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-600">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="mb-4 font-semibold">Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-slate-300 text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usertable;