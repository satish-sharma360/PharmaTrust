import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, IdCard, LogIn } from "lucide-react"; // changed Lock → IdCard for NIC
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/userSlice";
import axios from "axios";

const EmployeeLoginForm = () => {
  const [formData, setFormData] = useState({ email: "", NIC: "" });
  const { error } = useSelector((state) => state.user);
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
      dispatch(signInStart());

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/sign-up-emp`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(data);

      if (!data.success) {
        dispatch(signInFailure(data.message));
        return;
      }

      // save only userData in redux
      dispatch(signInSuccess(data.userData));
      navigate("/admin-dashboard");
    } catch (error) {
      dispatch(signInFailure(error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />

      <div className="flex justify-center items-center py-16">
        <div className="w-full max-w-md p-8 rounded shadow-2xl 
                        bg-white/10 backdrop-blur-md border border-white/20">
          <h1 className="text-3xl font-bold text-center mb-6">
            Employee Login
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-400" />
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded bg-slate-800/60 
                           border border-slate-700 focus:outline-none 
                           focus:ring-2 focus:ring-slate-400"
              />
            </div>

            {/* NIC */}
            <div className="relative">
              <IdCard className="absolute left-3 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="NIC"
                id="NIC"
                value={formData.NIC}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded bg-slate-800/60 
                           border border-slate-700 focus:outline-none 
                           focus:ring-2 focus:ring-slate-400"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-3 
                         bg-slate-700 hover:bg-slate-600 rounded 
                         font-semibold transition"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </button>
          </form>

          <div className="flex flex-col gap-2 mt-6 text-sm text-center">
            <p className="text-slate-300">Forgot NIC?</p>
            <p className="text-slate-400 italic">
              Please contact your <span className="text-slate-200">Employee Manager</span>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EmployeeLoginForm;
