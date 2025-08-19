import { useState, useEffect } from "react";
import InventoryTable from "./InventoryTable";
import { Link } from "react-router-dom";
import { Download, PlusCircle } from "lucide-react";
import SideBar from "../../components/SideBar";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable'

const InventoryManagement = () => {
  const [inventorycount, setInventoryCount] = useState(0);
  const [expiredinventoryCount, setExpiredInventoryCount] = useState(0);
  const [tabletcount, setTabletInventoryCount] = useState(0);
  const [capsulecount, setCapsuleInventoryCount] = useState(0);
  const [liquidcount, setLiquidInventoryCount] = useState(0);
  const [othercount, setOtherInventoryCount] = useState(0);
  const [pendinginventoryCount, setpendinginventoryCount] = useState(0);
  const [fullPrice, setfullPrice] = useState(0);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/inventory/read`
      );
      const inventory = res.data.inventory;
      console.log(res.data)

      setInventoryCount(inventory.length);

      // Total price
      const totalPrice = inventory.reduce(
        (acc, item) => acc + item.Mprice * item.Mquantity,
        0
      );
      setfullPrice(Number(totalPrice).toFixed(2));

      // Counts
      const expiredInventory = inventory.filter(
        (item) => item.status === "Expired"
      );
      setExpiredInventoryCount(expiredInventory.length);

      const pendingInventory = inventory.filter(
        (item) => item.status === "Pending to expire"
      );
      setpendinginventoryCount(pendingInventory.length);

      setTabletInventoryCount(
        inventory.filter((item) => item.type === "Tablet").length
      );
      setCapsuleInventoryCount(
        inventory.filter((item) => item.type === "Capsule").length
      );
      setLiquidInventoryCount(
        inventory.filter((item) => item.type === "Liquid").length
      );
      setOtherInventoryCount(
        inventory.filter((item) => item.type === "Other").length
      );
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <SideBar />
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl flex justify-between items-center px-6 py-4 mb-6">
          <h1 className="text-2xl font-bold">Inventory Management Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div>
                <p className="font-semibold">Kavindu Dasanayaka</p>
                <p className="text-xs text-slate-400">Inventory Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <p className="font-medium">Expired Items</p>
            <p className="text-2xl font-bold text-red-400">
              {expiredinventoryCount}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <p className="font-medium">Pending Expire</p>
            <p className="text-2xl font-bold text-yellow-400">
              {pendinginventoryCount}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <p className="font-medium">Total Inventory Value (Rs.)</p>
            <p className="text-2xl font-bold text-green-400">{fullPrice}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <p className="font-medium">Total Items</p>
            <p className="text-2xl font-bold text-blue-400">{inventorycount}</p>
          </div>
        </div>

        {/* Add New Inventory Button */}
        <div className="flex justify-end mb-4">
          <Link to="/create-inventory">
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Add New Inventory
            </button>
          </Link>
        </div>

        {/* Inventory Table */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <InventoryTable/>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
