import React, { useState } from "react";
// import { toast } from 'react-hot-toast';
import { Download } from "lucide-react";
import SideBar from "../../components/SideBar";
import jsPDF from "jspdf";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import 'jspdf-autotable';

const PromotionCreateForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    promotionID: "",
    couponCode: "",
    couponPrice: "",
    totalAmount: "",
    type: "Seasonal",
    createdAt: "",
    expiredAt: "",
    status: "Active",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? "Active" : "Inactive") : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const checkUniquePromotionID = async (promotionID) => {
    try {
      const {data} = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/promotion/check-unique-id`,
        {
          params: { promotionID },
        }
      );
      console.log(data)
      return data.exists;
    } catch (error) {
      console.error("Error checking promotion ID:", error);
      return false;
    }
  };

  const checkUniqueCouponCode = async (couponCode) => {
    try {
      const {data} = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/promotion/check-unique-code`,
        {
          params: { couponCode },
        }
      );
      return data.exists;
    } catch (error) {
      console.error("Error checking coupon code:", error);
      return false;
    }
  };

  const validateInputs = async (values) => {
    const validationErrors = {};

    const promotionIDRegex = /^P\d{3}$/;

    if (!values.promotionID.trim()) {
      validationErrors.promotionID = "Promotion ID is required";
    } else if (!promotionIDRegex.test(values.promotionID.trim())) {
      validationErrors.promotionID =
        'Promotion ID must be in the format "P001"';
    } else {
      const exists = await checkUniquePromotionID(values.promotionID);
      if (exists) {
        validationErrors.promotionID = "Promotion ID already exists";
      }
    }

    if (!values.couponCode.trim()) {
      validationErrors.couponCode = "Coupon Code is required";
    } else {
      const exists = await checkUniqueCouponCode(values.couponCode);
      if (exists) {
        validationErrors.couponCode = "Coupon Code already exists";
      }
    }

    if (!values.couponPrice.trim()) {
      validationErrors.couponPrice = "Coupon Price is required";
    } else if (parseFloat(values.couponPrice) <= 0) {
      validationErrors.couponPrice = "Coupon Price must be a positive value";
    }

    if (!values.totalAmount.trim()) {
      validationErrors.totalAmount = "Total Amount is required";
    } else if (parseFloat(values.totalAmount) <= 0) {
      validationErrors.totalAmount = "Total Amount must be a positive value";
    }

    if (!values.createdAt.trim()) {
      validationErrors.createdAt = "Created Date is required";
    }

    if (!values.expiredAt.trim()) {
      validationErrors.expiredAt = "Expiry Date is required";
    }

    if (new Date(values.expiredAt) <= new Date(values.createdAt)) {
      validationErrors.expiredAt = "Expiry Date must be after Created Date";
    }

    if (!values.description.trim()) {
      validationErrors.description = "Description is required";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting...", value);

    const validationErrors = await validateInputs(value);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((error) =>
        toast.error(error, { duration: 6000, position: "bottom-right" })
      );
      return;
    }

    try {
      const {data} = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/promotion/create`,
        value
      );
      if (data.success) {
        toast.success("Promotion created successfully!", { duration: 4000 });
        setTimeout(() => {
          navigate("/promotion-management");
        }, 1000);
      } else {
        toast.error("Failed to create promotion.");
      }
    } catch (error) {
      console.error("Error creating promotion:", error);
      toast.error("Error creating promotion. Please try again.");
    }
  };

  return (
    <div className="flex bg-slate-200 min-h-screen">
      <SideBar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-slate-800">
            Add New Promotion
          </h1>
        </div>

        <div className="p-8 bg-white/30 backdrop-blur-md rounded-3xl border border-slate-300 max-w-4xl mx-auto">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="promotionID"
                placeholder="Promotion ID"
                value={value.promotionID}
                onChange={handleChange}
                className="p-2 border border-slate-300 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none"
                required
              />
              <input
                type="text"
                name="couponCode"
                placeholder="Coupon Code"
                value={value.couponCode}
                onChange={handleChange}
                className="p-2 border border-slate-300 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none"
                required
              />
              <input
                type="number"
                name="couponPrice"
                placeholder="Coupon Price"
                value={value.couponPrice}
                onChange={handleChange}
                className="p-2 border border-slate-300 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none"
                required
              />
              <input
                type="number"
                name="totalAmount"
                placeholder="Total Amount"
                value={value.totalAmount}
                onChange={handleChange}
                className="p-2 border border-slate-300 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none"
                required
              />
              <input
                type="date"
                name="createdAt"
                value={value.createdAt}
                onChange={handleChange}
                className="p-2 border border-slate-300 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none"
                required
              />
              <input
                type="date"
                name="expiredAt"
                value={value.expiredAt}
                onChange={handleChange}
                className="p-2 border border-slate-300 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none"
                required
              />
              <select
                name="type"
                value={value.type}
                onChange={handleChange}
                className="p-2 border border-slate-300 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none"
              >
                <option value="Seasonal">Seasonal</option>
                <option value="Special">Special</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name ='status'
                  checked={value.status === "Active"}
                  onChange={handleChange}
                  className="w-5"
                />
                <span>Status Active</span>
              </div>
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={value.description}
              onChange={handleChange}
              className="p-3 border border-slate-300 rounded-md bg-white/50 backdrop-blur-sm min-h-[100px] focus:outline-none"
              required
            />

            <button
              type="submit"
              className="px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition"
            >
              Submit Promotion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PromotionCreateForm;
