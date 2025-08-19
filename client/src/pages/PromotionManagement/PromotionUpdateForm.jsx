import React, { useState, useEffect } from 'react';
import { Info, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import 'jspdf-autotable';

const PromotionUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [promotionData, setPromotionData] = useState({
    promotionID: "",
    couponCode: "",
    couponPrice: "",
    totalAmount: "",
    type: "",
    createdAt: "",
    expiredAt: "",
    status: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/promotion/get/${id}`)
      .then((result) => {
        const promotion = result.data.promotion;
        promotion.createdAt = promotion.createdAt.split("T")[0];
        promotion.expiredAt = promotion.expiredAt.split("T")[0];
        setPromotionData(promotion);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const validateInputs = () => {
    const validationErrors = {};

    if (!promotionData.couponPrice.trim()) {
      validationErrors.couponPrice = "Coupon Price is required";
    } else if (parseFloat(promotionData.couponPrice) <= 0) {
      validationErrors.couponPrice =
        "Coupon Price must be a positive value";
    }

    if (!promotionData.totalAmount.trim()) {
      validationErrors.totalAmount = "Total Amount is required";
    } else if (parseFloat(promotionData.totalAmount) <= 0) {
      validationErrors.totalAmount =
        "Total Amount must be a positive value";
    }

    if (!promotionData.createdAt.trim()) {
      validationErrors.createdAt = "Created Date is required";
    }

    if (!promotionData.expiredAt.trim()) {
      validationErrors.expiredAt = "Expiry Date is required";
    } else if (
      new Date(promotionData.expiredAt) <= new Date(promotionData.createdAt)
    ) {
      validationErrors.expiredAt =
        "Expiry Date must be after Created Date";
    }

    if (!promotionData.description.trim()) {
      validationErrors.description = "Description is required";
    }

    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.id === "Active" ? "Active" : "Inactive";
    setPromotionData((prevState) => ({
      ...prevState,
      status: newStatus,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((error) =>
        toast.error(error, {
          duration: 6000,
          position: "bottom-right",
        })
      );
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/promotion/update/${id}`,
        promotionData
      );
      toast.success("Promotion updated successfully!");
      setTimeout(() => {
        navigate("/promotion-management");
      }, 1000);
    } catch (error) {
      toast.error("Promotion update failed!");
      console.error("Error updating promotion:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-start p-10">
      <div className="bg-white/30 backdrop-blur-md rounded-3xl border border-slate-300 p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Update Promotion</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label>Promotion ID</label>
            <input type="text" name="promotionID" value={promotionData.promotionID} readOnly className="p-2 rounded-md bg-slate-200 border border-slate-400"/>
            
            <label>Coupon Code</label>
            <input type="text" name="couponCode" value={promotionData.couponCode} readOnly className="p-2 rounded-md bg-slate-200 border border-slate-400"/>
            
            <label>Coupon Price</label>
            <input type="number" name="couponPrice" value={promotionData.couponPrice} onChange={handleChange} className={`p-2 rounded-md border ${errors.couponPrice ? 'border-red-500' : 'border-slate-400'}`}/>
            {errors.couponPrice && <span className="text-red-500 text-sm">{errors.couponPrice}</span>}
            
            <label>Total Amount</label>
            <input type="number" name="totalAmount" value={promotionData.totalAmount} onChange={handleChange} className={`p-2 rounded-md border ${errors.totalAmount ? 'border-red-500' : 'border-slate-400'}`}/>
            {errors.totalAmount && <span className="text-red-500 text-sm">{errors.totalAmount}</span>}

            <label>Description</label>
            <textarea name="description" value={promotionData.description} onChange={handleChange} className={`p-2 rounded-md border ${errors.description ? 'border-red-500' : 'border-slate-400'}`}/>
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
          </div>

          <div className="flex flex-col gap-3">
            <label>Type</label>
            <select name="type" value={promotionData.type} onChange={handleChange} className="p-2 rounded-md border border-slate-400">
              <option value="Seasonal">Seasonal</option>
              <option value="Special">Special</option>
            </select>

            <label>Created Date</label>
            <input type="date" name="createdAt" value={formatDate(promotionData.createdAt)} onChange={handleChange} className="p-2 rounded-md border border-slate-400"/>

            <label>Expiry Date</label>
            <input type="date" name="expiredAt" value={formatDate(promotionData.expiredAt)} onChange={handleChange} className={`p-2 rounded-md border ${errors.expiredAt ? 'border-red-500' : 'border-slate-400'}`}/>
            {errors.expiredAt && <span className="text-red-500 text-sm">{errors.expiredAt}</span>}

            <label>Status</label>
            <div className="flex gap-6">
              <button type="button" onClick={() => handleStatusChange('Active')} className={`px-3 py-1 rounded-md ${promotionData.status==='Active' ? 'bg-green-600 text-white' : 'bg-slate-300'}`}>Active</button>
              <button type="button" onClick={() => handleStatusChange('Inactive')} className={`px-3 py-1 rounded-md ${promotionData.status==='Inactive' ? 'bg-red-600 text-white' : 'bg-slate-300'}`}>Inactive</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}


export default PromotionUpdateForm
