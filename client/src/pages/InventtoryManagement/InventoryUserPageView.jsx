import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import MedicineItem from '../../components/MedicineItem';
import { Search, Calendar } from 'lucide-react';
import axios from 'axios';


const InventoryUserPageView = () => {
  
  const [userview, setUserview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      const filtered = userview.filter((elem) => {
        const nameMatch = elem.Mname.toLowerCase().includes(searchQuery.toLowerCase());
        const priceMatch = elem.Mprice.toString().includes(searchQuery);
        const supplierMatch = elem.Msupplier.toLowerCase().includes(searchQuery.toLowerCase());

        return nameMatch || priceMatch || supplierMatch;
      });

      if (filtered.length === 0) {
        setNoResults(true);
        console.log(searchQuery);
      } else {
        setNoResults(false);
      }

      setSearchResults(filtered);
    } else {
      setSearchResults(userview);
      setNoResults(false);
    }
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory/read`);
      setUserview(data.inventory);
      setSearchResults(data.inventory);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navigation />

      <div className="p-6">
        <h1 className='text-4xl font-bold text-slate-100 flex items-center gap-2 justify-center mb-6'>
          <Calendar /> View Available Items
        </h1>

        <form className='flex justify-end mb-6' onSubmit={handleSearch}>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search for medications'
              className='bg-white/20 backdrop-blur-md border border-white/30 text-slate-200 rounded-md w-56 p-2 pl-10 focus:outline-none placeholder:text-slate-300'
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <Search className='absolute top-1/2 left-3 -translate-y-1/2 text-slate-300 w-4 h-4' />
          </div>
          <button type='submit' className='ml-2 bg-slate-700 border border-slate-600 hover:bg-slate-600 hover:border-slate-500 text-white rounded-md w-32 transition-all'>
            Search
          </button>
        </form>

        {noResults ? (
          <div className="p-7 flex justify-center text-center">
            <p className='text-red-400 font-bold text-lg'>
              Sorry, we don't have that medicine item.<br />
              <span className='text-green-400 uppercase'>Stay tuned for updates!</span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((item) => (
              <div key={item._id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 transition">
                <MedicineItem item={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default InventoryUserPageView
