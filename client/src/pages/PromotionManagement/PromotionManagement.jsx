import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import PromotionTable from "./PromotionTable";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import axios from "axios";
// import 'jspdf-autotable';

const PromotionManagement = () => {
  const [promotionsCount, setPromotionsCount] = useState(0);
  const [activePromotionsCount, setActivePromotionsCount] = useState(0);
  const [inactivePromotionsCount, setInactivePromotionsCount] = useState(0);

  useEffect(() => {
    fetchPromotions();
  }, []);

  // ✅ Using axios for fetching promotions
  const fetchPromotions = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/promotion/read`
      );

      if (data && data.promotion) {
        const promotions = data.promotion;

        setPromotionsCount(promotions.length);

        const activePromotions = promotions.filter(
          (promotion) => promotion.status === "Active"
        );
        const inactivePromotions = promotions.filter(
          (promotion) => promotion.status === "Inactive"
        );

        setActivePromotionsCount(activePromotions.length);
        setInactivePromotionsCount(inactivePromotions.length);
      } else {
        console.error("Failed to fetch promotions:", data);
      }
    } catch (error) {
      console.error("Error fetching promotions:", error.message);
    }
  };

  // ✅ Format date helper
  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  // ✅ Using axios for generating report
  const generateReport = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/promotion/read`
      );

      if (data && data.promotion) {
        const promotions = data.promotion;

        const doc = new jsPDF();


        doc.setFontSize(10);
        doc.text("159/5, lodhi road, new delhi.", 14, 30);
        doc.text("Email: sales@kmp.lk", 14, 35);
        doc.text("Phone: 011-5656994", 14, 40);

        doc.line(14, 45, 196, 45);

        doc.setFontSize(14);
        doc.text("Promotion Management Report", 14, 55);

        const tableHeader = [
          [
            "Promotion ID",
            "Coupon Code",
            "Coupon Price",
            "Total Amount",
            "Type",
            "Created At",
            "Expired At",
            "Status",
          ],
        ];

        const tableData = promotions.map((promotion) => [
          promotion.promotionID,
          promotion.couponCode,
          promotion.couponPrice,
          promotion.totalAmount,
          promotion.type,
          formatDate(promotion.createdAt),
          formatDate(promotion.expiredAt),
          promotion.status,
        ]);

        doc.autoTable({
          startY: 60,
          head: tableHeader,
          body: tableData,
          styles: {
            lineColor: [189, 189, 189],
            lineWidth: 0.1,
          },
          headStyles: {
            lineWidth: 0,
            fillColor: [0, 128, 102],
            textColor: [255, 255, 255],
          },
          alternateRowStyles: {
            fillColor: [240, 240, 240],
          },
        });

        doc.save("Promotion Management Report.pdf");
      }
    } catch (error) {
      console.error("Error generating report:", error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-800">
      <SideBar />
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-slate-800">
            Promotion Dashboard
          </h1>
          <button
            onClick={generateReport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
          >
            <Download size={16} /> Export PDF
          </button>
        </div>

        {/* Summary Cards */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="p-6 bg-white/30 backdrop-blur-md border border-slate-300 rounded-2xl w-60 text-center">
            <p className="text-lg">Total Offers</p>
            <p className="text-3xl font-bold">{promotionsCount}</p>
          </div>
          <div className="p-6 bg-white/30 backdrop-blur-md border border-green-300 rounded-2xl w-60 text-center">
            <p className="text-lg">Active Offers</p>
            <p className="text-3xl font-bold">{activePromotionsCount}</p>
          </div>
          <div className="p-6 bg-white/30 backdrop-blur-md border border-red-300 rounded-2xl w-60 text-center">
            <p className="text-lg">Inactive Offers</p>
            <p className="text-3xl font-bold">{inactivePromotionsCount}</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 mb-6">
          <Link
            to="/create-promotion"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Create New Promotion
          </Link>
          <Link
            to="/feedback-management"
            className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
          >
            Manage Feedbacks
          </Link>
        </div>

        {/* Promotion Table */}
        <div className="p-4 bg-white/30 backdrop-blur-md border border-slate-300 rounded-3xl">
          <PromotionTable />
        </div>
      </div>
    </div>
  );
};

export default PromotionManagement;
