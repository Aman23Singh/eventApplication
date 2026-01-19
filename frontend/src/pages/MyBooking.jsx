import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Ticket, Check, Download, ArrowLeft, ExternalLink, Hash, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const savedUser = localStorage.getItem('eventplus_user');
    if (savedUser) {
      fetchBookings();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchBookings = async () => {
    setLoading(true);
   
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/my`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('eventplus_token')}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setBookings(data.bookings);
        setLoading(false);
      } else {
        
        navigate('/login');
      }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', { 
      day: 'numeric', month: 'short', year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Ticket className="w-6 h-6 text-amber-500 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden pb-20">
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-24 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-all"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
              Back to Explore
            </button>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">Passes.</span>
            </h1>
          </div>
          <div className="bg-white/5 border border-white/10 p-1 rounded-3xl backdrop-blur-2xl flex items-center">
             <div className="px-6 py-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Active Bookings</p>
                <p className="text-3xl font-black text-white">{bookings.length}</p>
             </div>
             <div className="h-12 w-[1px] bg-white/10 mx-2" />
             <div className="p-4">
                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Check className="text-slate-950 w-6 h-6" />
                </div>
             </div>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] py-32 text-center backdrop-blur-md">
            <Ticket className="w-16 h-16 text-slate-700 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-2">No tickets yet</h2>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto">Your upcoming events and digital passes will appear here.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-white text-slate-950 px-10 py-4 rounded-2xl font-black hover:bg-amber-500 transition-all active:scale-95"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="grid gap-10">
            {bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="group relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row">

              

                  <div className="flex-1 p-8 lg:p-12 relative">
                    
                    <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#020617] rounded-full border-r border-white/10" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-amber-500 mb-2">
                            <Hash className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-widest">{booking._id}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none">
                          {booking.eventId.title}
                        </h3>
                      </div>
                      
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Schedule</p>
                        <div className="flex items-center gap-2 text-white font-bold">
                            <Calendar className="w-4 h-4 text-amber-500" />
                            <span>{formatDate(booking.eventId.date)}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Venue Location</p>
                        <div className="flex items-center gap-2 text-white font-bold">
                            <MapPin className="w-4 h-4 text-amber-500" />
                            <span className="truncate">{booking.eventId.venue}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Admittance</p>
                        <div className="flex items-center gap-2 text-white font-bold">
                            <Ticket className="w-4 h-4 text-amber-500" />
                            <span>{booking.seatsBooked} Person(s)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 gap-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Paid</span>
                        <span className="text-3xl font-black text-white flex items-center">
                            <IndianRupee className="w-5 h-5" />
                            {booking.totalAmount}
                        </span>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;