import React, { useEffect, useState } from "react";
import { Edit2, Trash2, Download } from "lucide-react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import 'jspdf-autotable';

const SupplierTable = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = async () => {
        try {
            const fetchSupplier = await axios.get(`${import.meta.env.VITE_API_URL}/api/supplier/read`);
            const response = fetchSupplier.data;
            const updatedSupplier = response.supplier.map(promo => {
                if (new Date(promo.expiredAt) < new Date()) {
                    promo.status = 'Inactive';
                    axios.put(`${import.meta.env.VITE_API_URL}/api/supplier/update/${promo._id}`, { status: 'Inactive' })
                    .then(response => {
                        console.log('Supplier status updated:', response);
                    })
                    .catch(error => {
                        console.error('Error updating Supplier status:', error);
                    });
                }
                return promo;
            });
            setData(response);
            setSearchResults(updatedSupplier);
        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (datetimeString) => {
        const date = new Date(datetimeString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    };

    const handleSearch = (e) => {
      e.preventDefault();
      const filtered = data.supplier?.filter(elem => {
          return elem.supplierID.toLowerCase().includes(searchQuery.toLowerCase()) ||
              elem.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              elem.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              elem.address.toLowerCase().includes(searchQuery.toLowerCase()) ;
      });
      setSearchResults(filtered || []);
  };

    const handleDeleteConfirmation = (id) => {
        setDeleteId(id);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/supplier/delete/${deleteId}`);
            setData(prevState => ({
                ...prevState,
                supplier: prevState.supplier.filter(promo => promo._id !== deleteId)
            }));
            setDeleteId(null);
            toast.success('Supplier deleted successfully!');
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

    useEffect(()=>{
      fetchData()
      console.log(searchResults)
    },[])

  return (
    <div className="min-h-screen bg-slate-700 flex flex-col items-center p-10 gap-6">
      <div className="flex justify-end w-full max-w-5xl">
        <input
          type="text"
          placeholder="Search Suppliers"
          className="p-2 pl-4 rounded-md border border-slate-400 w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className='bg-light-blue border-1 border-gray-300 text-white rounded-md w-32 ml-2 hover:bg-blue hover:border-blue transition-all'>Search</button>
      </div>

      <div className="w-full max-w-5xl overflow-x-auto bg-white/30 backdrop-blur-md border border-slate-300 rounded-2xl">
        <table className="w-full border-collapse text-left">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="px-4 py-2">Supplier ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((s) => (
              <tr
                key={s.supplierID}
                className="bg-slate-900/40 backdrop-blur-sm border-b border-slate-300"
              >
                <td className="px-4 py-2">{s.supplierID}</td>
                <td className="px-4 py-2">{s.firstName}</td>
                <td className="px-4 py-2">{s.lastName}</td>
                <td className="px-4 py-2">{s.address}</td>
                <td className="px-4 py-2">{s.contactNo}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => navigate(`/update-supplier/${s._id}`)} className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700">
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={()=> handleDeleteConfirmation(s._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-70">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
            <p className="text-lg font-semibold">
              Are you sure you want to delete this supplier?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
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

export default SupplierTable;
