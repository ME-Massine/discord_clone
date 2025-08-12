import { useState, useRef, useEffect } from 'react';

const MessageInput = ({ onSend, placeholder = "Type a message..." }) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);

  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '💯', '✨', '🚀', '🎮', '🎵', '📚', '💻', '🎨', '🏆', '🌟'];

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
      setIsTyping(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (!isTyping && e.target.value) {
      setIsTyping(true);
    } else if (isTyping && !e.target.value) {
      setIsTyping(false);
    }
  };

  const insertEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
    setIsEmojiPickerOpen(false);
    textareaRef.current?.focus();
  };

  const handleFileUpload = () => {
    // File upload functionality would go here
    console.log('File upload clicked');
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div className="relative p-4 border-t border-white/10 bg-black/20 backdrop-blur-xl">
      {/* Typing Indicator */}
      {isTyping && (
        <div className="absolute -top-8 left-4 text-xs text-white/60 flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span>typing...</span>
        </div>
      )}

      <div className="flex items-end space-x-3">
        {/* File Upload Button */}
        <button
          onClick={handleFileUpload}
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
        >
          📎
        </button>

        {/* Emoji Picker Button */}
        <div className="relative">
          <button
            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
          >
            😊
          </button>

          {/* Emoji Picker Dropdown */}
          {isEmojiPickerOpen && (
            <div className="absolute bottom-12 left-0 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-2xl z-50 min-w-[200px]">
              <div className="grid grid-cols-8 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => insertEmoji(emoji)}
                    className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-lg transition-all duration-200 hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full min-h-[44px] max-h-[120px] px-4 py-3 rounded-xl glass-input resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
            rows={1}
          />
          
          {/* Character Count */}
          {message.length > 0 && (
            <div className="absolute bottom-2 right-3 text-xs text-white/40">
              {message.length}/2000
            </div>
          )}
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            message.trim()
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-purple-500/25 hover:scale-110'
              : 'bg-white/10 border border-white/20 text-white/40 cursor-not-allowed'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>

      {/* Click outside to close emoji picker */}
      {isEmojiPickerOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsEmojiPickerOpen(false)}
        />
      )}
    </div>
  );
};

export default MessageInput;
