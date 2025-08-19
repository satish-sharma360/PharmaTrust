import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/prescriptionform');
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1576091187422-7771e8c0b53d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center p-8 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:border-sky-400/50">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg text-sky-400">
            Your Prescription, Managed with Precision
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-medium">
            Streamline your pharmacy operations with our all-in-one system for prescription management, inventory, and delivery.
          </p>
          <button
            onClick={handleClick}
            type="button"
            className="mt-8 bg-sky-500 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:bg-sky-600 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-sky-400">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {/* Card 1: Upload Prescription */}
          <div className="p-6 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-sky-400/50">
            <div className="bg-slate-800 rounded-full p-4 mb-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Upload Prescription</h3>
            <p className="mt-2 text-slate-300">Securely upload a photo or scan of your patient's prescription from anywhere, at any time.</p>
          </div>

          {/* Card 2: Manage Inventory */}
          <div className="p-6 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-sky-400/50">
            <div className="bg-slate-800 rounded-full p-4 mb-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Manage Inventory</h3>
            <p className="mt-2 text-slate-300">Automatically track stock levels and receive alerts to prevent shortages of critical medications.</p>
          </div>

          {/* Card 3: Efficient Delivery */}
          <div className="p-6 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-sky-400/50">
            <div className="bg-slate-800 rounded-full p-4 mb-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2m2-5l2-2m-2-2l2 2m5-5l2-2m-2-2l2 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Efficient Delivery</h3>
            <p className="mt-2 text-slate-300">Assign orders to your fleet of drivers and track their real-time status, ensuring timely deliveries.</p>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="bg-slate-800 py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://img.freepik.com/free-vector/courier-delivered-boxes-businessman_74855-6333.jpg?t=st=1755263126~exp=1755266726~hmac=a6246bd93e428f9f7de09b601737f32d01c455c4d402f5ec9796d9dffab3f169&w=1480"
              alt="Efficient Delivery"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-white leading-tight">
              Revolutionize Your Delivery Process
            </h3>
            <p className="mt-4 text-lg text-slate-300">
              Our system seamlessly integrates with your drivers, providing them with all the information they need to make fast, accurate deliveries. From route optimization to real-time tracking, we help you manage your entire delivery network from one dashboard.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}