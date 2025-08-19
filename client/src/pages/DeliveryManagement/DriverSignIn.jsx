import { useState } from 'react';
import { User, Lock, Truck, CheckCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInDriverFailure, signInDriverStart, signInDriverSuccess } from '../../redux/driverSlice';

const DriverSignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.driver);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInDriverStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/driver/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInDriverFailure(data.message));
        alert(data.message)
        return;
      }
      dispatch(signInDriverSuccess(data));
      navigate('/driver-profile');
    } catch (error) {
      dispatch(signInDriverFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,113,108,0.3),rgba(255,255,255,0))]" />
      
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-600/30 backdrop-blur-sm border border-slate-500/20 mb-4">
            <Truck className="w-8 h-8 text-slate-200" />
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Driver Portal</h1>
          <p className="text-slate-400">Sign in to access your dashboard</p>
        </div>

        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-600/30 rounded p-8 shadow-2xl">
            <div className="space-y-6">
              {/* Driver ID Input */}
              <div className="space-y-2">
                <label htmlFor="driverId" className="text-sm font-medium text-slate-300 block">
                  Driver ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    id="driverId"
                    // value={formData.driverId}
                    onChange={handleChange}
                    placeholder="Enter your driver ID"
                    className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <form onSubmit={handleSubmit} className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-300 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    id="password"
                    // value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    required
                  />
                </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 mt-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-medium rounded transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                Login
              </button>
                </form>
            </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-slate-500 text-xs">
            Need help? Contact fleet management
          </p>
        </div>
      </div>
    </div>
  );
}

export default DriverSignIn
