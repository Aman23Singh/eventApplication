import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Ticket, CreditCard, Check, AlertCircle, Clock, ShieldCheck, ArrowLeft, Star, Share2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState({eventId: eventId, seatsBooked: 1 });
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('eventplus_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setEvent(data.event);
    } catch (error) {
      console.error('Failed to fetch event details', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', { 
      day: 'numeric', month: 'long', year: 'numeric' 
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingError('');
    if (!user) {
      setBookingError('Please login to book tickets');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('eventplus_token')}`
        },
        body: JSON.stringify(bookingForm)
      });

      const data = await response.json();

      if (!response.ok) {
        setBookingError(data.message || 'Booking failed. Please try again.');
        return;
      }

    setBookingSuccess(true);
    navigate('/my-bookings');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="h-16 w-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pb-20 overflow-hidden">
      
     
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative h-[500px] w-full">

        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
        
        <div className="absolute top-8 left-0 w-full">
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-white px-5 py-2.5 rounded-2xl hover:bg-white hover:text-slate-950 transition-all font-bold text-sm"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Explore Events</span>
            </button>
            <button className="p-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:bg-white/20 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-16 left-0 w-full">
          <div className="max-w-6xl mx-auto px-6">
            
            <h1 className="text-5xl md:text-7xl font-black text-white max-w-4xl tracking-tighter leading-none mb-6">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Date</span>
                  </div>
                  <p className="text-lg font-bold text-white leading-tight">{formatDate(event.date)}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Time</span>
                  </div>
                  <p className="text-lg font-bold text-white leading-tight">
                    {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
                    
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Venue</span>
                  </div>
                  <p className="text-lg font-bold text-white leading-tight truncate">{event.venue}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white tracking-tight">About this Experience</h3>
                <p className="text-slate-400 leading-relaxed text-lg font-medium">
                  {event.description}
                </p>
              </div>

              <div className="mt-12 flex items-center p-6 bg-white/[0.02] rounded-3xl border border-white/5 group">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mr-4 group-hover:bg-amber-500/20 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
                </div>
               
              </div>
            </div>
          </div>

        
          <div className="lg:col-span-1">
            <div className="sticky top-10 bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-slate-950">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Single Entry</p>
                  <div className="bg-black/10 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-black/5">
                    {event.totalSeats} Total Seats
                  </div>
                  <div className="bg-black/10 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-black/5">
                    {event.availableSeats} Remaining
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">₹{event.price}</span>
                  <span className="text-sm font-bold opacity-80">/ ticket</span>
                </div>
              </div>

              <div className="p-8">
                {bookingSuccess ? (
                  <div className="text-center py-10 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                      <Check className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h4 className="text-2xl font-black text-white tracking-tight">Spot Reserved!</h4>
                    <p className="text-slate-500 mt-2 font-medium">Redirecting to your tickets...</p>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Quantity</label>
                      <div className="flex items-center justify-between bg-white/5 p-2 rounded-2xl border border-white/10">
                        <button 
                          type="button"
                          onClick={() => setBookingForm(prev => ({ seatsBooked: Math.max(1, prev.seatsBooked - 1) }))}
                          className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all font-black text-xl"
                        >–</button>
                        <span className="text-2xl font-black text-white">{bookingForm.quantity}</span>
                        <button 
                          type="button"
                          onClick={() => setBookingForm(prev => ({ eventId: eventId, seatsBooked: Math.min(event.availableSeats, prev.seatsBooked + 1) }))}
                          className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all font-black text-xl"
                        >+</button>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                        <span>Total Payable</span>
                        <span className="text-2xl font-black text-white tracking-tighter">₹{bookingForm.seatsBooked * event.price}</span>
                      </div>
                    </div>

                    {bookingError && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-xs font-bold flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" /> {bookingError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-white text-slate-950 py-5 rounded-[1.5rem] font-black text-lg hover:bg-amber-500 transition-all duration-300 transform active:scale-95 shadow-xl flex items-center justify-center gap-3 group"
                    >
                      <Ticket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span>Book My Spot</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default EventDetails;