// src/components/Message.jsx
export default function Message({ author, content, timestamp }) {
  return (
    <div className="mb-3">
      <p className="text-sm text-gray-400">
        <strong className="text-white">{author}</strong> • {timestamp}
      </p>
      <p className="text-white">{content}</p>
    </div>
  );
}
