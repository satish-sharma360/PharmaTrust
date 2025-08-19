import { useState, useEffect } from 'react';
import { 
  User, 
  Phone, 
  Car, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Save, 
  Eye, 
  EyeOff,
  Calendar,
  Hash,
  Lock
} from 'lucide-react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const DriverUpdateForm = () => {
  const { id } = useParams();
    const navigate = useNavigate();

    const [driverData, setDriverData] = useState({
        driverId:'',
        driverName: '',
        driverLicense: '',
        vehicleModel: '',
        availabilty: '',
        contactNo: '',
        vehicleLicense: '',
        licenseValidity: '',
        password:''
        
    });

    useEffect(() => {
      getdriverByID();
  }, [id]);

  const getdriverByID = async () =>{

    try{
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/driver/get-driver/${id}`)
      const driver = result.data.driver;
        setDriverData(driver);

        console.log(driver);
     
    }catch(error) {
      console.log(error);
    }

  }
  
  const [errors, setErrors] = useState({
    driverId:'',
    driverLicense: '',
    contactNo: '',
    password:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let error = '';

    if (name === 'contactNo' && value.charAt(0) === '0') {
        error = 'Enter the contact number without initial zero';
      } else if (name === 'driverLicense' && value.length !== 8) {
        error = 'Driver license should be 8 digits long';
      }else if (name === 'password' && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)) {
        error = 'Password should contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long';
      }
  

    setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
    })); 

    setDriverData(prevState => ({
        ...prevState,
        [name]: value
    }));
    
};

  const handleValidityChange = (e) => {
    const { id } = e.target;
    const newValidity = id === 'Valid' ? 'Valid' : 'Expired';
    setDriverData(prevState => ({
        ...prevState,
        licenseValidity: newValidity
    }));
};


const handleSubmit = (e) => {
  e.preventDefault();

  const fieldErrors = Object.entries(errors).filter(([, error]) => error !== '');

    if (fieldErrors.length > 0) {

    fieldErrors.forEach(([, error]) => {
      toast.error(error);
    });
    return;
   
}

  axios.put(`${import.meta.env.VITE_API_URL}/api/driver/update-driver/${id}`, driverData)
  .then(() => {
      toast.success('Driver updated successfully!');
      setTimeout(() => {
          navigate('/driver-management');
      },2000);
  })
  .catch(error => {
      toast.error('Driver update failed!');
      console.error('Error updating driver:', error);
  });
};

  const vehicleOptions = ['Bike', 'Threewheel', 'Car', 'Van'];
  const availabilityOptions = ['Available', 'Unavailable'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,113,108,0.3),rgba(255,255,255,0))]" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-600/30 rounded p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">Update Driver</h1>
              <p className="text-slate-400">Modify driver information and credentials</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200">Fleet Manager</h3>
                <p className="text-sm text-slate-400">System Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-slate-800/40 border border-slate-600/30 rounded p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Driver ID */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Hash className="inline w-4 h-4 mr-2" />
                  Driver ID
                </label>
                <input
                  type="text"
                  name="driverId"
                  value={driverData.driverId}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded text-slate-400 placeholder-slate-500 cursor-not-allowed backdrop-blur-sm"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="driverName"
                  value={driverData.driverName}
                  onChange={handleChange}
                  placeholder="Enter driver name"
                  maxLength="100"
                  minLength="10"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
              </div>

              {/* Driver License */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Shield className="inline w-4 h-4 mr-2" />
                  Driver License
                </label>
                <input
                  type="text"
                  name="driverLicense"
                  value={driverData.driverLicense}
                  onChange={handleChange}
                  placeholder="Enter driver license card number"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
                {errors.driverLicense && (
                  <p className="text-red-400 text-sm mt-1">{errors.driverLicense}</p>
                )}
              </div>

              {/* Vehicle Model and Availability */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Car className="inline w-4 h-4 mr-2" />
                    Vehicle Model
                  </label>
                  <select
                    name="vehicleModel"
                    value={driverData.vehicleModel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  >
                    {vehicleOptions.map(option => (
                      <option key={option} value={option} className="bg-slate-800 text-slate-200">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Availability
                  </label>
                  <select
                    name="availabilty"
                    value={driverData.availabilty}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  >
                    {availabilityOptions.map(option => (
                      <option key={option} value={option} className="bg-slate-800 text-slate-200">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* License Validity */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  License Validity
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleValidityChange('Valid')}
                    className={`flex items-center gap-2 px-4 py-3 rounded border transition-all duration-200 ${
                      driverData.licenseValidity === 'Valid'
                        ? 'bg-green-600/20 border-green-500/50 text-green-300'
                        : 'bg-slate-700/30 border-slate-600/50 text-slate-400 hover:bg-slate-700/50'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Valid
                  </button>
                  <button
                    type="button"
                    onClick={handleValidityChange}
                    className={`flex items-center gap-2 px-4 py-3 rounded border transition-all duration-200 ${
                      driverData.licenseValidity === 'Expired'
                        ? 'bg-red-600/20 border-red-500/50 text-red-300'
                        : 'bg-slate-700/30 border-slate-600/50 text-slate-400 hover:bg-slate-700/50'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    Expired
                  </button>
                </div>
                <p className="text-orange-400 text-xs mt-2">
                  If either driver license or vehicle license expired, choose validity as expired
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Phone className="inline w-4 h-4 mr-2" />
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNo"
                  value={driverData.contactNo}
                  onChange={handleChange}
                  placeholder="Enter the number without the initial zero"
                  pattern="[0-9]{9}"
                  maxLength="9"
                  minLength="9"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
                {errors.contactNo && (
                  <p className="text-red-400 text-sm mt-1">{errors.contactNo}</p>
                )}
              </div>

              {/* Vehicle License */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Car className="inline w-4 h-4 mr-2" />
                  Vehicle License
                </label>
                <input
                  type="text"
                  name="vehicleLicense"
                  value={driverData.vehicleLicense}
                  onChange={handleChange}
                  placeholder="Enter vehicle license number"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Lock className="inline w-4 h-4 mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type= "password"
                    name="password"
                    value={driverData.password}
                    onChange={handleChange}
                    placeholder="Enter the login password"
                    required
                    className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600/50 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                
                className="w-full py-4 px-6 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-medium rounded transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                  <div className="flex items-center justify-center">
                    <Save className="w-5 h-5 mr-2" />
                    Update Driver
                  </div>
              </button>
            </div>
          </div>
        </form>

        {/* Toast Notification */}
        {/* {showToast.show && (
          <div className="fixed top-4 right-4 z-50">
            <div className={`backdrop-blur-xl border rounded p-4 shadow-2xl ${
              showToast.type === 'success' 
                ? 'bg-green-800/90 border-green-600/50 text-green-100' 
                : 'bg-red-800/90 border-red-600/50 text-red-100'
            }`}>
              <div className="flex items-center">
                {showToast.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 mr-2" />
                )}
                {showToast.message}
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default DriverUpdateForm
