// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const dummyChannels = [
  { id: 1, name: "general", icon: "💼", members: 128, type: "communication" },
  { id: 2, name: "announcements", icon: "📢", members: 128, type: "communication" },
  { id: 3, name: "development", icon: "⚡", members: 89, type: "development" },
  { id: 4, name: "marketing", icon: "📈", members: 67, type: "business" },
  { id: 5, name: "sales", icon: "💰", members: 145, type: "business" },
  { id: 6, name: "hr", icon: "👥", members: 23, type: "business" },
  { id: 7, name: "finance", icon: "📊", members: 34, type: "business" },
  { id: 8, name: "support", icon: "🆘", members: 56, type: "business" },
];

const dummyServers = [
  { id: 1, name: "Enterprise Hub", icon: "🏢", active: true },
  { id: 2, name: "Development Team", icon: "💻", active: false },
  { id: 3, name: "Marketing Team", icon: "📢", active: false },
];

// const businessFeatures = [
//   { id: 'dashboard', name: 'Business Dashboard', icon: '📊', path: '/dashboard', type: 'ai-feature' },
//   { id: 'tasks', name: 'Task Management', icon: '📋', path: '/tasks', type: 'integration-feature' },
//   { id: 'calendar', name: 'Team Calendar', icon: '📅', path: '/calendar', type: 'integration-feature' },
//   { id: 'analytics', name: 'Analytics', icon: '📈', path: '/analytics', type: 'ai-feature' },
// ];

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-72'} transition-all duration-300 ease-in-out h-screen flex flex-col sidebar-gradient`}>


      {/* Business Features Section */}
      {/* <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-bold gradient-text">Business Tools</h2>
          )}
        </div>

        <div className="space-y-2">
          {businessFeatures.map((feature) => {
            const isActive = location.pathname === feature.path;
            return (
              <Link
                key={feature.id}
                to={feature.path}
                className={`group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/30 to-indigo-500/30 border border-blue-400/50 shadow-lg shadow-blue-500/25' 
                    : 'hover:bg-white/10 hover:scale-105'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <span className="text-lg">{feature.icon}</span>
                {!isCollapsed && (
                  <>
                    <div className="flex-1">
                      <div className="font-medium text-white">{feature.name}</div>
                      <div className="text-xs text-white/60">Business feature</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-blue-400 shadow-lg shadow-blue-400/50' : 'bg-white/40'
                    }`}></div>
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </div> */}

      {/* Divider */}
      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Channels Section */}
      <div className="flex-1 p-4 space-y-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-bold text-white">Communication</h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        <div className="space-y-2">
          {dummyChannels.map((channel) => {
            const isActive = location.pathname === `/channel/${channel.id}`;
            return (
              <Link
                key={channel.id}
                to={`/channel/${channel.id}`}
                className={`group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/30 to-indigo-500/30 border border-blue-400/50 shadow-lg shadow-blue-500/25' 
                    : 'hover:bg-gradient-to-r hover:from-slate-600/50 hover:to-slate-700/50 hover:border-slate-500/30'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <span className="text-lg">{channel.icon}</span>
                {!isCollapsed && (
                  <>
                    <div className="flex-1">
                      <div className="font-medium text-white">#{channel.name}</div>
                      <div className="text-xs text-white/60">{channel.members} members</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-slate-400'
                    }`}></div>
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
            U
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <div className="font-medium text-white">User</div>
              <div className="text-xs text-green-400 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Online
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
