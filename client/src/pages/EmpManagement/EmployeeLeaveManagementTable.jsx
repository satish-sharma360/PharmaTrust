import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function EmployeeLeaveManagementTable() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchEmployee = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/empLeave/get`
      );
      const response = fetchEmployee.data;

      const updatedEmployees = response.employee.map((emp) => {
        if (new Date(emp.expiredAt) < new Date()) {
          emp.status = "Inactive";
          axios
            .put(`${import.meta.env.VITE_API_URL}/api/employee/update/${emp._id}`, {
              status: "Inactive",
            })
            .then((res) => {
              console.log("leave status updated:", res);
            })
            .catch((error) => {
              console.error("Error updating employee status:", error);
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
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
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
        `${import.meta.env.VITE_API_URL}/api/empLeave/delete/${deleteId}`
      );
      setData((prevState) => ({
        ...prevState,
        employee: prevState.employee.filter((emp) => emp._id !== deleteId),
      }));
      setDeleteId(null);
      toast.success("Leave deleted successfully!");
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
    <div>
        <div>
            <form  className='px-10 py-2 pb-7 flex justify-end' onSubmit={handleSearch}>
                <div className='relative'>
                    <input type='text' placeholder='Search Employee' className='border border-gray-200 rounded-md placeholder-gray focus:outline-none w-56 p-2 pl-10' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
                    <FaSearch className='text-gray absolute top-1/2 transform -translate-y-1/2 left-3' />
                </div>
                <button type='submit' className='bg-light-blue border border-gray-200 text-white rounded-md w-32 ml-2 hover:bg-blue hover:border-blue transition-all'>Search</button>
            </form>
        </div>
        <div className='px-10'>
        <table className="w-full border border-gray-200 ">
            <thead>
                <tr className="bg-slate-700 text-white text-left">
                    <th className="border border-gray-200 px-4 py-2">ID</th>
                    <th className="border border-gray-200 px-4 py-2">Name</th>
                    <th className="border border-gray-200 px-4 py-2">Email</th>
                    <th className="border border-gray-200 px-4 py-2">NIC</th>
                    <th className="border border-gray-200 px-4 py-2">Contact No</th>
                    <th className="border border-gray-200 px-4 py-2">Job Role</th>
                    <th className="border border-gray-200 px-4 py-2">Description</th>
                    <th className="border border-gray-200 px-4 py-2">Date</th>
                    <th className="border border-gray-200 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {searchResults?.map((elem, index) => {
                    return (
                    <tr key={index} className="bg-paleblue">
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem._id.slice(-5)}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.name}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.email}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.NIC}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.contactNo}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.empRole}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{elem.address}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">{formatDate(elem.DOB)}</td>
                        <td className="border-b-2 border-b-blue px-4 py-2">
                            <div className='flex text-sm px-full'>
                                <Link to={`/update-leave-employee/${elem._id}`}><button className='bg-green-600 text-white hover:bg-green-700 transition-all rounded  px-4 py-1'>Update</button></Link>
                                <button onClick={() => handleDeleteConfirmation(elem._id)} className='bg-red-600 text-white hover:bg-red-700 transition-all rounded  px-4 py-1 ml-2'>Delete</button>
                            </div>
                        </td>
                    </tr>
                    )})}
            </tbody>
        </table>
        </div>
        {deleteId && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-dark-blue bg-opacity-90">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this Leave?</p>
                        <div className="flex justify-center">
                            <button onClick={handleDeleteConfirmed} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-2">Delete</button>
                            <button onClick={handleCancelDelete} className="bg-slate-200 text-slate-900 px-4 py-2 rounded-md hover:bg-slate-300 ml-2">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
    </div>
  );
}

export default EmployeeLeaveManagementTable
