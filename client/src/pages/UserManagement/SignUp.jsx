import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { User, Mail, Phone, Home, Lock, Download } from 'lucide-react';
// import img01 from '../../assets/Sign-up-2.png';
import jsPDF from 'jspdf';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    address: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dummy users
  const dummyUsers = [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`,formData,{headers:{'Content-Type':'application/json'}})
      console.log(data)
      if (!data.success) {
        setLoading(false)
        setError(error.message)
        return
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Sign Up Information', 20, 20);
    doc.autoTable({
      startY: 30,
      body: Object.entries(formData),
      theme: 'grid',
    });
    doc.save('SignUpInfo.pdf');
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Navigation />
      <div className="p-3 w-auto mx-auto">
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto justify-between mt-14 mb-14 lg:gap-5">
          {/* Image */}
          <img src="https://medshadow.org/wp-content/uploads/2012/11/medicine-scaled.jpeg" alt="" className="object-cover w-full lg:w-2/3 xl:w-1/2" />

          {/* Form */}
          <div className="flex flex-col justify-center lg:w-1/2">
            <h1 className="text-3xl text-center font-semibold my-7 text-slate-800">Sign Up</h1>
            <div className="p-10 bg-white/20 backdrop-blur-md border border-slate-300 rounded-3xl max-w-4xl mx-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Username"
                    className="border p-3 pl-10 rounded-lg w-full bg-slate-50"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 pl-10 rounded-lg w-full bg-slate-50"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    pattern="[0-9]{10}"
                    className="border p-3 pl-10 rounded-lg w-full bg-slate-50"
                    id="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Address"
                    className="border p-3 pl-10 rounded-lg w-full bg-slate-50"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="border p-3 pl-10 rounded-lg w-full bg-slate-50"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <button
                  disabled={loading}
                  className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                  {loading ? 'Loading...' : 'Sign Up'}
                </button>
              </form>

              {error && <p className="text-red-600 mt-2 text-center">{error}</p>}

              <button
                onClick={handleExportPDF}
                className="flex items-center justify-center gap-2 bg-slate-700 text-white p-3 rounded-lg hover:bg-slate-800 mt-4 w-full"
              >
                <Download size={16} /> Export PDF
              </button>
            </div>

            <div className="flex gap-2 mt-6 justify-center lg:justify-start">
              <p>Have an account?</p>
              <Link to="/sign-in">
                <span className="text-slate-700 font-semibold">Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignUp
