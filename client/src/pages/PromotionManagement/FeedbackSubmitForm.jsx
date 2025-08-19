import React, { useState } from 'react';
// import { toast } from 'react-hot-toast';
import { Download } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
// import 'jspdf-autotable';

const FeedbackSubmitForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '',
    feedback: '',
    status: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRatingClick = (id) => {
    setFormData({ ...formData, rating: id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/feedback/create`, formData);
        if (data.success) {
            toast.success(data.message, {duration: 4000});
            navigate('/feedback');
        }
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    console.log(formData);
};

  return (
    <div className="bg-slate-200 min-h-screen">
      <Navigation />

      <div className="max-w-4xl mx-auto p-6 mt-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Your Feedback Matters!</h1>
        <p className="text-center text-slate-700 mb-6">
          Thank you for choosing KMP Pharmacy. We value your opinion. Please take a moment to share your feedback.
        </p>
      </div>

      <div className="max-w-3xl mx-auto p-8 bg-white/30 backdrop-blur-md rounded-3xl border border-slate-300 mb-10">
        <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="flex-1 p-2 border border-slate-300 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none"
            />
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="flex-1 p-2 border border-slate-300 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none"
            />
          </div>

          <div>
            <p className="mb-2 font-semibold text-slate-800">
              On a scale of 0 to 10, how likely are you to recommend our service?
            </p>
            <div className="flex flex-wrap gap-2">
              {[...Array(10)].map((_, i) => {
                const val = (i + 1).toString();
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleRatingClick(val)}
                    className={`px-3 py-1 rounded-full border-2 border-slate-400 font-semibold transition 
                      ${formData.rating === val ? 'bg-slate-600 text-white' : 'bg-white/50 text-slate-800 hover:bg-slate-300'}`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>

          <textarea
            id="feedback"
            placeholder="Your feedback..."
            value={formData.feedback}
            onChange={handleChange}
            required
            className="w-full p-3 border border-slate-300 rounded-md bg-white/50 backdrop-blur-sm min-h-[120px] focus:outline-none"
          />

          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default FeedbackSubmitForm
