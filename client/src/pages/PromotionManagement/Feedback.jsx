import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Feedback = () => {

   const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedback()
  }, []);

  const fetchFeedback = async () => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/feedback/read`);
      if (data && data.success) {
        setFeedback(data.feedback)
        console.log("Fetched feedback:", data.feedback)
      }else{
        console.error("Failed to fetch feedback:", data)
      }
    } catch (error) {
      console.error("Error fetching feedback:", error.message);
    }
  };

  const approvedFeedback = feedback.filter(item => item.status === 'Approved');

  const topRatedFeedback = [...approvedFeedback].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const newestFeedback = [...approvedFeedback].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navigation />

      <div className="max-w-7xl mx-auto p-4 mt-10">
        <h1 className="text-center text-4xl font-bold text-slate-100 mb-8">
          Feedback from our customers
        </h1>

        <div className="flex justify-center mb-10">
          <Link
            to="/feedback-submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-6 py-3"
          >
            Submit Feedback
          </Link>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Top Feedbacks</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {topRatedFeedback.map((item, index) => (
              <div
                key={index}
                className="min-w-[250px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-6 h-6 text-blue-400" />
                  <h3 className="font-bold">{item.name}</h3>
                </div>
                <p className="text-sm mb-3">{item.feedback}</p>
                <span className="font-semibold text-blue-400">Rating: {item.rating}/10</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Recent Feedbacks</h2>
          <div className="flex flex-wrap gap-6">
            {newestFeedback.map((item, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33%-16px)] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-6 h-6 text-blue-400" />
                  <h3 className="font-bold">{item.name}</h3>
                </div>
                <p className="text-sm mb-3">{item.feedback}</p>
                <span className="font-semibold text-blue-400">Rating: {item.rating}/10</span>
              </div>
            ))}
          </div>

          <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">All Feedbacks</h2>
          <div className="flex flex-wrap gap-6">
            {approvedFeedback.map((item, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33%-16px)] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-6 h-6 text-blue-400" />
                  <h3 className="font-bold">{item.name}</h3>
                </div>
                <p className="text-sm mb-3">{item.feedback}</p>
                <span className="font-semibold text-blue-400">Rating: {item.rating}/10</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </div>
  );
}


export default Feedback
