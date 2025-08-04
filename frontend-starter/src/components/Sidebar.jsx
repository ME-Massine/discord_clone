// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';

const dummyChannels = [
  { id: 1, name: 'general' },
  { id: 2, name: 'development' },
  { id: 3, name: 'random' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-semibold mb-4">Channels</h2>
      <ul>
        {dummyChannels.map((channel) => (
          <li key={channel.id} className="mb-2">
            <Link
              to={`/channel/${channel.id}`}
              className="block px-2 py-1 rounded hover:bg-gray-700"
            >
              #{channel.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
