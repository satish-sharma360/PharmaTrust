import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
import SideBar from '../../components/SideBar';
import { Save } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const InventoryUpdateForm = () => {

  const { id } = useParams();
    const navigate = useNavigate();

    const [inventorydata, setinventorydata] = useState({
        Mname: '',
        Mprice: '',
        Mquantity: '',
        Msupplier: '',
        type: '',
        manuAt: '',
        expirAt: '',
        storageCondition: '',
        status: 'Active'
    });

    useEffect(() => {
        getusingID();
    }, [id]);

    const getusingID = async  ()  =>{

        try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory/getsingleitem/${id}`)
            const inventory = result.data.inventory;
            
            inventory.manuAt = inventory.manuAt.split('T')[0];
            inventory.expirAt = inventory.expirAt.split('T')[0];
            setinventorydata(inventory);
            console.log(inventory);
        } catch (err) {
            console.log(err);
        }
       
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Name:", name);
        console.log("Value:", value);
        setinventorydata(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`${import.meta.env.VITE_API_URL}/api/inventory/update/${id}`, inventorydata)
        .then(() => {
            toast.success('Inventory updated successfully!');
            setTimeout(() => {
                navigate('/inventory-management');
            });
        })
        .catch(error => {
            toast.error('Inventory update failed!');
            console.error('Error updating Inventory:', error);
        });
    };


  return (
    <div className="flex min-h-screen bg-slate-800 text-white">
      <SideBar />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6 text-slate-100">Update Inventory Item</h1>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-4xl border border-white/20">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-10">
            
            <div className="flex flex-col gap-4 flex-1">
              <label>Medicine Name</label>
              <input type="text" name="Mname" value={inventorydata.Mname} onChange={handleChange} className="p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none" />

              <label>Unit Price</label>
              <input type="number" name="Mprice" value={inventorydata.Mprice} onChange={handleChange} className="p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none" />

              <label>Quantity</label>
              <input type="number" name="Mquantity" value={inventorydata.Mquantity} onChange={handleChange} className="p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none" />

              <label>Supplier</label>
              <input type="text" name="Msupplier" value={inventorydata.Msupplier} onChange={handleChange} className="p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none" />

              <label>Storage Condition</label>
              <textarea name="storageCondition" value={inventorydata.storageCondition} onChange={handleChange} className="p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none h-20" />
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <label>Type</label>
              <select name="type" value={inventorydata.type} onChange={handleChange} className="p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none">
                <option>Capsule</option>
                <option>Tablet</option>
                <option>Liquid</option>
                <option>Other</option>
              </select>

              <label>Manufacture Date</label>
              <input type="date" name="manuAt" value={inventorydata.manuAt} onChange={handleChange} className="p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none" />

              <label>Expiration Date</label>
              <input type="date" name="expirAt" value={inventorydata.expirAt} onChange={handleChange} className="p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none" />

              <div className="flex items-center gap-2">
                <label>Available</label>
                <input type="checkbox" checked={inventorydata.status === 'Active'} disabled className="w-5 h-5" />
              </div>

              <button type="submit" className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-md transition">
                <Save className="w-4 h-4"/> Update
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default InventoryUpdateForm
