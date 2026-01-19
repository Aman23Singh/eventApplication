import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Search, ArrowRight, Star, Zap, TrendingUp, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All'];

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.venue.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredEvents(filtered);
  }, [searchQuery, selectedCategory, events]);

  const fetchEvents = async () => {
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (response.ok) { 
        setEvents(data.events);
        return;
      } else {
        console.error('Failed to fetch events');
      }
    const mockData = [
      { id: 1, title: 'Summer Music Festival 2025', date: '2025-06-15', venue: 'Central Park, Mumbai', price: 1500, category: 'Music', featured: true, image: 'https://images.unsplash.com/photo-1459749411177-042180ceea73' },
      { id: 2, title: 'Tech Summit India', date: '2025-03-20', venue: 'Convention Center, Bangalore', price: 2500, category: 'Conference', featured: false, image: 'https://images.unsplash.com/photo-1540575861501-7ad058139ad3' },
      { id: 3, title: 'Wedding Expo', date: '2025-04-10', venue: 'Grand Hyatt, Delhi', price: 500, category: 'Exhibition', featured: false, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3' },
    ];
    setEvents(mockData);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-amber-200">
      
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">New Events Just Added</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500">
              Live Experiences
            </span>
          </h1>

          {/* <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-white rounded-[1.8rem] shadow-2xl p-2">
              <Search className="ml-4 text-slate-400 w-6 h-6" />
              <input 
                type="text" 
                placeholder="Search events, cities, or vibes..." 
                className="w-full px-4 py-4 outline-none text-slate-700 font-medium text-lg bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="hidden md:block bg-slate-900 text-white px-8 py-4 rounded-[1.4rem] font-bold hover:bg-black transition-all">
                Search
              </button>
            </div>
          </div> */}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="flex items-center justify-center gap-3 overflow-x-auto no-scrollbar py-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-bold transition-all whitespace-nowrap shadow-sm border ${
                selectedCategory === cat 
                ? 'bg-amber-500 border-amber-500 text-slate-900 scale-105' 
                : 'bg-white border-slate-200 text-slate-500 hover:border-amber-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900">Recommended</h2>
            <p className="text-slate-500 font-medium">Curated based on your interests</p>
          </div>
          <div className="flex items-center gap-2 text-slate-900 font-bold cursor-pointer group">
            <span>View All</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredEvents.map((event, index) => (
            <div 
              key={event._id}
              onClick={() => navigate(`/event/${event._id}`)}
              className={`group cursor-pointer rounded-[2.5rem] overflow-hidden border border-slate-200 bg-white transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 ${
                index === 0 ? 'md:col-span-8 h-[500px]' : 'md:col-span-4 h-[500px]'
              }`}
            >
              <div className="relative h-full w-full">
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  
                  
                  <h3 className="text-3xl font-black text-white mb-4 group-hover:text-amber-400 transition-colors leading-tight">
                    {event.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-6 text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-bold">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-bold">{(event.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-8 right-8 bg-white rounded-2xl p-4 shadow-xl transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Price</p>
                  <p className="text-2xl font-black text-slate-900">₹{event.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;