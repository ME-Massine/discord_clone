// src/components/Navbar.jsx
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Discord Clone</h1>
      <button
        onClick={toggleTheme}
        className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
      >
        Toggle Theme
      </button>
    </nav>
  );
}
