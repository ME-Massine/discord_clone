import { useState } from 'react';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Send message:', message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 border-t border-gray-300 bg-gray-100">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className="w-full p-2 rounded border border-gray-300"
        placeholder="Type a message..."
      />
    </div>
  );
};

export default MessageInput;
