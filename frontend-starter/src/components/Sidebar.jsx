// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

const dummyChannels = [
  { id: 1, name: "general" },
  { id: 2, name: "development" },
  { id: 3, name: "random" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-semibold mb-4">Channels</h2>
      <ul className="space-y-2">
        {dummyChannels.map((channel) => (
          <li key={channel.id}>
            <Link
              to={`/channel/${channel.id}`}
              className="block px-2 py-1 rounded hover:bg-gray-700"
            >
              #{channel.name}
            </Link>
          </li>
        ))}

        <li className="pt-4 border-t border-gray-700 mt-4">
          <Link
            to="/calendar"
            className="block px-2 py-1 rounded hover:bg-indigo-600 transition"
          >
            📅 Channel Calendar
          </Link>
        </li>
      </ul>
    </aside>
  );
}
