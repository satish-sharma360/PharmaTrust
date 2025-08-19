import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
// import 'jspdf-autotable';

const OrderHistory = () => {

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <div className="backdrop-blur-md bg-slate-800  border border-slate-300 rounded-3xl mx-10 mt-7 p-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-slate-800">My Orders</h1>
        <button
          onClick={generatePDF}
          className="flex items-center gap-2 bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          <Download size={18} /> Export PDF
        </button>
      </div>

      {/* Table */}
      <div className="backdrop-blur-md bg-slate-800  border border-slate-800 rounded-3xl mx-10 my-6 p-6 overflow-x-auto">
        <table className="w-full border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-700 text-white text-left">
              <th className="border border-slate-300 px-4 py-2">Order ID</th>
              <th className="border border-slate-300 px-4 py-2">Date Ordered</th>
              <th className="border border-slate-300 px-4 py-2">Payment Status</th>
              <th className="border border-slate-300 px-4 py-2">Transaction ID</th>
              <th className="border border-slate-300 px-4 py-2">Order Status</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}


export default OrderHistory
