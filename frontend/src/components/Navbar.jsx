import React, { useState, useEffect } from 'react';
import { Award, Home, Ticket, LogIn, UserPlus, LogOut, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('eventplus_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('eventplus_user');
    localStorage.removeItem('eventplus_token');
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Event</h1>
              <p className="text-xs text-slate-600">Mini Event Booking Platform</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${
                    isActive('/') ? 'bg-amber-50 text-amber-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>

                <button
                  onClick={() => navigate('/my-bookings')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${
                    isActive('/my-bookings')
                      ? 'bg-amber-50 text-amber-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Ticket className="w-4 h-4" />
                  <span>My Bookings</span>
                </button>

                <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    isActive('/') ? 'bg-amber-50 text-amber-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Home
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>

                <button
                  onClick={() => navigate('/register')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-lg font-semibold"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => navigate('/')} className="block w-full text-left px-4 py-2">
              Home
            </button>

            {user && (
              <button
                onClick={() => navigate('/my-bookings')}
                className="block w-full text-left px-4 py-2"
              >
                My Bookings
              </button>
            )}

            {!user ? (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="block w-full text-left px-4 py-2"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="block w-full text-left px-4 py-2 font-semibold text-amber-600"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
