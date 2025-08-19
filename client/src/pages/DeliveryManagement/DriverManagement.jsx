import React, { useState, useEffect } from "react";
import {
  Download,
  Plus,
  Users,
  UserCheck,
  UserX,
  Car,
  Phone,
  Calendar,
} from "lucide-react";
import axios from "axios";
import DriverTable from "./DriverTable";


// StatCard Component
const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
  <div
    className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 ${bgColor}`}
  >
    <div className="flex items-center justify-between mb-4">
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
    <h3 className="text-slate-300 text-sm font-medium mb-2">{title}</h3>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

// Main Dashboard
const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch drivers
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/driver/get-driver`
        );
        if (response.status === 200) {
          setDrivers(response.data.driver);
          console.log(response.data)
        }
      } catch (error) {
        console.error("Error fetching drivers:", error.message);
      }
    };
    fetchDrivers();
  }, []);

  // Stats from backend data
  const totalDrivers = drivers.length;
  const availableDrivers = drivers.filter(
    (d) => d.availabilty === "Available" && d.licenseValidity === "Valid"
  ).length;
  const unavailableDrivers = drivers.filter(
    (d) => d.availabilty === "Unavailable" || d.licenseValidity === "Expired"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative z-10 p-6 space-y-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Driver Management Dashboard
              </h1>
              <p className="text-slate-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Drivers"
            value={totalDrivers}
            icon={Users}
            color="text-blue-400"
            bgColor="bg-blue-500/5"
          />
          <StatCard
            title="Available Drivers"
            value={availableDrivers}
            icon={UserCheck}
            color="text-emerald-400"
            bgColor="bg-emerald-500/5"
          />
          <StatCard
            title="Unavailable Drivers"
            value={unavailableDrivers}
            icon={UserX}
            color="text-red-400"
            bgColor="bg-red-500/5"
          />
        </div>

        {/* Table */}
        <DriverTable />
      </div>
    </div>
  );
};

export default DriverManagement;
