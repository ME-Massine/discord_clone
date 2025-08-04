import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white p-4 space-y-4">
        <h1 className="text-xl font-bold mb-6">My Discord Clone</h1>
        <nav className="flex flex-col space-y-2">
          <Link to="/" className="hover:text-blue-400">🏠 Home</Link>
          <Link to="/channel/123" className="hover:text-blue-400">📢 Channel 123</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-white p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
