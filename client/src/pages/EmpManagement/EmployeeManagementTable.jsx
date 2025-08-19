import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function EmployeeManagementTable() {
  const [data, setData] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [deleteId, setDeleteId] = useState(null);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const fetchEmployee = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/employee/get`
    );
    const response = fetchEmployee.data;

    const updatedEmployees = response.employee.map((emp) => {
      if (new Date(emp.expiredAt) < new Date()) {
        emp.status = 'Inactive';
        axios
          .put(`${import.meta.env.VITE_API_URL}/api/employee/update/${emp._id}`, {
            status: 'Inactive',
          })
          .then((response) => {
            console.log('Employee status updated:', response);
          })
          .catch((error) => {
            console.error('Error updating employee status:', error);
          });
      }
      return emp;
    });

    setData(response);
    setSearchResults(updatedEmployees);
  } catch (error) {
    console.log(error);
  }
};

const formatDate = (datetimeString) => {
  const date = new Date(datetimeString);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const handleSearch = (e) => {
  e.preventDefault();
  const filtered = data.employee?.filter((elem) => {
    return (
      elem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      elem.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      elem.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  setSearchResults(filtered || []);
};

const handleDeleteConfirmation = (id) => {
  setDeleteId(id);
};

const handleDeleteConfirmed = async () => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/employee/delete/${deleteId}`
    );
    setData((prevState) => ({
      ...prevState,
      employee: prevState.employee.filter((emp) => emp._id !== deleteId),
    }));
    setDeleteId(null);
    toast.success('Employee deleted successfully!');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

const handleCancelDelete = () => {
  setDeleteId(null);
};


  return (
    <div className="p-6">
      {/* 🔎 Search Bar */}
      <form
        className="flex justify-end mb-6"
        onSubmit={handleSearch}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search Employee"
            className="bg-slate-800/60 backdrop-blur-md border border-slate-600 rounded-md placeholder-slate-400 focus:outline-none w-56 p-2 pl-10 text-white shadow-lg"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <FaSearch className="text-slate-400 absolute top-1/2 transform -translate-y-1/2 left-3" />
        </div>
        <button
          type="submit"
          className="ml-3 bg-slate-700 hover:bg-slate-600 text-white rounded-md px-4 py-2 shadow-lg transition-all"
        >
          Search
        </button>
      </form>

      {/* 📋 Employee Table */}
      <div className="overflow-x-auto backdrop-blur-lg bg-slate-800/40 border border-slate-600 rounded-xl shadow-lg">
        <table className="w-full text-left text-white">
          <thead className="bg-slate-900/70">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">NIC</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Contact No</th>
              <th className="px-4 py-2">Job Role</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((emp, index) => (
              <tr
                key={index}
                className="hover:bg-slate-700/40 transition-all"
              >
                <td className="px-4 py-2">{emp._id.slice(-5)}</td>
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.NIC}</td>
                <td className="px-4 py-2">{emp.gender}</td>
                <td className="px-4 py-2">{emp.contactNo}</td>
                <td className="px-4 py-2">{emp.empRole}</td>
                <td className="px-4 py-2">{formatDate(emp.DOB)}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link
                    to={`/update-employee/${emp._id}`}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(emp._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ❌ Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-slate-800 text-white p-6 rounded-xl shadow-lg border border-slate-600">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this employee?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-slate-500 hover:bg-slate-600 px-4 py-2 rounded-md"
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

export default EmployeeManagementTable
