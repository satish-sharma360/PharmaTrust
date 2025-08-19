import React, { useEffect, useState } from 'react';
import { Download, Plus, Package, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DelivaryTaskTable from './DelivaryTaskTable';

// Simple dummy data
const initialTasks = [
  { id: 1, orderId: 'ORD-001', customer: 'Alice Johnson', driver: 'John Smith', status: 'Delivered' },
  { id: 2, orderId: 'ORD-002', customer: 'Bob Wilson', driver: 'Maria Garcia', status: 'On the way' },
  { id: 3, orderId: 'ORD-003', customer: 'Carol Davis', driver: 'David Chen', status: 'Order Confirmed' },
  { id: 4, orderId: 'ORD-004', customer: 'Daniel Brown', driver: 'Sarah Miller', status: 'Delivered' },
];

const DeliveryTaskManagement = () => {
  const [taskCount, setTaskCount] = useState(0);
const [deliveredTaskCount, setDeliveredTaskCount] = useState(0);
const [notdeliveredTaskCount, setnotDeliveredTaskCount] = useState(0);

useEffect(() => {
  fetchTasks();
}, []);

const fetchTasks = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/task/read`);

    if (response.status === 200) {
      const tasks = response.data.task;
      setTaskCount(tasks.length);

      const delivered = tasks.filter(
        (task) => task.deliStatus === "Delivered"
      );

      const notDelivered = tasks.filter(
        (task) =>
          task.deliStatus === "Order Confirmed" ||
          task.deliStatus === "On the way"
      );

      setDeliveredTaskCount(delivered.length);
      setnotDeliveredTaskCount(notDelivered.length);
    } else {
      console.error("Failed to fetch tasks:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Delivery Dashboard</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="text-slate-300 text-sm mb-2">Total Tasks</h3>
            <p className="text-3xl font-bold text-blue-400">{taskCount}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="text-slate-300 text-sm mb-2">Delivered</h3>
            <p className="text-3xl font-bold text-green-400">{deliveredTaskCount}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="text-slate-300 text-sm mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-400">{notdeliveredTaskCount}</p>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white/10 flex items-center justify-between backdrop-blur-lg border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Delivery Tasks</h2>
            <Link to="/create-task" className='bg-green-600 text-white backdrop-blur-2xl hover:bg-green-700 font-semibold rounded-lg p-3'>Add New Task</Link>
        </div>
      </div>
      <DelivaryTaskTable/>
    </div>
  );
}

export default DeliveryTaskManagement
