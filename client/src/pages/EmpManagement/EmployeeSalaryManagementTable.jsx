import { useEffect, useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const EmployeeSalaryManagementTable = () => {
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
        `${import.meta.env.VITE_API_URL}/api/employee/get`
      );
      const response = fetchEmployee.data;

      const updatedEmployees = response.employee.map((emp) => {
        if (new Date(emp.expiredAt) < new Date()) {
          emp.status = "Inactive";
          axios
            .put(
              `${import.meta.env.VITE_API_URL}/api/employee/update/${emp._id}`,
              { status: "Inactive" }
            )
            .then((response) => {
              console.log("Employee status updated:", response);
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
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    return formattedDate;
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
      toast.success("Employee deleted successfully!");
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
    <div className="p-8 bg-slate-800">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex justify-end mb-6 relative"
      >
        <input
          type="text"
          placeholder="Search Employee"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-800/50 backdrop-blur-md border border-slate-600 text-slate-200 rounded-lg pl-10 pr-4 py-2 w-64 shadow-md placeholder-slate-400 focus:outline-none"
        />
        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <button
          type="submit"
          className="ml-3 bg-slate-200/10 hover:bg-slate-200/20 text-slate-100 border border-slate-500 px-4 py-2 rounded-lg shadow-lg transition"
        >
          Search
        </button>
      </form>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-slate-800/40 backdrop-blur-lg shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-slate-700/70 text-slate-200">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">NIC</th>
              <th className="p-4 text-left">Gender</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">DOB</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((emp) => (
              <tr
                key={emp._id}
                className="hover:bg-slate-700/40 transition border-b border-slate-700/50"
              >
                <td className="p-4">{emp._id.slice(-5)}</td>
                <td className="p-4">{emp.name}</td>
                <td className="p-4">{emp.email}</td>
                <td className="p-4">{emp.NIC}</td>
                <td className="p-4">{emp.gender}</td>
                <td className="p-4">{emp.contactNo}</td>
                <td className="p-4">{emp.empRole}</td>
                <td className="p-4">
                  {formatDate(emp.DOB)}
                </td>
                <td className="p-4">
                  <div className="flex gap-2 flex-col">
                    <Link to={`/update-employee/${emp._id}`}>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm">
                        <Pencil className="w-4 h-4" /> Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteConfirmation(emp.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-slate-800 text-slate-100 p-8 rounded-xl shadow-xl w-96">
            <p className="text-lg font-semibold mb-6 text-center">
              Are you sure you want to delete this employee?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg"
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

export default EmployeeSalaryManagementTable
