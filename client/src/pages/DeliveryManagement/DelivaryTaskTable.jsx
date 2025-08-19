import React, { useEffect, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { X, Trash2, Check, Edit3 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';


const DUMMY_TASKS = [
  {
    _id: 't1',
    orderId: 'ORD-1001',
    cusName: 'Aarav Mehta',
    cusAddress: '12, Palm Street, Andheri West, Mumbai',
    deliDate: '2025-08-18T10:30:00Z',
    assignDriv: 'Rohit Verma',
    deliStatus: 'Pending',
  },
  {
    _id: 't2',
    orderId: 'ORD-1002',
    cusName: 'Neha Sharma',
    cusAddress: '201, Green Heights, Pune',
    deliDate: '2025-08-16T09:00:00Z',
    assignDriv: 'Kunal Singh',
    deliStatus: 'Out for delivery',
  },
  {
    _id: 't3',
    orderId: 'ORD-1003',
    cusName: 'Ritika Kapoor',
    cusAddress: '44, MG Road, Bengaluru',
    deliDate: '2025-08-15T16:00:00Z',
    assignDriv: 'Priya Nair',
    deliStatus: 'Delivered',
  },
  {
    _id: 't4',
    orderId: 'ORD-1004',
    cusName: 'Siddharth Rao',
    cusAddress: 'Sunview Apartments, Hyderabad',
    deliDate: '2025-08-14T13:00:00Z',
    assignDriv: 'Arjun Pillai',
    deliStatus: 'Cancelled',
  },
  {
    _id: 't5',
    orderId: 'ORD-1005',
    cusName: 'Bhavya Patel',
    cusAddress: 'Old City, Jaipur',
    deliDate: '2025-08-19T11:45:00Z',
    assignDriv: 'Maya Iyer',
    deliStatus: 'Pending',
  },
];

const formatDate = (iso) => {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const statusClasses = (status) => {
  switch (status?.toLowerCase()) {
    case 'delivered':
      return 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30';
    case 'out for delivery':
      return 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30';
    case 'pending':
      return 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/30';
    case 'cancelled':
      return 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30';
    default:
      return 'bg-zinc-500/15 text-zinc-300 ring-1 ring-zinc-400/30';
  }
};

const DelivaryTaskTable = () => {
  const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const fetchTask= await axios.get(`${import.meta.env.VITE_API_URL}/api/task/read`);
            const response = fetchTask.data;
            const updatedTasks = response.task.map(tas => {
                
                return tas;
            });
            setData(response);
            console.log(response)
            setSearchResults(updatedTasks);
        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (datetimeString) => {
      const date = new Date(datetimeString);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return formattedDate;
  };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = data.task?.filter(elem => {
            return (
                elem.orderId.toLowerCase() === searchQuery.toLowerCase() ||
                elem.cusName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                elem.assignDriv.toLowerCase().includes(searchQuery.toLowerCase()) ||
                elem.deliStatus.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });

        if (filtered && filtered.length === 0) {
            toast.error('No records found');
            return;
        }

        setSearchResults(filtered || []);
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteId(id);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/task/delete/${deleteId}`);
            setData(prevState => ({
                ...prevState,
                task: prevState.task.filter(tas => tas._id !== deleteId)
            }));
            setDeleteId(null);
            toast.success('Task deleted successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelDelete = () => {
        setDeleteId(null);
    };

  return (
    <div className="min-h-screen w-full p-6 md:p-10">
      {/* Shell */}
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white/90">Delivery Tasks</h1>
            <p className="text-white/50">Manage, search, and update delivery tasks — dummy data, no backend.</p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-[360px]">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              value={searchQuery}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Order ID, Name, Driver, Status"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-10 py-2.5 text-white placeholder-white/40 outline-none backdrop-blur-md transition focus:border-white/30 focus:bg-white/10"
            />
            {searchQuery && (
              <button
                onClick={handleSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 hover:bg-white/10"
                aria-label="Clear search"
              >
                <X size={16} className="text-white/60" />
              </button>
            )}
          </div>
        </div>

        {/* Card */}
        <div className="rounded overflow-hidden border border-white/10 bg-white/[0.04] shadow-[0_0_1px_0_rgba(255,255,255,0.3),0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {/* Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-white/80">
                  {['Order ID','Customer Name','Customer Address','Delivery Date','Driver','Status','Actions'].map((h) => (
                    <th key={h} className="px-5 py-4 text-sm font-medium uppercase tracking-wide border-b border-white/10">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>


                  {searchResults.map((t) => (
                  <tr key={t._id} className="odd:bg-white/[0.02] even:bg-transparent hover:bg-white/[0.06] transition">
                    <td className="px-5 py-4 text-white/90 border-b border-white/10">{t.orderId}</td>
                    <td className="px-5 py-4 text-white/90 border-b border-white/10">{t.cusName}</td>
                    <td className="px-5 py-4 text-white/80 border-b border-white/10 max-w-[320px] truncate">{t.cusAddress}</td>
                    <td className="px-5 py-4 text-white/90 border-b border-white/10">{formatDate(t.deliDate)}</td>
                    <td className="px-5 py-4 text-white/90 border-b border-white/10">{t.assignDriv}</td>
                    <td className="px-5 py-4 border-b border-white/10">
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${statusClasses(t.deliStatus)}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
                        {t.deliStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Link to={`/update-task/${t._id}`} className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/90 hover:bg-white/10 transition">
                          <Edit3 size={16} /> Update
                        </Link>
                        <button
                          onClick={() => handleDeleteConfirmation(t._id)}
                          className="inline-flex items-center gap-1 rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-1.5 text-sm text-rose-200 hover:bg-rose-400/20 transition"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={cancelDelete} />

          <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-white/[0.06] p-6 text-white shadow-2xl backdrop-blur-2xl">
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-lg font-semibold">Delete task?</h3>
              <button onClick={cancelDelete} className="rounded-full p-1 hover:bg-white/10">
                <X size={18} className="text-white/70" />
              </button>
            </div>
            <p className="mb-6 text-white/70">This action will permanently remove the task from the table.</p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={handleDeleteConfirmed} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition">Cancel</button>
              <button onClick={handleCancelDelete} className="inline-flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/20 px-4 py-2 text-sm text-rose-100 hover:bg-rose-500/30 transition">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default DelivaryTaskTable
