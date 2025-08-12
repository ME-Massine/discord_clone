// src/components/Message.jsx
import { useState } from 'react';

export default function Message({ author, content, timestamp, pinned = false, avatar = null }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatTime = (timestamp) => {
    if (typeof timestamp === 'string') return timestamp;
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRandomColor = (name) => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-blue-500',
      'from-pink-500 to-rose-500',
      'from-yellow-500 to-orange-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div 
      className={`group relative transition-all duration-300 ${pinned ? 'bg-yellow-500/10 border-l-4 border-yellow-400' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex space-x-3 p-4 hover:bg-white/5 rounded-xl transition-all duration-300">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatar ? (
            <img 
              src={avatar} 
              alt={author} 
              className="w-10 h-10 rounded-full border-2 border-white/20"
            />
          ) : (
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRandomColor(author)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
              {getInitials(author)}
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-semibold text-white hover:text-purple-300 transition-colors duration-200 cursor-pointer">
              {author}
            </span>
            <span className="text-xs text-white/50">
              {formatTime(timestamp)}
            </span>
            {pinned && (
              <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full border border-yellow-500/30">
                📌 Pinned
              </span>
            )}
          </div>

          {/* Message Text */}
          <div className="message-bubble">
            <p className="text-white/90 leading-relaxed">{content}</p>
          </div>

          {/* Action Buttons */}
          <div className={`flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
            <button className="text-white/60 hover:text-white transition-colors duration-200 p-1 rounded hover:bg-white/10">
              👍
            </button>
            <button className="text-white/60 hover:text-white transition-colors duration-200 p-1 rounded hover:bg-white/10">
              💬
            </button>
            <button className="text-white/60 hover:text-white transition-colors duration-200 p-1 rounded hover:bg-white/10">
              📌
            </button>
            <button className="text-white/60 hover:text-white transition-colors duration-200 p-1 rounded hover:bg-white/10">
              ⚙️
            </button>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl pointer-events-none transition-opacity duration-300"></div>
      )}
    </div>
  );
}
