import { useState, useEffect } from "react";
import {
  Search,
  Edit,
  Trash2,
  User,
  Phone,
  Car,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import axios from "axios";
import {Link} from 'react-router-dom'

const DriverTable = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchDriver = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/driver/get-driver`
      );
      const response = fetchDriver.data;
      const updatedDrivers = response.driver.map((driv) => {
        return driv;
      });
      setData(response);
      setSearchResults(updatedDrivers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = data.driver?.filter((elem) => {
      return (
        elem.availabilty.toLowerCase() === searchQuery.toLowerCase() ||
        elem.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.driverId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    if (filtered && filtered.length === 0) {
      toast.error("No records found");
      return;
    }

    setSearchResults(filtered || []);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/driver/delete-driver/${deleteId}`);
      setData((prevState) => ({
        ...prevState,
        driver: prevState.driver.filter((driv) => driv._id !== deleteId),
      }));
      setDeleteId(null);
      toast.success("Driver deleted successfully!");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,113,108,0.3),rgba(255,255,255,0))]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            Driver Management
          </h1>
          <p className="text-slate-400">
            Manage your fleet drivers and their information
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-600/30 rounded p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, vehicle, or status..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-600/30 rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700/50 border-b border-slate-600/30">
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Driver ID
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      License Number
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      License Validity
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-2" />
                      Vehicle Model
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Vehicle License
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Password
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600/30">
                {searchResults.map((driver, index) => (
                  <tr
                    key={driver._id}
                    className="hover:bg-slate-700/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-200">
                        {driver.driverId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-200">
                        {driver.driverName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-300">
                        {driver.contactNo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-300">
                        {driver.driverLicense}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-300">
                        {driver.licenseValidity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-300">
                        {driver.vehicleModel}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-300">
                        {driver.vehicleLicense}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      <div className="text-sm flex items-center justify-center p-1 text-slate-300 border border-green-500 bg-green-500/20 rounded-full">
                        {driver.availabilty}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {driver.password}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Link to={`/driver-update/${driver._id}`} className="p-2 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded hover:bg-blue-600/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteConfirmation(driver._id)}
                          className="p-2 bg-red-600/20 text-red-300 border border-red-500/30 rounded hover:bg-red-600/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="backdrop-blur-xl bg-slate-800/90 border border-slate-600/50 rounded p-8 max-w-md w-full shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">
                  Delete Driver
                </h3>
                <p className="text-slate-400 mb-6">
                  Are you sure you want to delete this driver? This action
                  cannot be undone.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleDeleteConfirmed}
                    className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleCancelDelete}
                    className="flex-1 py-3 px-4 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverTable;
