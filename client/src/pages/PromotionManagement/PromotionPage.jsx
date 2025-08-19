import React, { useState, useEffect } from 'react';
import { Info, Download, CloudHail } from 'lucide-react';
import jsPDF from 'jspdf';
import axios from 'axios';
// import 'jspdf-autotable';

const PromotionPage = () => {
 const [promotions, setPromotions] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/promotion/read`);

    const activePromotions = response.data.promotion.filter(
      (promotion) => new Date(promotion.expiredAt) > new Date()
    );

    setPromotions(activePromotions); // ✅ use activePromotions, not promotions
    console.log("Fetched promotions:", response.data.promotion);
    console.log("Active promotions:", activePromotions);
    console.log(response.data)

  } catch (error) {
    console.error("Error fetching promotions:", error);
  }
};

  const formatDate = (datetimeString) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(datetimeString);
    return `${date.getDate().toString().padStart(2, "0")} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const togglePopup = (promotion) => {
    setSelectedPromotion(promotion);
    setPopupVisible(!popupVisible);
  };

  return (
    <div className="p-10 bg-slate-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-slate-800">Discounts & Offers</h1>
      
      <div className="flex justify-end mb-6">
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {promotions.map(p => (
          <div key={p.id} className="w-72 bg-white/30 backdrop-blur-md rounded-xl border border-slate-300 p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-slate-800">RS {p.couponPrice} Off</h2>
            <p className="text-slate-700 font-medium">Use Code: <span className="font-bold">{p.couponCode}</span></p>
            <p className="text-slate-600 text-sm">Min Spend: RS {p.totalAmount}</p>
            <p className="text-slate-600 text-sm">Type: {p.type}</p>
            <p className="text-slate-600 text-sm">Valid Till: {formatDate(p.expiredAt)}</p>
            <p className={`text-sm font-semibold ${p.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>Status: {p.status}</p>
          </div>
        ))}
      </div>

      {popupVisible && selectedPromotion &&(
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl w-96 flex flex-col gap-4">
            <p className="text-slate-800 text-center">{selectedPromotion.description}</p>
            <button onClick={() => togglePopup(null)} className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800">Close</button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-6 justify-center">
        {promotions.map((promotion, index) => (
              promotion.type === 'Special' && (
                <div key={index} className='flex justify-center items-center'>
                  <div className='bg-white rounded-lg border-2 border-blue flex w-max'>
                    <div className='bg-blue w-max p-2'>
                      <div className='border border-white w-max h-full p-3 flex flex-col items-center justify-center'>
                        <h1 className='text-white text-3xl font-bold'>RS {promotion.couponPrice}</h1>
                        <h1 className='text-white text-2xl'>Off</h1>
                        <button className='bg-white text-blue font-semibold p-1 px-3 rounded-md mt-3' onClick={() => togglePopup(promotion)}>View Details</button>
                      </div>
                    </div>
                    <div className='p-6 px-8'>
                      <h1 className='font-bold'>WITH MIN SPEND RS {promotion.totalAmount}</h1>
                      <h1 className='text-blue text-2xl font-bold mt-2 mb-2'>USE CODE: {promotion.couponCode}</h1>
                      <h2 className='text-sm'>VALID TILL: {formatDate(promotion.expiredAt)}</h2>
                      <h2 className='text-sm'>*T&C Applied</h2>
                    </div>
                  </div>
                </div>
              )
            ))}
      </div>
    </div>
  );
}


export default PromotionPage
