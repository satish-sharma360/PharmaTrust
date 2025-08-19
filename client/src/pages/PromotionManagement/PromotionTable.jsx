import React, { useState, useEffect } from 'react';
import { Search, Trash2, Edit, Download } from 'lucide-react';
import axios from 'axios';
import {Link} from 'react-router-dom'
// import 'jspdf-autotable';

const PromotionTable = () => {
  const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const fetchPromotion = await axios.get(`${import.meta.env.VITE_API_URL}/api/promotion/read`);
            const response = fetchPromotion.data;
            const updatedPromotions = response.promotion.map(promo => {
                if (new Date(promo.expiredAt) < new Date()) {
                    promo.status = 'Inactive';
                    axios.put(`${import.meta.env.VITE_API_URL}/api/promotion/update/${promo._id}`, { status: 'Inactive' })
                    .then(response => {
                        console.log('Promotion status updated:', response);
                    })
                    .catch(error => {
                        console.error('Error updating promotion status:', error);
                    });
                }
                return promo;
            });
            setData(response);
            setSearchResults(updatedPromotions);
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
        const filtered = data.promotion?.filter(elem => {
            return elem.promotionID.toLowerCase().includes(searchQuery.toLowerCase()) ||
                elem.couponCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                elem.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                elem.status.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setSearchResults(filtered || []);
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteId(id);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/promotion/delete/${deleteId}`);
            setData(prevState => ({
                ...prevState,
                promotion: prevState.promotion.filter(promo => promo._id !== deleteId)
            }));
            setDeleteId(null);
            toast.success('Promotion deleted successfully!');
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
    <div className="px-10 py-5">
      <div className="flex justify-between items-center mb-4">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Promotions"
              className="pl-10 pr-3 py-2 rounded-md border border-slate-300 bg-white/30 backdrop-blur-md focus:outline-none w-56"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16}/>
          </div>
          <button type="submit" className="px-3 py-2 rounded-md bg-slate-600 text-white hover:bg-slate-700">Search</button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-slate-400 bg-white/30 backdrop-blur-md rounded-xl">
          <thead>
            <tr className="bg-slate-600 text-white">
              {['ID','Code','Price','Min Spend','Type','Status','Created At','Expiry','Actions'].map((header,i) => (
                <th key={i} className="px-4 py-2 border border-slate-400">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {searchResults.map((p) => (
              <tr key={p._id} className="hover:bg-slate-100/40">
                <td className="border px-4 py-2">{p.id}</td>
                <td className="border px-4 py-2">{p.couponCode}</td>
                <td className="border px-4 py-2">{p.couponPrice}</td>
                <td className="border px-4 py-2">{p.totalAmount}</td>
                <td className="border px-4 py-2">{p.type}</td>
                <td className="border px-4 py-2">{p.status}</td>
                <td className="border px-4 py-2">{formatDate(p.createdAt)}</td>
                <td className="border px-4 py-2">{formatDate(p.expiredAt)}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <Link to={`/update-promotion/${p._id}`} className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"><Edit size={16}/></Link>
                  <button onClick={() => handleDeleteConfirmation(p.id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl flex flex-col gap-4 w-96">
            <p className="text-lg font-semibold text-center">Are you sure you want to delete this promotion?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleDeleteConfirmed} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
              <button onClick={handleCancelDelete} className="bg-slate-200 text-slate-900 px-4 py-2 rounded-md hover:bg-slate-300">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PromotionTable
