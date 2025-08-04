const MessageList = () => {
  const messages = [
    { id: 1, user: 'Alice', content: 'Hello!' },
    { id: 2, user: 'Bob', content: 'Hey there!' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-white">
      {messages.map((msg) => (
        <div key={msg.id} className="mb-2">
          <span className="font-bold mr-2">{msg.user}:</span>
          <span>{msg.content}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
