import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function InventoryTable() {
  const [data, setData] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [deleteId, setDeleteId] = useState(null);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const fetchInventory = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/inventory/read`
    );
    const response = fetchInventory.data;
    console.log(response);

    const updatedInventory = await Promise.all(
      response.inventory.map(async (item) => {
        const currentDate = new Date();
        const expirationDate = new Date(item.expirAt);

        if (
          expirationDate <
            new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000) &&
          expirationDate > currentDate
        ) {
          item.status = 'Pending to expire';
        } else if (expirationDate > currentDate) {
          item.status = 'Active';
        } else {
          item.status = 'Expired';
        }

        try {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/api/inventory/update/${item._id}`,
            { status: item.status }
          );
          console.log(`Inventory Item is ${item.status}!`);
        } catch (error) {
          console.error(
            `Error updating Inventory status: ${item.status}`,
            error
          );
        }

        return item;
      })
    );

    setData(response);
    setSearchResults(updatedInventory);
  } catch (error) {
    console.error('Error fetching inventory data:', error);
  }
};

const formatDate = (datetimeString) => {
  const date = new Date(datetimeString);
  console.log(date);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;
  return formattedDate;
};

const handleSearch = (e) => {
  e.preventDefault();
  const filtered = data?.inventory?.filter((elem) => {
    const nameMatch = elem.Mname.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = elem.status.toLowerCase().includes(searchQuery.toLowerCase());
    const priceMatch = elem.Mprice.toString().includes(searchQuery);
    const supplierMatch = elem.Msupplier.toLowerCase().includes(searchQuery.toLowerCase());
    const typeMatch = elem.type.toLowerCase().includes(searchQuery.toLowerCase());
    const quantityMatch = elem.Mquantity.toString().includes(searchQuery);

    return (
      nameMatch ||
      priceMatch ||
      supplierMatch ||
      typeMatch ||
      quantityMatch ||
      statusMatch
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
      `${import.meta.env.VITE_API_URL}/api/inventory/delete/${deleteId}`
    );
    setData((prevState) => ({
      ...prevState,
      inventory: prevState.inventory.filter((item) => item._id !== deleteId),
    }));
    setDeleteId(null);
    toast.success('Inventory deleted successfully!');
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
    <div className="p-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex justify-end mb-4 gap-2 rounded">
        <div className="relative rounded">
          <input
            type="text"
            placeholder="Search"
            className="bg-white/20 text-white border border-slate-500 rounded-md pl-10 pr-4 py-2 focus:outline-none w-56 placeholder-slate-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-300 w-4 h-4" />
        </div>
        <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md text-white">Search</button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-slate-500 rounded-lg text-left text-white">
          <thead>
            <tr className="bg-slate-700">
              <th className="px-4 py-2 border border-slate-600">Medicine Name</th>
              <th className="px-4 py-2 border border-slate-600">Unit Price(Rs.)</th>
              <th className="px-4 py-2 border border-slate-600">Quantity</th>
              <th className="px-4 py-2 border border-slate-600">Supplier</th>
              <th className="px-4 py-2 border border-slate-600">Manu Date</th>
              <th className="px-4 py-2 border border-slate-600">Expir Date</th>
              <th className="px-4 py-2 border border-slate-600">Storage Condition</th>
              <th className="px-4 py-2 border border-slate-600">Type</th>
              <th className="px-4 py-2 border border-slate-600">Status</th>
              <th className="px-4 py-2 border border-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((item) => (
              <tr key={item._id} className="bg-white/10 hover:bg-white/20 transition">
                <td className="px-4 py-2 border border-slate-600">{item.Mname}</td>
                <td className="px-4 py-2 border border-slate-600">{item.Mprice}</td>
                <td className="px-4 py-2 border border-slate-600">{item.Mquantity}</td>
                <td className="px-4 py-2 border border-slate-600">{item.Msupplier}</td>
                <td className="px-4 py-2 border border-slate-600">{formatDate(item.manuAt)}</td>
                <td className="px-4 py-2 border border-slate-600">{formatDate(item.expirAt)}</td>
                <td className="px-4 py-2 border border-slate-600">{item.storageCondition}</td>
                <td className="px-4 py-2 border border-slate-600">{item.type}</td>
                <td className={`px-4 py-2 border border-slate-600 ${item.status === 'Active' ? 'text-green-400' : item.status === 'Pending to expire' ? 'text-yellow-400' : 'text-red-400'}`}>
                  {item.status}
                </td>
                <td className="px-4 py-2 border border-slate-600 flex gap-2">
                  <Link to={`/update-inventory/${item._id}`} className="bg-green-600 px-2 py-1 rounded hover:bg-green-700 flex items-center gap-1">
                    <Edit2 className="w-4 h-4"/> Update
                  </Link>
                  <button onClick={() => handleDeleteConfirmation(item._id)} className="bg-red-600 px-2 py-1 rounded hover:bg-red-700 flex items-center gap-1">
                    <Trash2 className="w-4 h-4"/> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-70">
          <div className="bg-white rounded-lg p-6 text-slate-900 w-96">
            <p className="mb-4 font-semibold">Are you sure you want to delete this item?</p>
            <div className="flex justify-end gap-2">
              <button onClick={handleDeleteConfirmed} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white">Delete</button>
              <button onClick={handleCancelDelete} className="bg-slate-200 px-4 py-2 rounded hover:bg-slate-300">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryTable;