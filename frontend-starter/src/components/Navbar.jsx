// src/components/Navbar.jsx
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    document.documentElement.className = theme;
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <nav className="relative bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-4">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10"></div>
      
      <div className="relative flex justify-between items-center">
        {/* Left Side - Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/25">
              D
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Discord Clone</h1>
              <p className="text-xs text-white/60">Next Generation Chat</p>
            </div>
          </div>
          
          {/* Server Status */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-lg bg-green-500/20 border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-300 font-medium">All Systems Operational</span>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search messages, channels, and users..."
              className="w-full px-4 py-2 pl-10 rounded-xl glass-input text-sm focus:ring-2 focus:ring-purple-400/50"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
              🔍
            </div>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-3">
          {/* Time and Date */}
          <div className="hidden sm:flex flex-col items-end text-right">
            <div className="text-sm font-medium text-white">{formatTime(currentTime)}</div>
            <div className="text-xs text-white/60">{formatDate(currentTime)}</div>
          </div>

          {/* Notifications */}
          <button className="relative w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
            🔔
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black/20"></div>
          </button>

          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
              <span className="text-white font-medium hidden sm:block">User</span>
              <svg className="w-4 h-4 text-white/60 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-12 w-48 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="p-2 space-y-1">
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white transition-colors duration-200">
                  👤 Profile Settings
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white transition-colors duration-200">
                  ⚙️ Preferences
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white transition-colors duration-200">
                  🎨 Appearance
                </button>
                <div className="border-t border-white/10 my-1"></div>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white transition-colors duration-200">
                  🚪 Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Bottom Border Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </nav>
  );
}
