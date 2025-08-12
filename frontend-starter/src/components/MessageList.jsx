// src/components/MessageList.jsx
import { useEffect, useRef } from 'react';
import Message from './Message';

const MessageList = ({ messages, channelName, pinnedMessages = [] }) => {
  const messagesEndRef = useRef(null);
  const listRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={listRef}>
      {/* Channel Header */}
      <div className="sticky top-0 z-10 bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              #
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{channelName}</h2>
              <p className="text-sm text-white/60">{messages.length} messages</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {pinnedMessages.length > 0 && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <span className="text-yellow-300">📌</span>
                <span className="text-sm text-yellow-300 font-medium">{pinnedMessages.length} pinned</span>
              </div>
            )}
            
            <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300">
              🔍
            </button>
            <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300">
              ⚙️
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-4xl">
            💬
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Welcome to #{channelName}!</h3>
          <p className="text-white/60 max-w-md mx-auto">
            This is the beginning of the #{channelName} channel. Start the conversation by sending a message!
          </p>
        </div>
      )}

      {/* Messages */}
      {Object.entries(messageGroups).map(([date, dateMessages]) => (
        <div key={date} className="space-y-4">
          {/* Date Separator */}
          <div className="flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-white/70">{date}</span>
            </div>
          </div>

          {/* Messages for this date */}
          <div className="space-y-2">
            {dateMessages.map((message, index) => (
              <div key={message.id} className="fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <Message
                  author={message.sender}
                  content={message.text}
                  timestamp={message.timestamp}
                  pinned={message.pinned}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Scroll to bottom indicator */}
      <div ref={messagesEndRef} />
      
      {/* New message indicator */}
      <div className="text-center py-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-white/60">You're all caught up!</span>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
