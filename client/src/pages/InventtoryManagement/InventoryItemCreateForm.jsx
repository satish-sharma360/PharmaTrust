import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  DollarSign,
  Hash,
  Building2,
  Calendar,
  Upload,
  Check,
} from "lucide-react";
import SideBar from "../../components/SideBar";
import toast from "react-hot-toast";
import axios from "axios";

const InventoryItemCreateForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [value, setValue] = useState({
    Mname: "",
    Mprice: "",
    Mquantity: "",
    Msupplier: "",
    type: "Capsule",
    manuAt: "",
    expirAt: "",
    storageCondition: "",
    status: "Active",
  });

  const [file, setFile] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (name === "Mprice" || name === "Mquantity") {
      const numericValue = parseFloat(value);
      if (numericValue < 0 || isNaN(numericValue)) {
        setError("Please enter a valid non-negative value.");
        parsedValue = "";
      } else {
        setError("");
      }
    } else if (name === "status") {
      parsedValue = "Active";
    }

    setValue((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("Mname", value.Mname);
      formData.append("Mprice", value.Mprice);
      formData.append("Mquantity", value.Mquantity);
      formData.append("Msupplier", value.Msupplier);
      formData.append("type", value.type);
      formData.append("manuAt", value.manuAt);
      formData.append("expirAt", value.expirAt);
      formData.append("storageCondition", value.storageCondition);
      formData.append("status", value.status);

      if (file) {
        formData.append("image", file); // ✅ not file[0]
      }

      const addInventory = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/inventory/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(addInventory.data);

      const response = addInventory.data;
      if (response.success) {
        toast.success(response.message, { duration: 2000 });
        setTimeout(() => {
          navigate("/inventory-management");
        }, 1000);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add inventory item.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <SideBar />
      <div className="flex-1">
        {/* Header */}
        <div className="bg-slate-800/40 backdrop-blur-md border-b border-slate-700 flex justify-between px-10 py-6">
          <h1 className="text-3xl font-bold">Add New Inventory Item</h1>
          <div className="flex items-center gap-3">
            <div>
              <p className="font-semibold">Kavindu Dasanayaka</p>
              <p className="text-xs text-slate-400">Inventory Manager</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md rounded shadow-xl p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/10"
          >
            {/* Left side */}
            <div className="flex flex-col gap-4">
              <label className="font-semibold">Medicine Name</label>
              <div className="relative">
                <Package className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  name="Mname"
                  value={value.Mname}
                  onChange={handleChange}
                  placeholder="Enter Medicine Name"
                  className="w-full pl-10 p-3 rounded bg-slate-800/60 border border-slate-700 focus:ring-2 focus:ring-slate-500"
                  required
                />
              </div>

              <label className="font-semibold">Unit Price (Rs.)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="number"
                  name="Mprice"
                  value={value.Mprice}
                  onChange={handleChange}
                  placeholder="Enter Price"
                  className="w-full pl-10 p-3 rounded bg-slate-800/60 border border-slate-700 focus:ring-2 focus:ring-slate-500"
                  required
                />
              </div>
              {error && <p className="text-red-400">{error}</p>}

              <label className="font-semibold">Quantity</label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="number"
                  name="Mquantity"
                  value={value.Mquantity}
                  onChange={handleChange}
                  placeholder="Enter Quantity"
                  className="w-full pl-10 p-3 rounded bg-slate-800/60 border border-slate-700 focus:ring-2 focus:ring-slate-500"
                  required
                />
              </div>

              <label className="font-semibold">Supplier</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  name="Msupplier"
                  value={value.Msupplier}
                  onChange={handleChange}
                  placeholder="Enter Supplier"
                  className="w-full pl-10 p-3 rounded bg-slate-800/60 border border-slate-700 focus:ring-2 focus:ring-slate-500"
                  required
                />
              </div>

              <label className="font-semibold">Storage Condition</label>
              <textarea
                name="storageCondition"
                value={value.storageCondition}
                onChange={handleChange}
                placeholder="Enter Storage Conditions"
                className="w-full p-3 rounded bg-slate-800/60 border border-slate-700 focus:ring-2 focus:ring-slate-500 min-h-[80px]"
              />
            </div>

            {/* Right side */}
            <div className="flex flex-col gap-4">
              <label className="font-semibold">Type</label>
              <select
                name="type"
                value={value.type}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800/60 border border-slate-700 focus:ring-2 focus:ring-slate-500"
              >
                <option value="Capsule">Capsule</option>
                <option value="Tablet">Tablet</option>
                <option value="Liquid">Liquid</option>
                <option value="Other">Other</option>
              </select>

              <label className="font-semibold">Image</label>
              <div className="items-center border p-3 bg-slate-800/60 border-slate-700 rounded">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-sm text-slate-300"
                />
                <Upload className="text-slate-400" />
              </div>
              {file && (
                <img
                  src={file}
                  alt="preview"
                  className="mt-2 w-32 h-32 object-cover rounded border border-slate-700"
                />
              )}

              <label className="font-semibold">Manufacture Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="date"
                  name="manuAt"
                  value={value.manuAt}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 rounded bg-slate-800/60 border border-slate-700 focus:ring-2 focus:ring-slate-500"
                />
              </div>

              <label className="font-semibold">Expiry Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="date"
                  name="expirAt"
                  value={value.expirAt}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 rounded bg-slate-800/60 border border-slate-700 focus:ring-2 focus:ring-slate-500"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Check className="text-green-400" />
                <p className="text-slate-300">Status: Active</p>
              </div>

              <button
                type="submit"
                className="mt-6 py-3 px-4 bg-slate-700 hover:bg-slate-600 rounded font-semibold transition flex justify-center items-center gap-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemCreateForm;
